import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseEnumPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
  getGranularity,
} from '@tymlez/backend-libs';
import type {
  IIsoDate,
  IMetricGranularity,
  IMultiValueHttpResponse,
  ISeriesItem,
  ISingleValueHttpResponse,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { ConsumptionService } from './consumption.service';

@Controller('consumption')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class ConsumptionController {
  constructor(private consumptionService: ConsumptionService) {}

  @Get('/total')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getConsumptionTotal(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISingleValueHttpResponse<number>> {
    const result = await this.consumptionService.getConsumptionTotal(from, to);
    return {
      data: result,
      success: true,
    };
  }

  @Get('/series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getConsumptionSeries(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query(
      'granularity',
      new ParseEnumPipe(
        {
          minute: 'minute',
          hour: 'hour',
          day: 'day',
          month: 'month',
          week: 'week',
          auto: 'auto',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid granularity value');
          },
        },
      ),
    )
    granularity: IMetricGranularity,
  ): Promise<IMultiValueHttpResponse<ISeriesItem>> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    const result = await this.consumptionService.getConsumptionSeries(
      from,
      to,
      realGranularity,
    );
    return {
      count: result.length,
      data: result,
      success: true,
    };
  }

  @Get('/metrics')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getConsumptionKeyMetrics(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query(
      'granularity',
      new ParseEnumPipe(
        {
          total: 'total',
          minute: 'minute',
          hour: 'hour',
          day: 'day',
          month: 'month',
          week: 'week',
          auto: 'auto',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid granularity value');
          },
        },
      ),
    )
    granularity: IMetricGranularity,
  ): Promise<ISummaryItem> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    return await this.consumptionService.getConsumptionSummary(
      from,
      to,
      realGranularity,
    );
  }
}
