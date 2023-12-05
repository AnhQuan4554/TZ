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
import { PERMISSIONS } from '@tymlez/common-libs';
import type { ISummaryItem } from '../../interface';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { HismeltService } from './hismelt.service';

@UseGuards(FirebaseAuthGuard, PermissionGuard)
@Controller('hismelt')
export class HismeltController {
  constructor(private hismeltService: HismeltService) {}

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
    const summary = await this.hismeltService.getSummary(from, to);
    const granularity = getGranularity(from, to);
    const outputSeries = await this.hismeltService.getOutputSeries(
      from,
      to,
      granularity,
    );

    return {
      success: true,
      data: { summary, outputSeries },
    };
  }

  // deprecated
  @Get('/carbon-footprint')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getCarbonFootprint(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISingleValueHttpResponse<ISummaryItem[]>> {
    const pigIron = await this.hismeltService.getTotalOutput(from, to);
    const carbon = await this.hismeltService.getTotalCarbonEmission(from, to);
    const abatement = await this.hismeltService.getTotalCarbonAbatement(
      from,
      to,
    );

    return {
      success: true,
      data: [
        {
          name: 'carbon',
          label: '',
          type: 'output',
          value: carbon,
          uom: 'kg',
        },
        {
          name: 'abatement',
          label: '',
          type: 'output',
          value: abatement,
          uom: 'kg',
        },
        {
          name: 'pigIron',
          label: '',
          type: 'output',
          value: pigIron,
          uom: 'tonne',
        },
      ],
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
    const data = await this.hismeltService.getProcesses(from, to);

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

    const data = await this.hismeltService.getCarbonSeriesData(
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
