import { round } from 'lodash';
import { Injectable } from '@nestjs/common';
import type {
  ICarbonSeries,
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { getMetricSeries, lookupMetricValue } from '@tymlez/common-libs';
import type { ISummaryItem } from '../../interface';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class IronoreService {
  constructor(private platformService: PlatformService) {}

  async getSummary(from: IIsoDate, to: IIsoDate): Promise<ISummaryItem[]> {
    const {
      ironoreEmissionMetricNames,
      ironoreMaterialInputMetricNames,
      ironoreEnergyInputMetricNames,
      ironoreMaterialOutputMetricNames,
    } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...ironoreEmissionMetricNames,
        ...ironoreMaterialInputMetricNames,
        ...ironoreEnergyInputMetricNames,
        ...ironoreMaterialOutputMetricNames,
      ],
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return [
      {
        name: 'fineIronore',
        label: 'Iron Ore In',
        type: 'input',
        value: lookupMetricValue(queryResult, ironoreMaterialInputMetricNames),
        uom: 't',
      },
      {
        name: 'energy',
        label: 'Energy consumption',
        type: 'input',
        value: round(
          lookupMetricValue(queryResult, ironoreEnergyInputMetricNames) / 1000,
        ),
        uom: 'MWh',
      },
      {
        name: 'emission',
        label: 'CO2eq Emissions',
        type: 'output',
        value: round(
          lookupMetricValue(queryResult, ironoreEmissionMetricNames) / 1000,
        ),
        uom: 't',
      },
      {
        name: 'abatement',
        label: 'CO2eq Abated',
        type: 'output',
        value: 0,
        uom: 't',
      },
      {
        name: 'net',
        label: 'Net CO2eq',
        type: 'output',
        value: round(
          lookupMetricValue(queryResult, ironoreEmissionMetricNames) / 1000,
        ),
        uom: 't',
      },
      {
        name: 'ironore',
        label: 'Iron Ore Produced',
        type: 'output',
        value: lookupMetricValue(queryResult, ironoreMaterialOutputMetricNames),
        uom: 't',
      },
    ];
  }

  async getOutputSeries(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const { ironoreMaterialOutputMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [...ironoreMaterialOutputMetricNames],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricSeries(queryResult);
  }

  async getProcesses(from: IIsoDate, to: IIsoDate) {
    const { ironoreProcesses } = ClientSettings;
    const relevantMetricNames = ironoreProcesses
      .flatMap((i) => i.metrics)
      .flatMap((i) => i.keys);

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: relevantMetricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return ironoreProcesses.map((item) => {
      const metrics = item.metrics.map((metric) => {
        const { keys, uom } = metric;
        let value: number =
          uom === 'MWh'
            ? lookupMetricValue(queryResult, keys) / 1000
            : lookupMetricValue(queryResult, keys);
        value = round(value, 4);
        return { ...metric, value };
      });

      return { ...item, metrics };
    });
  }

  async getCarbonSeriesData(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ICarbonSeries> {
    const { ironoreEmissionMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ironoreEmissionMetricNames,
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return {
      emission: getMetricSeries(queryResult),
    };
  }
}
