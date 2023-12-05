import { Injectable } from '@nestjs/common';
import type {
  ICarbonTotal,
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ICarbonSeries,
  ISummaryItem,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { round } from 'lodash';
import {
  diffSeriesData,
  findMetricSeries,
  findMetricValue,
} from '@tymlez/common-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class CarbonService {
  constructor(private platformService: PlatformService) {}

  async getCarbonTotalData(
    from: IIsoDate,
    to: IIsoDate,
  ): Promise<ICarbonTotal> {
    const [consumptionMeterKey, generationMeterKey] =
      await this.platformService.getSettingByNames([
        ClientSettings.consumptionMeterKeySettingName,
        ClientSettings.generationMeterKeySettingName,
      ]);

    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey, generationMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['officialCarbon'],
      granularity: 'total',
      groupByMeters: true,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const emission =
      queryResult.find((data) => data.meterKey === consumptionMeterKey)
        ?.value || 0;
    const abatement =
      queryResult.find((data) => data.meterKey === generationMeterKey)?.value ||
      0;

    const net = emission - abatement;

    return {
      emission: round(emission, 4),
      abatement: round(abatement, 4),
      net: round(net, 4),
    };
  }

  async getCarbonSeriesData(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ICarbonSeries> {
    const [consumptionMeterKey, generationMeterKey] =
      await this.platformService.getSettingByNames([
        ClientSettings.consumptionMeterKeySettingName,
        ClientSettings.generationMeterKeySettingName,
      ]);

    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey, generationMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['officialCarbon'],
      granularity,
      groupByMeters: true,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const emission: ISeriesItem[] = findMetricSeries(
      queryResult,
      consumptionMeterKey,
    );

    const abatement: ISeriesItem[] = findMetricSeries(
      queryResult,
      generationMeterKey,
    );

    const net = diffSeriesData(emission, abatement);

    return { emission, abatement, net };
  }

  async getCarbonSummary(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISummaryItem[]> {
    const [consumptionMeterKey, generationMeterKey] =
      await this.platformService.getSettingByNames([
        ClientSettings.consumptionMeterKeySettingName,
        ClientSettings.generationMeterKeySettingName,
      ]);
    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey, generationMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['officialCarbon'],
      granularity,
      groupByMeters: true,
    };
    const queryResult = await this.platformService.queryMeterData(query);

    const diff = new Date(to).getTime() - new Date(from).getTime();
    const preQuery: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey, generationMeterKey],
      fromIsoDateTime: new Date(new Date(from).getTime() - diff).toISOString(),
      toIsoDateTime: from,
      metricNames: ['officialCarbon'],
      granularity,
      groupByMeters: true,
    };
    const preQueryResult = await this.platformService.queryMeterData(preQuery);

    return [
      {
        name: 'carbonOutput',
        label: 'Carbon Output',
        preValue: findMetricValue(preQueryResult, consumptionMeterKey),
        value: findMetricValue(queryResult, consumptionMeterKey),
        series: findMetricSeries(queryResult, consumptionMeterKey),
        uom: 'kg',
        type: 'output',
      },
      {
        name: 'carbonAbatement',
        label: 'Carbon Abatement (simulated)',
        preValue: findMetricValue(preQueryResult, generationMeterKey),
        value: findMetricValue(queryResult, generationMeterKey),
        series: findMetricSeries(queryResult, generationMeterKey),
        uom: 'kg',
        type: 'input',
      },
    ];
  }
}
