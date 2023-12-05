/* eslint-disable camelcase */
import { Injectable, Logger } from '@nestjs/common';
import promiseRetry from 'promise-retry';
import Ajv from 'ajv';
import {
  getStartOfDay,
  getStartOfHour,
  getStartOfMonth,
  getStartOfWeek,
  getTimezoneOffset,
  isoDateTimeToEpochSeconds,
  dateRound,
} from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
  ITimestampSec,
} from '@tymlez/platform-api-interfaces';
import axios from 'axios';
import crypto from 'crypto';
import type { ISolarFarmData, ISolarFarmJobSettings } from './worker.types';
import { MetricNames } from './constants';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  private pvCache: Record<string, number> = {};
  private validateResponse(input: ISolarFarmData) {
    const schema = {
      type: 'object',
      properties: {
        solar_array_1: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                panels: {
                  type: 'number',
                },
                performance_percentage: {
                  type: 'number',
                },
                forecast_value: {
                  type: 'number',
                },
                value: {
                  type: 'number',
                },
              },
            },
          },
        },
        solar_array_2: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                panels: {
                  type: 'number',
                },
                performance_percentage: {
                  type: 'number',
                },
                forecast_value: {
                  type: 'number',
                },
                value: {
                  type: 'number',
                },
              },
            },
          },
        },
        solar_array_3: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                panels: {
                  type: 'number',
                },
                performance_percentage: {
                  type: 'number',
                },
                forecast_value: {
                  type: 'number',
                },
                value: {
                  type: 'number',
                },
              },
            },
          },
        },
        solar_array_4: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                panels: {
                  type: 'number',
                },
                performance_percentage: {
                  type: 'number',
                },
                forecast_value: {
                  type: 'number',
                },
                value: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      required: [
        'solar_array_1',
        'solar_array_2',
        'solar_array_3',
        'solar_array_4',
      ],
      additionalProperties: true,
    };
    const ajv = new Ajv();

    const valid = ajv.validate(schema, input.SolarFarm);
    if (!valid) {
      this.logger.error(
        { errors: ajv.errors },
        'Response schema validation failed',
      );
      throw new Error(ajv.errorsText(ajv.errors));
    }

    return input;
  }

  private async fetchMeterData(
    dataSource: string,
    dataCredentials: string,
    timestamp: ITimestampSec,
    pv_estimate: number,
    duration = 300,
  ): Promise<ISolarFarmData> {
    const params = {
      timestamp,
      key: dataCredentials,
      pv_estimate,
      duration,
    };
    const isoTime = new Date(timestamp * 1000).toISOString();
    this.logger.log(
      { pv_estimate, isoTime, duration },
      `Fetch data for data point: ${isoTime} pv_estimate=${pv_estimate} duration=${duration}`,
    );
    const fetchData = async () => {
      const res = await axios.get<ISolarFarmData>(dataSource, { params });
      return this.validateResponse(res.data);
    };

    try {
      return await promiseRetry(
        (retry) => {
          return fetchData().catch(retry);
        },
        { retries: 3 },
      ).then((data) => {
        return data;
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getSolarEstimateAt(isoDateTime: IIsoDate, solcastUrl: string) {
    const { data: solcastData } = await axios.get(solcastUrl);
    const roundDownTs = dateRound(isoDateTime as any, 5).toISOString();

    const findEstimate = (
      solcastData.estimated_actuals || solcastData.forecasts
    ).find(
      (estimate: any) =>
        new Date(estimate.period_end).toISOString() === roundDownTs,
    );

    if (!findEstimate) {
      this.logger.warn(
        {
          isoDateTime,
          roundDownTs,
        },
        `Missing solar estimated_actuals for timestamps ${roundDownTs}`,
      );
      throw new Error(
        `Missing solar estimated_actuals for timestamps ${roundDownTs}`,
      );
    }

    this.logger.log(
      { findEstimate },
      `debug solar estimated_actuals at ${isoDateTime}`,
    );
    if (findEstimate.pv_estimate > 0) {
      if (Object.keys(this.pvCache).length > 2) {
        this.pvCache = {};
      }
      this.pvCache[roundDownTs] = findEstimate.pv_estimate;
    }
    return findEstimate.pv_estimate || this.pvCache[roundDownTs] || 0;
  }

  async readMeterAt(
    meter: IMeter,
    isoDateTime: IIsoDate,
    settings: ISolarFarmJobSettings,
  ) {
    const timestamp = isoDateTimeToEpochSeconds(isoDateTime);

    if (!settings?.solcastUrl) {
      throw new Error('Job settings must provide a solcast url');
    }
    const pvEstimate = await this.getSolarEstimateAt(
      isoDateTime,
      settings?.solcastUrl,
    );

    const rawData = await this.fetchMeterData(
      meter.dataSource,
      meter.dataCredentials || '',
      timestamp,
      pvEstimate * (settings.timeFactors || 1),
      settings.duration,
    );

    return [rawData];
  }

  async transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    data: ISolarFarmData,
  ): Promise<IMeterData[]> {
    const timezone = meter.site.timezone || 'UTC';
    const timezoneOffset = getTimezoneOffset(new Date(isoDateTime), timezone);
    const sourceHash = crypto
      .createHash('md5')
      .update(JSON.stringify(data))
      .digest('hex');

    const commonFields = {
      meterKey: meter.key,
      interval: meter.interval,
      isoDateTime,
      isoDateTimeHour: getStartOfHour(isoDateTime),
      isoDateTimeDay: getStartOfDay(isoDateTime, timezoneOffset),
      isoDateTimeWeek: getStartOfWeek(isoDateTime, timezoneOffset),
      isoDateTimeMonth: getStartOfMonth(isoDateTime, timezoneOffset),
      sourceHash,
    };
    const carbonFactors = 0.8;

    const meterData = [
      // solar_array_1
      [MetricNames.ARRAY_1_OUTPUT, data.SolarFarm.solar_array_1.output.value],
      [
        MetricNames.ARRAY_1_FORECAST_VALUE_OUTPUT,
        data.SolarFarm.solar_array_1.output.forecast_value,
      ],
      [
        MetricNames.ARRAY_1_PANEL_OUTPUT,
        data.SolarFarm.solar_array_1.output.panels,
      ],
      [
        MetricNames.ARRAY_1_PERFORMANCE_PERCENTAGE_OUTPUT,
        data.SolarFarm.solar_array_1.output.performance_percentage,
      ],
      [
        MetricNames.ARRAY_1_CO2_REDUCTION,
        data.SolarFarm.solar_array_1.output.value * carbonFactors,
      ],

      // solar_array_2
      [MetricNames.ARRAY_2_OUTPUT, data.SolarFarm.solar_array_2.output.value],
      [
        MetricNames.ARRAY_2_FORECAST_VALUE_OUTPUT,
        data.SolarFarm.solar_array_2.output.forecast_value,
      ],
      [
        MetricNames.ARRAY_2_PANEL_OUTPUT,
        data.SolarFarm.solar_array_2.output.panels,
      ],
      [
        MetricNames.ARRAY_2_PERFORMANCE_PERCENTAGE_OUTPUT,
        data.SolarFarm.solar_array_2.output.performance_percentage,
      ],
      [
        MetricNames.ARRAY_2_CO2_REDUCTION,
        data.SolarFarm.solar_array_2.output.value * carbonFactors,
      ],

      // solar_array_3
      [MetricNames.ARRAY_3_OUTPUT, data.SolarFarm.solar_array_3.output.value],
      [
        MetricNames.ARRAY_3_FORECAST_VALUE_OUTPUT,
        data.SolarFarm.solar_array_3.output.forecast_value,
      ],
      [
        MetricNames.ARRAY_3_PANEL_OUTPUT,
        data.SolarFarm.solar_array_3.output.panels,
      ],
      [
        MetricNames.ARRAY_3_PERFORMANCE_PERCENTAGE_OUTPUT,
        data.SolarFarm.solar_array_3.output.performance_percentage,
      ],
      [
        MetricNames.ARRAY_3_CO2_REDUCTION,
        data.SolarFarm.solar_array_3.output.value * carbonFactors,
      ],

      // solar_array_4
      [MetricNames.ARRAY_4_OUTPUT, data.SolarFarm.solar_array_4.output.value],
      [
        MetricNames.ARRAY_4_FORECAST_VALUE_OUTPUT,
        data.SolarFarm.solar_array_4.output.forecast_value,
      ],
      [
        MetricNames.ARRAY_4_PANEL_OUTPUT,
        data.SolarFarm.solar_array_4.output.panels,
      ],
      [
        MetricNames.ARRAY_4_PERFORMANCE_PERCENTAGE_OUTPUT,
        data.SolarFarm.solar_array_4.output.performance_percentage,
      ],
      [
        MetricNames.ARRAY_4_CO2_REDUCTION,
        data.SolarFarm.solar_array_4.output.value * carbonFactors,
      ],

      // Total calculation
    ].map(
      ([metricName, metricValue]) =>
        ({
          ...commonFields,
          metricName,
          metricValue,
        } as IMeterData),
    );

    return meterData;
  }
}
