import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import crypto from 'crypto';
import {
  getStartOfDay,
  getStartOfHour,
  getStartOfMonth,
  getStartOfWeek,
  getTimezoneOffset,
  isoDateTimeToEpochSeconds,
} from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
} from '@tymlez/platform-api-interfaces';
import type { IWattwatchersData } from './wattwatchers.types';

export const WATTWATCHERS_API_URL = {
  MOCK:
    process.env.WATTWATCHERS_API_URL || 'https://api-v3.wattwatchers.com.au',
  API: 'https://api-v3.wattwatchers.com.au',
};

@Injectable()
export class WattwatchersService {
  private readonly logger = new Logger(WattwatchersService.name);

  /**
   * Ref: https://docs.wattwatchers.com.au/api/v3/endpoints.html#get-long-energydevice-id
   * @param meterId
   * @param dataCredentials
   * @param fromTs
   * @param toTs
   * @param granularity
   * @returns
   */
  private async fetchMeterData(
    apiTarget: 'API' | 'MOCK',
    dataSource: string,
    dataCredentials: string,
    fromTs: number,
    toTs: number,
    interval: number,
  ): Promise<IWattwatchersData[]> {
    const granularityMap = [
      ['5m', 300],
      ['15m', 900],
      ['30m', 1800],
      ['hour', 3600],
      ['day', 86400],
      ['week', 86400 * 7],
      ['month', 86400 * 3],
    ];
    const validGranularity = granularityMap.filter((i) => i[1] === interval);
    const granularity =
      validGranularity.length > 0 ? validGranularity[0][0] : '5m';

    const params = {
      'convert[energy]': 'kWh',
      timezone: 'UTC',
      fromTs,
      toTs,
      granularity,
    };
    const targetApiUrl = WATTWATCHERS_API_URL[apiTarget];
    try {
      const { data } = await axios.get(
        `${targetApiUrl}/long-energy/${dataSource}`,
        {
          headers: {
            Authorization: `Bearer ${dataCredentials}`,
          },
          params,
        },
      );
      return data.map((item: IWattwatchersData) => ({
        ...item,
        dataSource,
      }));
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  // async readMeterAt(meter: IMeter, isoDateTime: IIsoDate) {
  //   const fromTs = isoDateTimeToEpochSeconds(isoDateTime);
  //   const toTs = fromTs + 1;
  //   return await this.fetchMeterData(
  //     meter.dataSource,
  //     meter.dataCredentials || '',
  //     fromTs,
  //     toTs,
  //     meter.interval,
  //   );
  // }

  async readMeterSince(meter: IMeter, isoDateTime: IIsoDate) {
    const fromTs = isoDateTimeToEpochSeconds(isoDateTime);
    const toTs = fromTs + 7 * 86400;
    return await this.fetchMeterData(
      meter.dataSourceType as any,
      meter.dataSource,
      meter.dataCredentials || '',
      fromTs,
      toTs,
      meter.interval || 300,
    );
  }

  transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    timezone: string,
    data: IWattwatchersData,
  ): IMeterData[] {
    const values = data.eRealPositiveKwh;
    const timezoneOffset = getTimezoneOffset(new Date(isoDateTime), timezone);

    const energyData = values.map((value, index) => {
      return {
        meterKey: meter.key,
        interval: meter.interval,
        metricName: 'eRealPositiveKwh',
        metricValue: value,
        isoDateTime,
        isoDateTimeHour: getStartOfHour(isoDateTime),
        isoDateTimeDay: getStartOfDay(isoDateTime, timezoneOffset),
        isoDateTimeWeek: getStartOfWeek(isoDateTime, timezoneOffset),
        isoDateTimeMonth: getStartOfMonth(isoDateTime, timezoneOffset),
        sourceHash: crypto
          .createHash('md5')
          .update(JSON.stringify(data))
          .digest('hex'),
        tags: [`${index}@${meter.key}`],
      };
    });

    let officialCarbonData: IMeterData[] = [];
    if (meter.officialCarbonFactor > 0) {
      officialCarbonData = energyData.map((value) => {
        return {
          ...value,
          metricName: 'officialCarbon',
          metricValue: value.metricValue * meter.officialCarbonFactor,
        };
      });
    }

    let customCarbonData: IMeterData[] = [];
    if (meter.customCarbonFactor > 0) {
      customCarbonData = energyData.map((value) => {
        return {
          ...value,
          metricName: 'customCarbon',
          metricValue: value.metricValue * meter.customCarbonFactor,
        };
      });
    }

    return [...energyData, ...officialCarbonData, ...customCarbonData];
  }
}
