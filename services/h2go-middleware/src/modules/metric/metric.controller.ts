import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type { IIsoDate, ISeriesItem } from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { MetricService } from './metric.service';
import type { ISummaryItem } from '../../interface';
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
    const metricNames = ClientSettings.metricNameMappings[name];
    return await this.metricService.getSeries(from, to, metricNames);
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
    const metricNames = ClientSettings.metricNameMappings[name];

    const value = await this.metricService.getPreValues(from, to, metricNames);
    return name === 'waterSupplied' ? value / 1000 : value;
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
  ): Promise<any> {
    return await this.metricService.getProcesses(from, to);
  }

  @Get('/metrics-input')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getMetricInput(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISummaryItem[]> {
    return await this.metricService.getMetricInput(from, to);
  }
}
