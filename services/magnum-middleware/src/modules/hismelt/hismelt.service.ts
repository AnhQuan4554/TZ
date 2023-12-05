import { Injectable } from '@nestjs/common';
import { round } from 'lodash';
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
  getMetricValue,
  lookupMetricSeries,
  lookupMetricValue,
} from '@tymlez/common-libs';
import type { ISummaryItem } from '../../interface';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class HismeltService {
  constructor(private platformService: PlatformService) {}

  async getSummary(from: IIsoDate, to: IIsoDate): Promise<ISummaryItem[]> {
    const {
      hismeltEmissionMetricNames,
      hismeltAbatementMetricNames,
      hismeltIronoreMaterialInputMetricNames,
      hismeltBiocharMaterialInputMetricNames,
      hismeltEnergyInputMetricNames,
      hismeltMaterialOutputMetricNames,
      hismeltEnergyOutputMetricNames,
    } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...hismeltEmissionMetricNames,
        ...hismeltAbatementMetricNames,
        ...hismeltIronoreMaterialInputMetricNames,
        ...hismeltBiocharMaterialInputMetricNames,
        ...hismeltEnergyInputMetricNames,
        ...hismeltMaterialOutputMetricNames,
        ...hismeltEnergyOutputMetricNames,
      ],
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const totalEmissions = round(
      lookupMetricValue(queryResult, hismeltEmissionMetricNames) / 1000,
    );
    const totalAbatement = round(
      lookupMetricValue(queryResult, hismeltAbatementMetricNames) / 1000,
    );

    return [
      {
        name: 'biochar',
        label: 'Biochar In',
        type: 'input',
        value: lookupMetricValue(
          queryResult,
          hismeltBiocharMaterialInputMetricNames,
        ),
        uom: 't',
      },
      {
        name: 'ironore',
        label: 'Iron Ore In',
        type: 'input',
        value: lookupMetricValue(
          queryResult,
          hismeltIronoreMaterialInputMetricNames,
        ),
        uom: 't',
      },
      {
        name: 'energy',
        label: 'Energy consumption',
        type: 'input',
        value: round(
          lookupMetricValue(queryResult, hismeltEnergyInputMetricNames) / 1000,
        ),
        uom: 'MWh',
      },
      {
        name: 'energyProduction',
        label: 'Energy production',
        type: 'input',
        value: round(
          lookupMetricValue(queryResult, hismeltEnergyOutputMetricNames) / 1000,
        ),
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
        name: 'pigIron',
        label: 'Pig Iron Produced',
        type: 'output',
        value: lookupMetricValue(queryResult, hismeltMaterialOutputMetricNames),
        uom: 't',
      },
    ];
  }

  async getOutputSeries(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const { hismeltMaterialOutputMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [...hismeltMaterialOutputMetricNames],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricSeries(queryResult);
  }

  async getTotalOutput(from: IIsoDate, to: IIsoDate) {
    const { hismeltMaterialOutputMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [...hismeltMaterialOutputMetricNames],
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricValue(queryResult);
  }

  async getTotalCarbonEmission(from: IIsoDate, to: IIsoDate) {
    const { hismeltCarbonFootprintMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: hismeltCarbonFootprintMetricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricValue(queryResult);
  }

  async getTotalCarbonAbatement(from: IIsoDate, to: IIsoDate) {
    const { hismeltAbatementMetricNames } = ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: hismeltAbatementMetricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);
    return getMetricValue(queryResult);
  }

  async getProcesses(from: IIsoDate, to: IIsoDate) {
    const { hismeltProcesses } = ClientSettings;
    const relevantMetricNames = hismeltProcesses
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

    return hismeltProcesses.map((item) => {
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
    const { hismeltAbatementMetricNames, hismeltCarbonFootprintMetricNames } =
      ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...hismeltCarbonFootprintMetricNames,
        ...hismeltAbatementMetricNames,
      ],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const emission = lookupMetricSeries(
      queryResult,
      hismeltCarbonFootprintMetricNames,
    );

    const abatement = lookupMetricSeries(
      queryResult,
      hismeltAbatementMetricNames,
    );

    const net = diffSeriesData(emission, abatement);

    return {
      emission,
      abatement,
      net,
    };
  }
}
