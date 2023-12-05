import { Injectable, Logger } from '@nestjs/common';
import { QueryOrder, EntityManager, EntityRepository } from '@mikro-orm/core';
import { reportErrorToNewRelic } from '@tymlez/backend-libs';
import { runAllSettled } from '@tymlez/common-libs';
import _ from 'lodash';
import {
  IFindResult,
  IIsoDate,
  IMeterData,
  IMeterDataAdminQuery,
  IMeterDataQuery,
  IMeterDataResult,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import type { SqlEntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MeterData } from './entities/meter-data.entity';
import { CreateMeterDataDto } from './dto/create-meter-data.dto';
import {
  getGroupByColumns,
  getOrderByColumn,
  getSelectColumns,
  getWhereConditions,
} from './meter-data.utils';

@Injectable()
export class MeterDataService {
  private readonly logger = new Logger(MeterDataService.name);
  constructor(
    private em: EntityManager,
    @InjectRepository(MeterData)
    private repo: EntityRepository<MeterData>,
  ) {}

  async findOneByMeter(
    meterKey: string,
    isoDateTime: IIsoDate,
    metricName: string,
    tags: string[],
  ) {
    try {
      return await this.em.findOne(MeterData, {
        meterKey,
        isoDateTime,
        metricName,
        tags: { $contains: tags },
      });
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  async findAllByMeter(
    meterKey: string | undefined,
    isoDateTime: IIsoDate,
    metricNames: string[],
    tags: string[],
  ) {
    try {
      if (!metricNames) {
        return [];
      }

      const filters = _.omitBy(
        {
          meterKey,
          isoDateTime,
          metricName: { $in: metricNames },
          tags: { $contains: tags },
        },
        _.isUndefined,
      );
      return await this.em.find(MeterData, filters as any);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  async ingest(data: CreateMeterDataDto[]): Promise<IMutationResult> {
    const results = await runAllSettled(
      data,
      async (meterData) => {
        await this.ingestOne(meterData);
        return true;
      },
      5,
    );

    const errors = results.filter((res) => res !== true);

    if (errors.length === 0) {
      return {
        success: true,
        message: `Meter Data Ingestion: done`,
      };
    }

    const errorMsg = errors.join('; ');
    reportErrorToNewRelic(new Error(errorMsg));
    return {
      success: false,
      message: `Meter Data Ingestion Error: ${errorMsg}`,
    };
  }

  private async ingestOne(data: CreateMeterDataDto): Promise<IMutationResult> {
    const now = new Date();
    const qb = (this.em as SqlEntityManager)
      .fork()
      .createQueryBuilder(MeterData)
      .insert({
        ...data,
        createdAt: now,
        updatedAt: now,
        tags: data.tags || [],
      })
      .onConflict([
        'iso_date_time',
        'meter_key',
        'metric_name',
        'tags',
        'interval',
      ])
      .merge({
        metricValue: data.metricValue,
      });

    return await qb.execute('get');
  }

  /**
   * Query meter data function
   * @param query
   * @returns
   * @example
   * await this.meterDataService.query(
   *     {
   *       meterKeys: [meterKey],
   *       metricNames: ['eRealPositiveKwh', 'officialCarbon'],
   *       fromIsoDateTime: isoDate,
   *       toIsoDateTime: isoDate,
   *       groupByMeters: false,
   *       granularity: 'minute'
   *     });
   */

  async query(query: IMeterDataQuery): Promise<IMeterDataResult[]> {
    const selectColumns = getSelectColumns(query);
    const whereConditions = getWhereConditions(query);
    const groupByColumns = getGroupByColumns(query);
    const orderByColumn = getOrderByColumn(query);

    const qb = (this.em.fork() as SqlEntityManager)
      .createQueryBuilder(MeterData)
      .select(selectColumns)
      .where({ $and: whereConditions })
      .orderBy({ [orderByColumn]: QueryOrder.ASC })
      .groupBy(groupByColumns);

    return await qb.execute('all');
  }

  public async getAll(
    pageSize: number,
    page: number,
    query: IMeterDataAdminQuery,
  ): Promise<IFindResult<IMeterData>> {
    const filterQuery = this.getFilterQuery(query);
    try {
      const [data, count] = await this.repo.findAndCount(filterQuery, {
        orderBy: { id: 'DESC' },
        limit: pageSize,
        offset: page * pageSize,
        populate: true,
      });

      return { count, data };
    } catch (err) {
      this.logger.error({ err }, 'Get all meter data failed!');
      return { count: 0, data: [] };
    }
  }

  private getFilterQuery(query: IMeterDataAdminQuery) {
    const { startDateTime, endDateTime, metricName, exactDateTime } = query;

    const filterQuery = this.getFilterDateRangeQuery(
      startDateTime,
      endDateTime,
      exactDateTime,
    );

    if (metricName !== 'all') {
      filterQuery.metricName = metricName;
    }

    return filterQuery;
  }

  private getFilterDateRangeQuery(
    from: string,
    to: string,
    exactDateTime: string,
  ) {
    const filterQuery: any = {};
    if (exactDateTime) {
      filterQuery.isoDateTime = exactDateTime;
    } else {
      if (from) {
        filterQuery.isoDateTime = { $gte: from };
      }
      if (to) {
        filterQuery.isoDateTime = { $lte: to };
      }
    }
    return filterQuery;
  }

  public async getMetricNames(): Promise<string[]> {
    const qb = (this.em.fork() as SqlEntityManager)
      .createQueryBuilder(MeterData)
      .select('metric_name')
      .groupBy('metric_name')
      .orderBy({ metric_name: QueryOrder.ASC });

    const metricNames = await qb.execute('all');
    return metricNames.map((x) => {
      return x.metricName;
    });
  }
}
