import { Injectable, Logger } from '@nestjs/common';
import { round } from 'lodash';

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
import { MetricNames } from './constants';
import type { IH2GOData, IH2GoJobSettings } from './worker.types';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  private pvCache: Record<string, number> = {};
  private validateResponse(input: IH2GOData, pv: number) {
    const inputValidator = {
      solar: {
        type: 'object',
        properties: {
          value: { type: 'number' },
        },
      },
      electricity: {
        type: 'object',
        properties: {
          value: { type: 'number' },
        },
      },
    };
    const schema = {
      type: 'object',
      properties: {
        solar: {
          type: 'object',
          required: ['pv_estimate', 'value'],
          properties: {
            pv_estimate: { type: 'number' },
            value: { type: 'number' },
          },
        },
        water_treatment: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                hydrogen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
              },
            },
            input: {
              type: 'object',
              properties: {
                water: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
                ...inputValidator,
              },
            },
          },
        },
        electrolyser: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                hydrogen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
                oxygen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
              },
            },
            input: {
              type: 'object',
              properties: {
                water: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
                ...inputValidator,
              },
            },
          },
        },
        gas_purification: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                hydrogen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
              },
            },
            input: {
              type: 'object',
              properties: {
                hydrogen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
                ...inputValidator,
              },
            },
          },
        },
        compression: {
          type: 'object',
          properties: {
            output: {
              type: 'object',
              properties: {
                hydrogen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
              },
            },
            input: {
              type: 'object',
              properties: {
                hydrogen: {
                  type: 'object',
                  properties: {
                    value: { type: 'number' },
                  },
                },
                ...inputValidator,
              },
            },
          },
        },
      },
      required: ['solar'],
      additionalProperties: true,
    };
    const ajv = new Ajv();

    const valid = ajv.validate(schema, input.H2GoO);
    if (!valid) {
      this.logger.error(
        { errors: ajv.errors },
        'Response schema validation failed',
      );
      throw new Error(ajv.errorsText(ajv.errors));
    }
    if (round(Number(input.H2GoO.solar.pv_estimate), 3) !== round(pv, 3)) {
      this.logger.error(
        { solar: input.H2GoO.solar, pv },
        'Response pv_estimate validation failed',
      );
      throw new Error('Response pv_estimate validation failed');
    }
    return input;
  }

  private async fetchMeterData(
    dataSource: string,
    dataCredentials: string,
    timestamp: ITimestampSec,
    // eslint-disable-next-line camelcase
    pv_estimate: number,
    duration = 30,
  ): Promise<IH2GOData> {
    const params = {
      timestamp,
      key: dataCredentials,
      // eslint-disable-next-line camelcase
      pv_estimate,
      duration,
    };
    const isoTime = new Date(timestamp * 1000).toISOString();
    this.logger.log(
      { pv_estimate, isoTime, duration },
      `Fetch data for data point: ${isoTime} pv_estimate=${pv_estimate} duration=${duration}`,
    );
    const fetchData = async () => {
      const res = await axios.get<IH2GOData>(dataSource, { params });
      return this.validateResponse(res.data, pv_estimate);
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
    settings: IH2GoJobSettings,
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
    data: IH2GOData,
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
    const generation =
      (+data.H2GoO.solar.pv_estimate || 0) * 1000 * (meter.interval / 3600);

    const meterData = [
      // water treatment
      [
        MetricNames.WATER_TREATMENT_ELECTRICITY_INPUT,
        data.H2GoO.water_treatment.input.electricity.value,
      ],
      [
        MetricNames.WATER_TREATMENT_SOLAR_INPUT,
        data.H2GoO.water_treatment.input.solar.value,
      ],
      [
        MetricNames.WATER_TREATMENT_WATER_INPUT,
        data.H2GoO.water_treatment.input.water.value,
      ],
      [
        MetricNames.WATER_TREATMENT_WATER_OUTPUT,
        data.H2GoO.water_treatment.output.water.value,
      ],
      [
        MetricNames.WATER_TREATMENT_WATER_EMISSIONS,
        data.H2GoO.water_treatment.input.electricity.value * carbonFactors,
      ],
      [
        MetricNames.WATER_TREATMENT_WATER_REDUCTION,
        data.H2GoO.water_treatment.input.solar.value * carbonFactors,
      ],

      // Electrolyser
      [
        MetricNames.ELECTOLYSER_ELECTRICITY_INPUT,
        data.H2GoO.electrolyser.input.electricity.value,
      ],
      [
        MetricNames.ELECTOLYSER_SOLAR_INPUT,
        data.H2GoO.electrolyser.input.solar.value,
      ],
      [
        MetricNames.ELECTOLYSER_WATER_INPUT,
        data.H2GoO.electrolyser.input.water.value,
      ],
      [
        MetricNames.ELECTOLYSER_HYDROGEN_OUTPUT,
        data.H2GoO.electrolyser.output.hydrogen.value,
      ],
      [
        MetricNames.ELECTOLYSER_OXYGEN_OUTPUT,
        data.H2GoO.electrolyser.output.oxygen.value,
      ],
      [
        MetricNames.ELECTOLYSER_CO2_REDUCTION,
        data.H2GoO.electrolyser.input.solar.value * carbonFactors,
      ],
      [
        MetricNames.ELECTOLYSER_CO2_EMISSION,

        data.H2GoO.electrolyser.input.electricity.value * carbonFactors,
      ],

      // gas Purification

      [
        MetricNames.GAS_PURIFICATION_ELECTRICITY_INPUT,
        data.H2GoO.gas_purification.input.electricity.value,
      ],
      [
        MetricNames.GAS_PURIFICATION_SOLAR_INPUT,
        data.H2GoO.gas_purification.input.solar.value,
      ],
      [
        MetricNames.GAS_PURIFICATION_HYDROGEN_INPUT,
        data.H2GoO.gas_purification.input.hydrogen.value,
      ],

      [
        MetricNames.GAS_PURIFICATION_HYDROGEN_OUTPUT,
        data.H2GoO.gas_purification.output.hydrogen.value,
      ],
      [
        MetricNames.GAS_PURIFICATION_EMISSIONS,
        data.H2GoO.gas_purification.input.electricity.value * carbonFactors,
      ],
      [
        MetricNames.GAS_PURIFICATION_REDUCTION,
        data.H2GoO.gas_purification.input.solar.value * carbonFactors,
      ],

      // Compressor

      [
        MetricNames.COMPRESSION_ELECTRICITY_INPUT,
        data.H2GoO.compression.input.electricity.value,
      ],
      [
        MetricNames.COMPRESSION_SOLAR_INPUT,
        data.H2GoO.compression.input.solar.value,
      ],
      [
        MetricNames.COMPRESSION_HYDROGEN_INPUT,
        data.H2GoO.compression.input.hydrogen.value,
      ],

      [
        MetricNames.COMPRESSION_HYDROGEN_OUTPUT,
        data.H2GoO.compression.output.hydrogen.value,
      ],

      [
        MetricNames.COMPRESSION_EMISSIONS,
        data.H2GoO.compression.input.electricity.value * carbonFactors,
      ],
      [
        MetricNames.COMPRESSION_REDUCTION,
        data.H2GoO.compression.input.solar.value * carbonFactors,
      ],

      // Total calculation
      [MetricNames.SOLAR_GENERATION, generation],

      [
        MetricNames.CO2_REDUCTION,
        (data.H2GoO.water_treatment.input.solar.value +
          data.H2GoO.electrolyser.input.solar.value +
          data.H2GoO.gas_purification.input.solar.value +
          data.H2GoO.compression.input.solar.value) *
          carbonFactors,
      ],
      [
        MetricNames.CO2_EMISSIONS,
        (data.H2GoO.water_treatment.input.electricity.value +
          data.H2GoO.electrolyser.input.electricity.value +
          data.H2GoO.gas_purification.input.electricity.value +
          data.H2GoO.compression.input.electricity.value) *
          carbonFactors,
      ],
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
