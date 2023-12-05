import { Injectable } from '@nestjs/common';
import type {
  IIsoDate,
  IMeterDataQuery,
  ISeriesItem,
  ISummaryItem,
  IVerificationQuery,
} from '@tymlez/platform-api-interfaces';
import {
  EnumPolicyNames,
  getMetricSeries,
  getMetricValue,
  lookupMetricSeries,
  lookupMetricValue,
  getRealtimeDuration,
  getStartOfDay,
  getTimezoneOffset,
} from '@tymlez/common-libs';
import { getGranularity } from '@tymlez/backend-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class MetricService {
  constructor(private platformService: PlatformService) {}

  async getSummary(from: IIsoDate, to: IIsoDate): Promise<ISummaryItem[]> {
    const {
      GENERATION_METRICS,
      FORECASTED_ENERGY_METRICS,
      CARBON_ABATEMENT_METRICS,
    } = ClientSettings;

    //to get data in the past with metric 'solar_array_X.output'
    const GENERATION_METRICS_OLD = GENERATION_METRICS.map((x) =>
      x.replace('.electricity', ''),
    );
    const electricityMetrics = [
      ...GENERATION_METRICS,
      ...GENERATION_METRICS_OLD,
    ];

    const metricNames = [
      ...electricityMetrics,
      ...FORECASTED_ENERGY_METRICS,
      ...CARBON_ABATEMENT_METRICS,
    ];

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return [
      {
        name: 'rec',
        label: 'RECs generated',
        preValue: 0,
        value: await this.getSummaryREC(from, to),
        uom: '',
        type: 'output',
      },
      {
        name: 'generated',
        label: 'Solar energy generated',
        preValue: 0,
        value: lookupMetricValue(queryResult, electricityMetrics) / 1000,
        uom: 'MWh',
        type: 'output',
      },
      {
        name: 'forecast',
        label: 'Solar energy generated (forecast)',
        preValue: 0,
        value: lookupMetricValue(queryResult, FORECASTED_ENERGY_METRICS) / 1000,
        uom: 'MWh',
        type: 'output',
      },

      {
        name: 'abatement',
        label: 'Carbon avoided',
        preValue: 0,
        value: lookupMetricValue(queryResult, CARBON_ABATEMENT_METRICS) / 1000,
        uom: 't',
        type: 'output',
      },
    ];
  }

  public async getPreValues(
    from: IIsoDate,
    to: IIsoDate,
    metricNames: string[],
  ): Promise<number> {
    const diff = new Date(to).getTime() - new Date(from).getTime();

    //to get data in the past with metric 'solar_array_X.output'
    const GENERATION_METRICS_OLD = metricNames.map((x) =>
      x.replace('.electricity', ''),
    );
    const electricityMetrics = [...metricNames, ...GENERATION_METRICS_OLD];

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(new Date(from).getTime() - diff).toISOString(),
      toIsoDateTime: from,
      metricNames: electricityMetrics,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return lookupMetricValue(queryResult, electricityMetrics) / 1000;
  }

  public async getSeries(
    from: IIsoDate,
    to: IIsoDate,
    metricNames: string[],
  ): Promise<ISeriesItem[]> {
    const granularity = getGranularity(from, to);
    //to get data in the past with metric 'solar_array_X.output'
    const GENERATION_METRICS_OLD = metricNames.map((x) =>
      x.replace('.electricity', ''),
    );
    const electricityMetrics = [...metricNames, ...GENERATION_METRICS_OLD];

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: electricityMetrics,
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return lookupMetricSeries(queryResult, electricityMetrics);
  }

  async getRealtimeSummary(): Promise<ISummaryItem[]> {
    const { from, to } = getRealtimeDuration();

    const { PANEL_METRICS, GENERATION_METRICS } = ClientSettings;

    const metricNames = [...GENERATION_METRICS, ...PANEL_METRICS];

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(from).toISOString(),
      toIsoDateTime: new Date(to).toISOString(),
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return [
      {
        name: 'panel',
        label: 'Active solar panels',
        preValue: 0,
        value: lookupMetricValue(queryResult, PANEL_METRICS),
        uom: '',
        type: 'output',
      },
      {
        name: 'generated',
        label: 'Solar energy generated',
        preValue: 0,
        value: lookupMetricValue(queryResult, GENERATION_METRICS) / 1000,
        uom: 'MWh',
        type: 'output',
      },
    ];
  }

  public async getRealtimePreValue(metricNames: string[]): Promise<number> {
    const { from, to } = getRealtimeDuration();

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(from).toISOString(),
      toIsoDateTime: new Date(to).toISOString(),
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return lookupMetricValue(queryResult, metricNames) / 1000;
  }

  public async getRealtimeSeries(
    metricNames: string[],
  ): Promise<ISeriesItem[]> {
    const { from, to } = getRealtimeDuration(2 * 60); // 2hours

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(from).toISOString(),
      toIsoDateTime: new Date(to).toISOString(),
      metricNames,
      granularity: 'minute',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return lookupMetricSeries(queryResult, metricNames);
  }

  async getRealtimeREC(): Promise<number> {
    const today = new Date();
    const sites = await this.platformService.getSites();
    const timezone = sites?.data[0].timezone || 'UTC';
    const timezoneOffset = getTimezoneOffset(today, timezone);

    const to = today.toISOString();
    const from = getStartOfDay(to, timezoneOffset);

    return await this.getSummaryREC(from, to);
  }

  public async getRealtimeRECPreValue(): Promise<number> {
    const { from, to } = getRealtimeDuration(7 * 24 * 60); //last week

    return await this.getSummaryREC(
      new Date(from).toISOString(),
      new Date(to).toISOString(),
    );
  }

  public async getPerformanceRatio(): Promise<number> {
    const { from, to } = getRealtimeDuration();

    const { PERFORMANCE_PERCENTAGE_METRICS } = ClientSettings;

    const metricNames = [...PERFORMANCE_PERCENTAGE_METRICS];

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(from).toISOString(),
      toIsoDateTime: new Date(to).toISOString(),
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return (getMetricValue(queryResult) / 4) * 100;
  }

  public async getSummaryREC(from: IIsoDate, to: IIsoDate): Promise<number> {
    const query: IVerificationQuery = {
      from,
      to,
      policy: EnumPolicyNames.Tymlez_REC,
    };

    return await this.platformService.getDatabaseVerificationCount(query);
  }

  public async getPreValuesREC(from: IIsoDate, to: IIsoDate): Promise<number> {
    const diff = new Date(to).getTime() - new Date(from).getTime();

    return await this.getSummaryREC(
      new Date(new Date(from).getTime() - diff).toISOString(),
      from,
    );
  }

  public async getSeriesREC(
    from: IIsoDate,
    to: IIsoDate,
  ): Promise<ISeriesItem[]> {
    const granularity = getGranularity(from, to);

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(from).toISOString(),
      toIsoDateTime: new Date(to).toISOString(),
      metricNames: ['rec'],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return getMetricSeries(queryResult);
  }
}
