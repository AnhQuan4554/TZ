import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  getGranularity,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  IIsoDate,
  IMetricGranularity,
  ISeriesItem,
  ISingleValueHttpResponse,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs/';
import type { ISummaryItem } from '../../interface';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { IronoreService } from './ironore.service';

@Controller('ironore')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class IronoreController {
  constructor(private ironoreService: IronoreService) {}

  @Get('/summary')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<
    ISingleValueHttpResponse<{
      summary: ISummaryItem[];
      outputSeries: ISeriesItem[];
    }>
  > {
    const summary = await this.ironoreService.getSummary(from, to);
    const granularity = getGranularity(from, to);
    const outputSeries = await this.ironoreService.getOutputSeries(
      from,
      to,
      granularity,
    );

    return {
      success: true,
      data: { summary, outputSeries },
    };
  }

  @Get('/processes')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getProcesses(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISingleValueHttpResponse<any>> {
    const data = await this.ironoreService.getProcesses(from, to);

    return {
      success: true,
      data,
    };
  }

  @Get('/carbon-series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getCarbonSeries(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query('granularity') granularity: IMetricGranularity = 'auto',
  ): Promise<ISingleValueHttpResponse<any>> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;

    const data = await this.ironoreService.getCarbonSeriesData(
      from,
      to,
      realGranularity,
    );

    return {
      success: true,
      data,
    };
  }
}
