import axios from 'axios';
import { keyBy } from 'lodash';
import crypto from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import {
  addDaysTo,
  getStartOfDay,
  getStartOfHour,
  getStartOfMonth,
  getStartOfWeek,
  getTimezoneOffset,
  isoDateTimeToEpochSeconds,
  parseNumber,
} from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
  IMeterDataQuery,
  ITimestampSec,
} from '@tymlez/platform-api-interfaces';
import {
  IMagnumData,
  MagnumMetricNameEnum,
  MagnumProcessNameEnum,
} from './magnum.types';
import {
  carbonReductionFactors,
  gasEmissionFactors,
  gridEmissionCo2eqFactors,
  gridEmissionCo2Factors,
  gridEmissionCh4Factors,
  gridEmissionN2oFactors,
} from './magnum.config';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class MagnumService {
  private readonly logger = new Logger(MagnumService.name);

  constructor(private platformService: PlatformService) {}

  // Note: Magnum use Mockaroo to simulate meter data
  // Magnum Mockaroo data is at 300 seconds intervals
  private async fetchMeterData(
    dataSource: string,
    dataCredentials: string,
    timestamp: ITimestampSec,
  ): Promise<IMagnumData> {
    const mockarooURL = 'https://my.api.mockaroo.com/';
    const targetApiUrl = `${mockarooURL}${dataSource}/1234567890.json`;
    const params = {
      key: dataCredentials,
      timestamp,
    };

    try {
      const { data } = await axios.get(targetApiUrl, {
        params,
      });
      return data as IMagnumData;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async readMeterAt(meter: IMeter, isoDateTime: IIsoDate) {
    const timestamp = isoDateTimeToEpochSeconds(isoDateTime);

    const rawData = await this.fetchMeterData(
      meter.dataSource,
      meter.dataCredentials || '',
      timestamp,
    );

    return [rawData];
  }

  private calculateCarbon(
    rawMeterData: IMeterData[],
    carbonFactors: Record<string, number>,
  ): { total: number; breakdown: Record<string, number> } {
    let total = 0;
    const carbonData: Record<string, number> = {};
    rawMeterData.forEach((item) => {
      const { metricName } = item;
      const factor =
        metricName in carbonFactors ? carbonFactors[metricName] : 0;
      const carbonAmount = factor * item.metricValue;

      if (carbonAmount) {
        total += carbonAmount;
        carbonData[`${metricName}-carbon`] = carbonAmount;
      }
    });

    return { total, breakdown: carbonData };
  }

  private async buildCarbonMetricData(
    prefix: string,
    rawMeterData: IMeterData[],
    isoDateTime: IIsoDate,
  ): Promise<Record<string, number>> {
    const carbonData: Record<string, number> = {};

    // Co2eq
    const { total: co2eqTotal, breakdown: co2eqBreakdown } =
      this.calculateCarbon(rawMeterData, gridEmissionCo2eqFactors);

    if (co2eqTotal > 0) {
      carbonData[`${prefix}-grid-emission-carbon`] = co2eqTotal;
      Object.assign(carbonData, co2eqBreakdown);
    }

    // Co2
    const { total: co2Total } = this.calculateCarbon(
      rawMeterData,
      gridEmissionCo2Factors,
    );

    if (co2Total > 0) {
      carbonData[`${prefix}-grid-emission-carbon-co2`] = co2eqTotal;
    }

    // CH4
    const { total: ch4Total } = this.calculateCarbon(
      rawMeterData,
      gridEmissionCh4Factors,
    );

    if (ch4Total > 0) {
      carbonData[`${prefix}-grid-emission-carbon-ch4`] = ch4Total;
    }

    // NO2
    const { total: no2Total } = this.calculateCarbon(
      rawMeterData,
      gridEmissionN2oFactors,
    );

    if (no2Total > 0) {
      carbonData[`${prefix}-grid-emission-carbon-no2`] = no2Total;
    }

    // Gas
    const { total: gasTotal, breakdown: gasBreakdown } = this.calculateCarbon(
      rawMeterData,
      gasEmissionFactors,
    );

    if (gasTotal > 0) {
      carbonData[`${prefix}-gas-emission-carbon`] = gasTotal;
      Object.assign(carbonData, gasBreakdown);
    }

    // Reduction
    const { total: reductionTotal } = this.calculateCarbon(
      rawMeterData,
      carbonReductionFactors,
    );

    if (reductionTotal > 0) {
      carbonData[`${prefix}-reduced-carbon`] = reductionTotal;
    }

    // Hismelt specific carbon
    const hismeltInputMetrics = rawMeterData.filter((i) =>
      [
        'hismelt-oredryer-input-iron_conc',
        'hismelt-charmill-input-biochar',
      ].includes(i.metricName),
    );

    if (hismeltInputMetrics.length > 0) {
      const inputMap = keyBy(hismeltInputMetrics, 'metricName');
      const ironoreAmount = parseNumber(
        inputMap['hismelt-oredryer-input-iron_conc']?.metricValue,
      );
      const biocharAmount = parseNumber(
        inputMap['hismelt-charmill-input-biochar']?.metricValue,
      );

      const { biocharFactor, ironoreFactor } =
        await this.getHismeltMaterialCarbonFactor(isoDateTime);

      carbonData['hismelt-input-biochar-carbon'] =
        biocharAmount * biocharFactor;
      carbonData['hismelt-input-ironore-carbon'] =
        ironoreAmount * ironoreFactor;
    }

    return carbonData;
  }

  private async getHismeltMaterialCarbonFactor(isoDateTime: IIsoDate) {
    const biocharMetrics = [
      'biochar-grid-emission-carbon',
      'biochar-gas-emission-carbon',
      'biochar-pyrolyser-output-biochar',
      'biochar-reduced-carbon',
    ];
    const ironoreMetrics = [
      'ironore-grid-emission-carbon',
      'ironore-magsep-output-iron_conc',
    ];

    const from = addDaysTo(isoDateTime, -7);
    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: isoDateTime,
      metricNames: [...biocharMetrics, ...ironoreMetrics],
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const metricData = keyBy(queryResult, 'metricName');

    const biocharGridEmission = parseNumber(
      metricData['biochar-grid-emission-carbon']?.value,
    );

    const biocharGasEmission = parseNumber(
      metricData['biochar-gas-emission-carbon']?.value,
    );

    const biocharReduction = parseNumber(
      metricData['biochar-reduced-carbon']?.value,
    );

    const biocharOutput = parseNumber(
      metricData['biochar-pyrolyser-output-biochar']?.value,
    );

    const ironoreGridEmission = parseNumber(
      metricData['ironore-grid-emission-carbon']?.value,
    );

    const ironoreOutput = parseNumber(
      metricData['ironore-magsep-output-iron_conc']?.value,
    );

    const biocharCarbon =
      biocharGasEmission + biocharGridEmission - biocharReduction;
    const biocharFactor = biocharOutput > 0 ? biocharCarbon / biocharOutput : 0;
    const ironoreFactor =
      ironoreOutput > 0 ? ironoreGridEmission / ironoreOutput : 0;

    return { biocharFactor, ironoreFactor };
  }

  async transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    timezone: string,
    data: IMagnumData,
  ): Promise<IMeterData[]> {
    const timezoneOffset = getTimezoneOffset(new Date(isoDateTime), timezone);

    const isoDateTimeHour = getStartOfHour(isoDateTime);
    const isoDateTimeDay = getStartOfDay(isoDateTime, timezoneOffset);
    const isoDateTimeWeek = getStartOfWeek(isoDateTime, timezoneOffset);
    const isoDateTimeMonth = getStartOfMonth(isoDateTime, timezoneOffset);
    const sourceHash = crypto
      .createHash('md5')
      .update(JSON.stringify(data))
      .digest('hex');

    const transformedData: IMeterData[] = [];
    const relevantProcesses = Object.values(MagnumProcessNameEnum).filter(
      (process: string) => process in data,
    );

    relevantProcesses.forEach((process: MagnumProcessNameEnum) => {
      const value = data[process];
      const inputs = value?.input || {};
      const outputs = value?.output || {};

      for (const metricName in inputs) {
        const metricData = inputs[metricName as MagnumMetricNameEnum];
        transformedData.push({
          meterKey: meter.key,
          interval: meter.interval,
          metricName:
            `${meter.key}-${process}-input-${metricName}`.toLowerCase(),
          metricValue: metricData?.value || 0,
          isoDateTime,
          isoDateTimeHour,
          isoDateTimeDay,
          isoDateTimeWeek,
          isoDateTimeMonth,
          sourceHash,
          tags: [],
        });
      }

      for (const metricName in outputs) {
        const metricData = outputs[metricName as MagnumMetricNameEnum];
        transformedData.push({
          meterKey: meter.key,
          interval: meter.interval,
          metricName:
            `${meter.key}-${process}-output-${metricName}`.toLowerCase(),
          metricValue: metricData?.value || 0,
          isoDateTime,
          isoDateTimeHour,
          isoDateTimeDay,
          isoDateTimeWeek,
          isoDateTimeMonth,
          sourceHash,
          tags: [],
        });
      }
    });

    const prefix = meter.key.toLowerCase();
    const carbonMetricData = await this.buildCarbonMetricData(
      prefix,
      transformedData,
      isoDateTime,
    );

    for (const metricName in carbonMetricData) {
      const carbonAmount = carbonMetricData[metricName];

      if (carbonAmount !== 0) {
        transformedData.push({
          meterKey: meter.key,
          interval: meter.interval,
          metricName,
          metricValue: carbonAmount,
          isoDateTime,
          isoDateTimeHour,
          isoDateTimeDay,
          isoDateTimeWeek,
          isoDateTimeMonth,
          sourceHash,
          tags: [],
        });
      }
    }

    return transformedData;
  }
}
