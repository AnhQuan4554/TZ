import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  getSecondsAgo,
  getStartOfDay,
  getStartOfHour,
  getStartOfMonth,
  getStartOfWeek,
  getTimezoneOffset,
} from '@tymlez/common-libs';
import crypto from 'crypto';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
} from '@tymlez/platform-api-interfaces';
import type { ISolcastData } from './solcast.types';

export const SOLCAST_API_URL = {
  MOCK:
    process.env.SOLCAST_API_URL ||
    'https://api.solcast.com.au/utility_scale_sites',
  API: 'https://api.solcast.com.au/utility_scale_sites',
};

@Injectable()
export class SolcastService {
  private readonly logger = new Logger(SolcastService.name);

  /**
   * Ref: https://docs.solcast.com.au/#estimated-actuals-utility-scale-site
   * @param meterId
   * @param dataCredentials
   * @param fromTs
   * @param toTs
   * @param granularity
   * @returns
   */
  private async fetchMeterData(
    apiTarget: 'API' | 'MOCK',
    dataSource: string, // resource id
    dataCredentials: string,
    hours: number,
    interval: number,
  ): Promise<ISolcastData[]> {
    const granularityMap = [
      ['PT5M', 300],
      ['PT10M', 600],
      ['PT15M', 900],
      ['PT30M', 1800],
    ];

    const validPeriod = granularityMap.find((i) => i[1] === interval);
    const period = validPeriod ? validPeriod[0] : 'PT5M';

    const params = {
      period,
      hours,
      format: 'json',
    };
    const targetApiUrl = SOLCAST_API_URL[apiTarget];
    try {
      const { data } = await axios.get<{ estimated_actuals: ISolcastData[] }>(
        `${targetApiUrl}/${dataSource}/estimated_actuals`,
        {
          params,
          headers: {
            Authorization: `Bearer ${dataCredentials}`,
          },
        },
      );
      this.logger.log('Requesting solcast data', {
        url: `${targetApiUrl}/${dataSource}/estimated_actuals`,
        params,
      });

      const sources = data.estimated_actuals.map((item: ISolcastData) => ({
        ...item,
        dataSource,
      }));

      // Handle missing data
      return this.fillMissingIntervalData(sources, interval);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public fillMissingIntervalData(sources: ISolcastData[], interval: number) {
    const result: ISolcastData[] = [];

    sources.forEach((item, index) => {
      const nextItem = sources[index + 1];
      result.push(item);
      if (nextItem) {
        let d1 = new Date(item.period_end).getTime();
        const d2 = new Date(nextItem.period_end).getTime();
        while (d1 - d2 > interval * 1000) {
          d1 -= interval * 1000;
          this.logger.warn('Solcast sent missing interval data', {
            start: item.period_end,
            end: nextItem.period_end,
          });
          result.push({
            ...item,
            pv_estimate: (item.pv_estimate + nextItem.pv_estimate) / 2,
            period_end: new Date(d1).toISOString(),
          });
        }
      }
    });
    return result;
  }

  async readMeterUpto(meter: IMeter, isoDateTime: IIsoDate) {
    const hoursAgo = Math.ceil(getSecondsAgo(isoDateTime) / 3600);

    if (![300, 600, 900, 1800].includes(meter.interval)) {
      this.logger.error(
        'Invalid meter interval. Only 300, 600, 900, 1800 are allowed.',
      );
      return [];
    }

    if (hoursAgo > 24 * 7) {
      this.logger.error(
        'Invalid isoDateTime. Solcast can only provide data up to 7 days ago.',
      );
      return [];
    }

    if (meter.dataCredentials === undefined) {
      this.logger.error('Solcast meter has missing api key');
      return [];
    }

    return await this.fetchMeterData(
      meter.dataSourceType as any,
      meter.dataSource,
      meter.dataCredentials || '',
      hoursAgo,
      meter.interval || 300,
    );
  }

  transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    timezone: string,
    data: ISolcastData,
  ): IMeterData[] {
    const value = data.pv_estimate * 1000 * (meter.interval / 3600);
    const timezoneOffset = getTimezoneOffset(new Date(isoDateTime), timezone);
    const sourceHash = crypto
      .createHash('md5')
      .update(JSON.stringify(data))
      .digest('hex');
    const meterData = [
      {
        meterKey: meter.key,
        interval: meter.interval,
        metricName: 'generation',
        metricValue: value,
        isoDateTime,
        isoDateTimeHour: getStartOfHour(isoDateTime),
        isoDateTimeDay: getStartOfDay(isoDateTime, timezoneOffset),
        isoDateTimeWeek: getStartOfWeek(isoDateTime, timezoneOffset),
        isoDateTimeMonth: getStartOfMonth(isoDateTime, timezoneOffset),
        tags: [data.dataSource],
        sourceHash,
      },
    ];

    if (meter.officialCarbonFactor > 0) {
      meterData.push({
        meterKey: meter.key,
        interval: meter.interval,
        metricName: 'officialCarbon',
        metricValue: value * meter.officialCarbonFactor,
        isoDateTime,
        isoDateTimeHour: getStartOfHour(isoDateTime),
        isoDateTimeDay: getStartOfDay(isoDateTime, timezoneOffset),
        isoDateTimeWeek: getStartOfWeek(isoDateTime, timezoneOffset),
        isoDateTimeMonth: getStartOfMonth(isoDateTime, timezoneOffset),
        tags: [data.dataSource],
        sourceHash,
      });
    }

    if (meter.customCarbonFactor > 0) {
      meterData.push({
        meterKey: meter.key,
        interval: meter.interval,
        metricName: 'customCarbon',
        metricValue: value * meter.customCarbonFactor,
        isoDateTime,
        isoDateTimeHour: getStartOfHour(isoDateTime),
        isoDateTimeDay: getStartOfDay(isoDateTime, timezoneOffset),
        isoDateTimeWeek: getStartOfWeek(isoDateTime, timezoneOffset),
        isoDateTimeMonth: getStartOfMonth(isoDateTime, timezoneOffset),
        tags: [data.dataSource],
        sourceHash,
      });
    }

    return meterData;
  }
}
