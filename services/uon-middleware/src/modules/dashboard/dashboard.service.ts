import { Injectable } from '@nestjs/common';
import {
  addDaysTo,
  getMetricSeries,
  getMetricValue,
} from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { round, sum } from 'lodash';
import { getGranularity } from '@tymlez/backend-libs';
import { PlatformService } from '../platform/platform.service';
import type {
  ICarbonAudit,
  ICarbonData,
  ICarbonReport,
  IDashboadBlockSummary,
} from './interfaces';

@Injectable()
export class DashboardService {
  constructor(private platformService: PlatformService) {}

  private async getMetricTotalData(
    metricNames: string[],
    from: IIsoDate,
    to: IIsoDate,
  ): Promise<number> {
    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const data = await this.platformService.queryMeterData(query);
    return getMetricValue(data);
  }

  async getMetricSeriesData(
    metricNames: string[],
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames,
      granularity: realGranularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricSeries(queryResult);
  }

  async getMetricLastSummary(
    metricNames: string[],
    from: IIsoDate,
    to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    const previousRange = {
      from: addDaysTo(from, -7),
      to: addDaysTo(to, -7),
    };

    const thisTotal = await this.getMetricTotalData(metricNames, from, to);
    const prevTotal = await this.getMetricTotalData(
      metricNames,
      previousRange.from,
      previousRange.to,
    );

    const series = await this.getMetricSeriesData(metricNames, from, to, 'day');
    const change = prevTotal > 0 ? (thisTotal - prevTotal) / prevTotal : 0;
    const percentageChange = round(change * 100, 2);

    return {
      value: thisTotal > 1 ? round(thisTotal) : thisTotal,
      data: series.map((item) => ({
        x: new Date(item.isoDateTime),
        y: item.value,
      })),
      percentageChange,
    };
  }

  async getNetMetricLastSummary(
    data: ISeriesItem[],
    carbonEmissionNames: string[],
    carbonAbatementNames: string[],
    from: IIsoDate,
    to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    const values = data.map((meterData) => meterData.value);
    const thisTotal = sum(values);
    const previousRange = {
      from: addDaysTo(from, -7),
      to: addDaysTo(to, -7),
    };
    const prevCarbonEmissionTotal = await this.getMetricTotalData(
      carbonEmissionNames,
      previousRange.from,
      previousRange.to,
    );

    const prevCarbonAbatementTotal = await this.getMetricTotalData(
      carbonAbatementNames,
      previousRange.from,
      previousRange.to,
    );

    const prevNetTotal = prevCarbonEmissionTotal - prevCarbonAbatementTotal;

    const change =
      prevNetTotal > 0 ? (thisTotal - prevNetTotal) / prevNetTotal : 0;
    const percentageChange = round(change * 100, 2);

    return {
      value: thisTotal > 1 ? round(thisTotal) : thisTotal,
      data: data.map((item) => ({
        x: new Date(item.isoDateTime),
        y: item.value,
      })),
      percentageChange,
    };
  }

  public async getCarbonReport(
    emission: ISeriesItem[],
    abatement: ISeriesItem[],
  ): Promise<ICarbonReport> {
    const dict: { [x: string]: { abated?: number; produced?: number } } = {};
    const key = (d: Date) => Math.ceil(d.getTime()).toString();
    emission.forEach((item) => {
      const tsKey = key(new Date(item.isoDateTime));
      dict[tsKey] = dict[tsKey] || {};
      dict[tsKey].produced = item.value;
    });

    abatement.forEach((item) => {
      const tsKey = key(new Date(item.isoDateTime));
      dict[tsKey] = dict[tsKey] || {};
      dict[tsKey].abated = item.value;
    });

    const carbonEmission = Object.entries(dict).map(([timestamp, item]) => {
      return {
        timestamp,
        abated: item.abated || 0,
        produced: item.produced || 0,
      } as ICarbonData;
    });
    const abated = sum(carbonEmission.map((x) => x.abated));
    const produced = sum(carbonEmission.map((x) => x.produced));

    return {
      abated: {
        title: 'Total CO2 Abated',
        subTitle: 'Carbon Abated',
        description:
          'This is the total carbon that was abated by the use of Zero Carbon producing',
        data: abated,
      },
      produced: {
        title: 'Total CO2 Produced',
        subTitle: 'Carbon Produced',
        description:
          'This is the total carbon from all sources measured and attached to this project',
        data: produced,
      },
      penetration: {
        title: 'Renewable Penetration',
        subTitle: 'Renewable Penetration',
        description:
          'The total percentage of energy that was produced from renewable sources',
        data: round((abated / produced) * 100, 4),
      },
      data: { emission, abatement }, //carbonEmission,
    };
  }

  public async getCarbonAudit(): Promise<ICarbonAudit[]> {
    return [
      {
        source: 'Diesel (Genset)',
        measurement: 304,
        units: 'Litres',
        carbon: 700,
        auditLink: '62259673628924',
      },
      {
        source: 'Solar Array',
        measurement: 785,
        units: 'KWh',
        carbon: 0,
        auditLink: '62259673628924',
      },
      {
        source: 'Trucked Diesel',
        measurement: 280,
        units: 'Litres',
        carbon: 656,
        auditLink: '62259673628924',
      },
      {
        source: 'Construction',
        measurement: 448,
        units: 'KgCO2',
        carbon: 448,
        auditLink: '62259673628924',
      },
    ];
  }
}
