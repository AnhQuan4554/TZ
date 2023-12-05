import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  IIsoDate,
  ISeriesItem,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { MetricService } from './metric.service';
import { ClientSettings } from '../client-settings/client-settings';

@Controller('metric')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get('/summary')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISummaryItem[]> {
    return await this.metricService.getSummary(from, to);
  }

  @Get('/summary/preValue')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getSummaryPreValue(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query('name') name: string,
  ): Promise<number> {
    if (name === 'rec') {
      return await this.metricService.getPreValuesREC(from, to);
    }

    const metricNames = ClientSettings.metricNameMappings[name];
    return await this.metricService.getPreValues(from, to, metricNames);
  }

  @Get('/summary/series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getSummarySeries(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query('name') name: string,
  ): Promise<ISeriesItem[]> {
    if (name === 'rec') {
      return await this.metricService.getSeriesREC(from, to);
    }

    const metricNames = ClientSettings.metricNameMappings[name];
    return await this.metricService.getSeries(from, to, metricNames);
  }

  @Get('/realtime')
  async getRealtimeSummary(): Promise<ISummaryItem[]> {
    return await this.metricService.getRealtimeSummary();
  }

  @Get('/realtime/preValue')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getRealtimePreValue(@Query('name') name: string): Promise<number> {
    const metricNames = ClientSettings.metricNameMappings[name];
    return await this.metricService.getRealtimePreValue(metricNames);
  }

  @Get('/realtime/series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getRealtimeSeries(@Query('name') name: string): Promise<ISeriesItem[]> {
    const metricNames = ClientSettings.realtimeMetricNameMappings[name];
    return await this.metricService.getRealtimeSeries(metricNames);
  }

  @Get('/realtime/rec')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getRealtimeREC(): Promise<number> {
    return await this.metricService.getRealtimeREC();
  }

  @Get('/realtime/rec/preValue')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getRealtimeRECPreValue(): Promise<number> {
    return await this.metricService.getRealtimeRECPreValue();
  }

  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @Get('/performance')
  async getPerformanceRatio(): Promise<number> {
    return await this.metricService.getPerformanceRatio();
  }
}
