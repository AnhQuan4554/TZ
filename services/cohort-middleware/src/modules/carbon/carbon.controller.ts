import {
  BadRequestException,
  Controller,
  Get,
  ParseEnumPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  getGranularity,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  ICarbonSeries,
  ICarbonTotal,
  IIsoDate,
  IMetricGranularity,
  ISingleValueHttpResponse,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { CarbonService } from './carbon.service';

@Controller('carbon')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class CarbonController {
  constructor(private carbonService: CarbonService) {}

  @Get('/total')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getCarbonTotal(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISingleValueHttpResponse<ICarbonTotal>> {
    const totals = await this.carbonService.getCarbonTotalData(from, to);

    return {
      success: true,
      data: totals,
    };
  }

  @Get('/series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getCarbonSeries(
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
  ): Promise<ISingleValueHttpResponse<ICarbonSeries>> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    const series = await this.carbonService.getCarbonSeriesData(
      from,
      to,
      realGranularity,
    );

    return {
      success: true,
      data: series,
    };
  }

  @Get('/metrics')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getCarbonKeyMetrics(
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
  ): Promise<ISummaryItem[]> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    return await this.carbonService.getCarbonSummary(from, to, realGranularity);
  }
}
