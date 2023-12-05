import { Injectable } from '@nestjs/common';
import type {
  IIsoDate,
  IMeterDataQuery,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import {
  getMetricSeries,
  getMetricValue,
  lookupMetricValue,
} from '@tymlez/common-libs';
import { getGranularity } from '@tymlez/backend-libs';
import type { ISummaryItem } from '../../interface';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class MetricService {
  constructor(private platformService: PlatformService) {}

  async getSummary(from: IIsoDate, to: IIsoDate): Promise<ISummaryItem[]> {
    const {
      WATER_INPUT_METRICS,
      SOLAR_ELECTRICITY_METRICS,
      GRID_ELECTRICITY_METRICS,
      HYDROGEN_DELIVERED_METRICS,
      OXYGEN_DELIVERED_METRICS,
      CARBON_EMISSION_METRICS,
    } = ClientSettings;

    const metricNames = [
      ...WATER_INPUT_METRICS,
      ...SOLAR_ELECTRICITY_METRICS,
      ...GRID_ELECTRICITY_METRICS,
      ...HYDROGEN_DELIVERED_METRICS,
      ...OXYGEN_DELIVERED_METRICS,
      ...CARBON_EMISSION_METRICS,
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
        name: 'waterSupplied',
        label: 'Water supplied',
        preValue: 0,
        value: lookupMetricValue(queryResult, WATER_INPUT_METRICS) / 1000,
        uom: 'kL',
        type: 'input',
      },

      {
        name: 'solarSupplied',
        label: 'Solar Energy supplied',
        preValue: 0,
        value: lookupMetricValue(queryResult, SOLAR_ELECTRICITY_METRICS),
        uom: 'kWh',
        type: 'input',
      },

      {
        name: 'electricitySupplied',
        label: 'Grid Energy supplied',
        preValue: 0,
        value: lookupMetricValue(queryResult, GRID_ELECTRICITY_METRICS),
        uom: 'kWh',
        type: 'input',
      },

      {
        name: 'deliveredHydrogen',
        label: 'Hydrogen output',
        preValue: 0,
        value: lookupMetricValue(queryResult, HYDROGEN_DELIVERED_METRICS),
        uom: 'kg',
        type: 'output',
      },

      {
        name: 'deliveredOxygen',
        label: 'Oxygen output',
        preValue: 0,
        value: lookupMetricValue(queryResult, OXYGEN_DELIVERED_METRICS),
        uom: 'kg',
        type: 'output',
      },

      {
        name: 'totalCarbonEmission',
        label: 'Total Carbon emission',
        preValue: 0,
        value: lookupMetricValue(queryResult, CARBON_EMISSION_METRICS),
        uom: 'kg',
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

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(new Date(from).getTime() - diff).toISOString(),
      toIsoDateTime: from,
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricValue(queryResult);
  }

  public async getSeries(
    from: IIsoDate,
    to: IIsoDate,
    metricNames: string[],
  ): Promise<ISeriesItem[]> {
    const granularity = getGranularity(from, to);
    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames,
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricSeries(queryResult);
  }

  async getProcesses(from: IIsoDate, to: IIsoDate) {
    const { PRODUCTION_PROCESS } = ClientSettings;

    const relevantMetricNames = PRODUCTION_PROCESS.flatMap(
      (i) => i.metrics,
    ).flatMap((i) => i.keys);

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: relevantMetricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return PRODUCTION_PROCESS.map((item) => {
      const metrics = item.metrics.map((metric) => {
        return {
          ...metric,
          value: lookupMetricValue(queryResult, metric.keys),
        };
      });

      return { ...item, metrics };
    });
  }

  async getMetricInput(from: IIsoDate, to: IIsoDate): Promise<ISummaryItem[]> {
    const {
      WATER_INPUT_METRICS,
      GRID_ELECTRICITY_METRICS,
      SOLAR_ELECTRICITY_METRICS,
      HYDROGEN_DELIVERED_METRICS,
    } = ClientSettings;

    const metricNames = [
      ...WATER_INPUT_METRICS,
      ...GRID_ELECTRICITY_METRICS,
      ...SOLAR_ELECTRICITY_METRICS,
      ...HYDROGEN_DELIVERED_METRICS,
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
        name: 'water',
        label: 'Water',
        type: 'input',
        value: lookupMetricValue(queryResult, WATER_INPUT_METRICS) / 1000,
        preValue: 0,
        uom: 'kL',
      },
      {
        name: 'greenEnergy',
        label: 'Green Energy',
        type: 'input',
        value: lookupMetricValue(queryResult, SOLAR_ELECTRICITY_METRICS),
        preValue: 0,
        uom: 'kWh',
      },
      {
        name: 'fossilEnergy',
        label: 'Fossil Energy',
        type: 'input',
        value: lookupMetricValue(queryResult, GRID_ELECTRICITY_METRICS),
        preValue: 0,
        uom: 'kWh',
      },
      {
        name: 'hydrogenProduced',
        label: 'Hydrogen Produced',
        type: 'input',
        value: lookupMetricValue(queryResult, HYDROGEN_DELIVERED_METRICS),
        preValue: 0,
        uom: 'kg',
      },
    ];
  }
}
