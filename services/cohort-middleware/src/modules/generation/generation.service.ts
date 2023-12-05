import { groupBy, round } from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import type {
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  IMultiValueHttpResponse,
  ISeriesItem,
  ISingleValueHttpResponse,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';
import assert from 'assert';
import { getProxy } from '@tymlez/backend-libs';
import {
  getMetricSeries,
  getMetricValue,
  getStartOfHour,
} from '@tymlez/common-libs';
import { PlatformService } from '../platform/platform.service';
import { ClientSettings } from '../client-settings/client-settings';

@Injectable()
export class GenerationService {
  private readonly logger = new Logger(GenerationService.name);

  constructor(private platformService: PlatformService) {}

  async getGenerationHistory(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<any> {
    const [generation] = await this.platformService.getSettingByNames([
      ClientSettings.generationMeterKeySettingName,
    ]);
    assert(generation, 'Main generation meter not found');

    const query: IMeterDataQuery = {
      meterKeys: [generation],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['generation'],
      granularity,
      groupByMeters: true,
      groupByTags: false,
    };

    const data = await this.platformService.queryMeterData(query);

    this.logger.debug('getGenerationHistory');

    return { data, count: data.length, success: true };
  }

  async getGenerationHistoryTotal(from: IIsoDate, to: IIsoDate): Promise<any> {
    const [generation] = await this.platformService.getSettingByNames([
      ClientSettings.generationMeterKeySettingName,
    ]);
    assert(generation, 'Main generation meter not found');

    const query: IMeterDataQuery = {
      meterKeys: [generation],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['generation'],
      granularity: 'total',
      groupByMeters: false,
      groupByTags: false,
    };

    const result = await this.platformService.queryMeterData(query);

    return result.length > 0 ? round(result[0].value, 4) : 0;
  }

  async getGenerationHistorySeries(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const [generation] = await this.platformService.getSettingByNames([
      ClientSettings.generationMeterKeySettingName,
    ]);
    assert(generation, 'Main generation meter not found');

    const query: IMeterDataQuery = {
      meterKeys: [generation],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['generation'],
      granularity,
      groupByMeters: false,
      groupByTags: false,
    };

    const result = await this.platformService.queryMeterData(query);

    return getMetricSeries(result);
  }

  async getGenerationSummary(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISummaryItem> {
    const [generation] = await this.platformService.getSettingByNames([
      ClientSettings.generationMeterKeySettingName,
    ]);

    const query: IMeterDataQuery = {
      meterKeys: [generation],
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: ['generation'],
      granularity,
      groupByMeters: true,
    };
    const queryResult = await this.platformService.queryMeterData(query);

    const diff = new Date(to).getTime() - new Date(from).getTime();
    const preQuery: IMeterDataQuery = {
      meterKeys: [generation],
      fromIsoDateTime: new Date(new Date(from).getTime() - diff).toISOString(),
      toIsoDateTime: from,
      metricNames: ['generation'],
      granularity,
      groupByMeters: true,
    };
    const preQueryResult = await this.platformService.queryMeterData(preQuery);

    return {
      name: 'solarEnergyGeneration',
      label: 'Solar Energy Generation (simulated)',
      preValue: getMetricValue(preQueryResult),
      value: getMetricValue(queryResult),
      series: getMetricSeries(queryResult),
      uom: 'kWh',
      type: 'input',
    };
  }

  async getGenerationForecast(
    resourceId: string,
    apiKey: string,
    hours: number,
  ): Promise<any> {
    const url = `https://api.solcast.com.au/utility_scale_sites/${resourceId}/forecasts?hours=${hours}&period=PT30M&format=json`;

    const { forecasts } = await getProxy(url, `Bearer ${apiKey}`, '');

    this.logger.debug('getGenerationForecast');

    return forecasts;
  }

  async getGenerationForecastTotal(
    hours: number,
  ): Promise<ISingleValueHttpResponse<number>> {
    try {
      const [generationMeterKey] = await this.platformService.getSettingByNames(
        [ClientSettings.generationMeterKeySettingName],
      );
      assert(generationMeterKey, 'Main generation meter not found');

      const meter = await this.platformService.getMeterByKey(
        generationMeterKey,
      );

      const apiKey = meter?.dataCredentials;
      const resourceId = meter?.dataSource;

      if (!apiKey || !resourceId) {
        // Note: If there are multiple sites, each site should have a Solacast meter.
        throw new Error(`Could not found Solcast Meter`);
      }

      const forecasts = await this.getGenerationForecast(
        resourceId,
        apiKey,
        hours,
      );

      let pvKwh = 0;
      forecasts.forEach((item: { pv_estimate: number }) => {
        pvKwh += (item.pv_estimate * 1000) / 2; // changed from megawatt to kWh
        return pvKwh;
      });

      this.logger.debug('getGenerationForecastTotal');

      return { success: true, data: pvKwh };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getGenerationForecastSeries(
    hours: number,
  ): Promise<
    IMultiValueHttpResponse<{ isoDateTime: IIsoDate; value: number }>
  > {
    try {
      const [generationMeterKey] = await this.platformService.getSettingByNames(
        [ClientSettings.generationMeterKeySettingName],
      );
      assert(generationMeterKey, 'Main generation meter not found');

      const meter = await this.platformService.getMeterByKey(
        generationMeterKey,
      );

      const apiKey = meter?.dataCredentials;
      const resourceId = meter?.dataSource;

      if (!apiKey || !resourceId) {
        // Note: If there are multiple sites, each site should have a Solacast meter.
        throw new Error(`Could not found Solcast Meter info`);
      }

      const forecasts = await this.getGenerationForecast(
        resourceId,
        apiKey,
        hours,
      );

      const groupedForecasts = groupBy(
        forecasts,
        (item: { pv_estimate: number; period_end: string }) =>
          getStartOfHour(item.period_end),
      );

      const data = Object.entries(groupedForecasts)
        .filter(([_key, values]) => values.length === 2) // remove partial hour values
        .map(([key, values]) => {
          return {
            isoDateTime: key,
            value: values.reduce(
              (partialSum, a) => partialSum + (a.pv_estimate * 1000) / 2,
              0,
            ),
          };
        });

      this.logger.debug('getGenerationForecastSeries');

      return { success: true, data, count: data.length };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
        count: 0,
      };
    }
  }
}
