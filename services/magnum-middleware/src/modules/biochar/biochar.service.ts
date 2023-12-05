import { round } from 'lodash';
import { Injectable } from '@nestjs/common';
import type {
  ICarbonSeries,
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import {
  diffSeriesData,
  getMetricSeries,
  lookupMetricSeries,
  lookupMetricValue,
} from '@tymlez/common-libs';
import type { ISummaryItem } from '../../interface';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class BiocharService {
  constructor(private platformService: PlatformService) {}

  async getSummary(from: IIsoDate, to: IIsoDate): Promise<ISummaryItem[]> {
    const {
      biocharEmissionMetricNames,
      biocharAbatementMetricNames,
      biocharMaterialInputMetricNames,
      biocharEnergyInputMetricNames,
      biocharMaterialOutputMetricNames,
    } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...biocharEmissionMetricNames,
        ...biocharAbatementMetricNames,
        ...biocharMaterialInputMetricNames,
        ...biocharEnergyInputMetricNames,
        ...biocharMaterialOutputMetricNames,
      ],
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const totalEmissions = round(
      lookupMetricValue(queryResult, biocharEmissionMetricNames) / 1000,
    );
    const totalAbatement = round(
      lookupMetricValue(queryResult, biocharAbatementMetricNames) / 1000,
    );
    const totalInput = lookupMetricValue(
      queryResult,
      biocharMaterialInputMetricNames,
    );
    const totalOutput = lookupMetricValue(
      queryResult,
      biocharMaterialOutputMetricNames,
    );
    const totalEnergy = lookupMetricValue(
      queryResult,
      biocharEnergyInputMetricNames,
    );

    return [
      {
        name: 'biomass',
        label: 'Biomass In',
        type: 'input',
        value: totalInput,
        uom: 't',
      },
      {
        name: 'energy',
        label: 'Energy consumption',
        type: 'input',
        value: totalEnergy / 1000,
        uom: 'MWh',
      },
      {
        name: 'emission',
        label: 'CO2eq Emissions',
        type: 'output',
        value: totalEmissions,
        uom: 't',
      },
      {
        name: 'abatement',
        label: 'CO2eq Abated',
        type: 'output',
        value: totalAbatement,
        uom: 't',
      },
      {
        name: 'net',
        label: 'Net CO2eq',
        type: 'output',
        value: totalEmissions - totalAbatement,
        uom: 't',
      },
      {
        name: 'biochar',
        label: 'Biochar Produced',
        type: 'output',
        value: totalOutput,
        uom: 't',
      },
    ];
  }

  async getOutputSeries(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const { biocharMaterialOutputMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [...biocharMaterialOutputMetricNames],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricSeries(queryResult);
  }

  async getProcesses(from: IIsoDate, to: IIsoDate) {
    const { biocharProcesses } = ClientSettings;
    const relevantMetricNames = biocharProcesses
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

    return biocharProcesses.map((item) => {
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
    const { biocharEmissionMetricNames, biocharAbatementMetricNames } =
      ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...biocharEmissionMetricNames,
        ...biocharAbatementMetricNames,
      ],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    const emission = lookupMetricSeries(
      queryResult,
      biocharEmissionMetricNames,
    );

    const abatement = lookupMetricSeries(
      queryResult,
      biocharAbatementMetricNames,
    );

    const net = diffSeriesData(emission, abatement);

    return {
      emission,
      abatement,
      net,
    };
  }
}
