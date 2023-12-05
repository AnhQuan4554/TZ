import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { FirebaseAuthGuard } from '@tymlez/backend-libs';
import { diffSeriesData } from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMetricGranularity,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { round } from 'lodash';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { ClientSettings } from '../client-settings/client-settings';
import { DashboardService } from './dashboard.service';
import type {
  ICarbonAudit,
  ICarbonReport,
  IDashboadBlockSummary,
} from './interfaces';

@Controller('dashboard')
@UseGuards(FirebaseAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/summary/carbon-emission')
  async getCarbonEmissionSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    return await this.dashboardService.getMetricLastSummary(
      [ClientSettings.metricGensetCarbonEmission],
      from,
      to,
    );
  }

  @Get('/summary/carbon-abatement')
  async getCarbonAbatementSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    return await this.dashboardService.getMetricLastSummary(
      [ClientSettings.metricInvertersCarbonAbatement],
      from,
      to,
    );
  }

  @Get('/summary/net-carbon-emissions')
  async getNetCarbonEmissions(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    const emission = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricGensetCarbonEmission],
      from,
      to,
      'auto',
    );

    const abatement = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricInvertersCarbonAbatement],
      from,
      to,
      'auto',
    );
    const net = diffSeriesData(emission, abatement);
    return await this.dashboardService.getNetMetricLastSummary(
      net,
      [ClientSettings.metricGensetCarbonEmission],
      [ClientSettings.metricInvertersCarbonAbatement],
      from,
      to,
    );
  }

  @Get('/summary/fossil-fuel-usage')
  async getFossilFuelUsageSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    return await this.dashboardService.getMetricLastSummary(
      [ClientSettings.metricGensetEnergyGenerated],
      from,
      to,
    );
  }

  @Get('/summary/green-energy-usage')
  async getGreenEnergyUsageSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    return await this.dashboardService.getMetricLastSummary(
      [ClientSettings.metricInvertersEnergyGenerated],
      from,
      to,
    );
  }

  @Get('/summary/water-pumped')
  async getWaterPumpedSummary(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<IDashboadBlockSummary> {
    const data = await this.dashboardService.getMetricLastSummary(
      [ClientSettings.metricWaterPumped],
      from,
      to,
    );
    return { ...data, value: round(data.value / 1000) }; //convert to kL
  }

  @Get('/series/energy')
  async getEnergySeries(
    @Query('from') from: IIsoDate,
    @Query('to') to: IIsoDate,
    @Query('granularity') granularity: IMetricGranularity = 'day',
  ): Promise<Record<string, ISeriesItem[]>> {
    const inverter = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricInvertersEnergyGenerated],
      from,
      to,
      granularity,
    );

    const genset = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricGensetEnergyGenerated],
      from,
      to,
      granularity,
    );

    return {
      inverter,
      genset,
    };
  }

  @Get('/series/carbon')
  async getCarbonSeries(
    @Query('from') from: IIsoDate,
    @Query('to') to: IIsoDate,
    @Query('granularity') granularity: IMetricGranularity = 'day',
  ): Promise<Record<string, ISeriesItem[]>> {
    const emission = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricGensetCarbonEmission],
      from,
      to,
      granularity,
    );

    const abatement = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricInvertersCarbonAbatement],
      from,
      to,
      granularity,
    );

    const net = diffSeriesData(emission, abatement);

    return {
      emission,
      abatement,
      net,
    };
  }

  @Get('/report/carbon-report')
  async getCarbonReport(
    @Query('from') from: IIsoDate,
    @Query('to') to: IIsoDate,
    @Query('granularity') granularity: IMetricGranularity = 'day',
  ): Promise<ICarbonReport> {
    const emission = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricGensetCarbonEmission],
      from,
      to,
      granularity,
    );

    const abatement = await this.dashboardService.getMetricSeriesData(
      [ClientSettings.metricInvertersCarbonAbatement],
      from,
      to,
      granularity,
    );

    return this.dashboardService.getCarbonReport(emission, abatement);
  }

  @Get('/report/carbon-audit')
  async getCarbonAudit(): Promise<ICarbonAudit[]> {
    return this.dashboardService.getCarbonAudit();
  }
}
