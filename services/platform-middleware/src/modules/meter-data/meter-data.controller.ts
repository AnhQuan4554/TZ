import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import type {
  IFindResult,
  IMeterData,
  IMeterDataAdminQuery,
} from '@tymlez/platform-api-interfaces';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import { PERMISSIONS } from '@tymlez/common-libs';
import { MeterDataService } from './meter-data.service';

@Controller('meter-data')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class MeterDataController {
  constructor(private meterDataService: MeterDataService) {}

  @Get()
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.CLIENT_DATA_READ,
  )
  async getAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('startDateTime') startDateTime: string,
    @Query('endDateTime') endDateTime: string,
    @Query('metricName') metricName: string,
    @Query('exactDateTime') exactDateTime: string,
  ): Promise<IFindResult<IMeterData>> {
    const query: IMeterDataAdminQuery = {
      startDateTime,
      endDateTime,
      metricName,
      exactDateTime,
    };
    return this.meterDataService.getAll(pageSize, page, query);
  }

  @Get('/metric-names')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.CLIENT_DATA_READ,
  )
  async getMetricNames(): Promise<string[]> {
    return this.meterDataService.getMetricNames();
  }
}
