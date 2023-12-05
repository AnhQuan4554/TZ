import { round } from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import assert from 'assert';
import type {
  IIsoDate,
  IMeterDataQuery,
  IMeterDataResult,
  IMetricGranularity,
  ISeriesItem,
  ISummaryItem,
  kWh,
} from '@tymlez/platform-api-interfaces';
import { getMetricSeries, getMetricValue } from '@tymlez/common-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class ConsumptionService {
  private readonly logger = new Logger(ConsumptionService.name);
  constructor(private platformService: PlatformService) {}

  async getMeterConsumption(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<IMeterDataResult[]> {
    const [consumptionMeterKey] = await this.platformService.getSettingByNames([
      ClientSettings.consumptionMeterKeySettingName,
    ]);
    assert(consumptionMeterKey, 'Main consumption meter not found');

    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['eRealPositiveKwh'],
      granularity,
      groupByMeters: true,
      groupByTags: false,
    };

    this.logger.debug('getMeterConsumption');

    return await this.platformService.queryMeterData(query);
  }

  async getConsumptionTotal(from: IIsoDate, to: IIsoDate): Promise<kWh> {
    const [consumptionMeterKey] = await this.platformService.getSettingByNames([
      ClientSettings.consumptionMeterKeySettingName,
    ]);
    assert(consumptionMeterKey, 'Main consumption meter not found');

    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['eRealPositiveKwh'],
      granularity: 'total',
      groupByMeters: false,
      groupByTags: false,
    };

    this.logger.debug('getConsumptionTotal');

    const result = await this.platformService.queryMeterData(query);

    return result.length > 0 ? round(result[0].value, 4) : 0;
  }

  async getConsumptionSeries(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const [consumptionMeterKey] = await this.platformService.getSettingByNames([
      ClientSettings.consumptionMeterKeySettingName,
    ]);
    assert(consumptionMeterKey, 'Main consumption meter not found');

    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['eRealPositiveKwh'],
      granularity,
      groupByMeters: false,
      groupByTags: false,
    };

    const result = await this.platformService.queryMeterData(query);

    return getMetricSeries(result);
  }

  async getConsumptionSummary(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISummaryItem> {
    const [consumptionMeterKey] = await this.platformService.getSettingByNames([
      ClientSettings.consumptionMeterKeySettingName,
    ]);

    const query: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['eRealPositiveKwh'],
      granularity,
      groupByMeters: true,
    };
    const queryResult = await this.platformService.queryMeterData(query);

    const diff = new Date(to).getTime() - new Date(from).getTime();
    const preQuery: IMeterDataQuery = {
      meterKeys: [consumptionMeterKey],
      fromIsoDateTime: new Date(new Date(from).getTime() - diff).toISOString(),
      toIsoDateTime: from,
      metricNames: ['eRealPositiveKwh'],
      granularity,
      groupByMeters: true,
    };
    const preQueryResult = await this.platformService.queryMeterData(preQuery);

    return {
      name: 'gridEnergySupplied',
      label: 'Grid Energy Supplied',
      preValue: getMetricValue(preQueryResult),
      value: getMetricValue(queryResult),
      series: getMetricSeries(queryResult),
      uom: 'kWh',
      type: 'output',
    };
  }
}
