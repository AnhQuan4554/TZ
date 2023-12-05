import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  IIsoDate,
  IMetricGranularity,
  IPanelGroupVerification,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { EnergyService } from './energy.service';

@Controller('energy')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class EnergyController {
  constructor(private energyService: EnergyService) {}

  @Get('/series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getEnergySeries(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query('granularity') granularity: IMetricGranularity = 'day',
  ): Promise<Record<string, ISeriesItem[]>> {
    return await this.energyService.getEnergySeriesData(from, to, granularity);
  }

  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @Get('/groups')
  async getPanelGroups(): Promise<IPanelGroupVerification> {
    return await this.energyService.getPanelGroups();
  }
}
