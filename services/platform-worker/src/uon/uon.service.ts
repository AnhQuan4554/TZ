import { Injectable } from '@nestjs/common';
import { max, mean, round } from 'lodash';
import crypto from 'crypto';
import {
  getStartOfDay,
  getStartOfHour,
  getStartOfMonth,
  getStartOfWeek,
  getTimezoneOffset,
  isoDateTimeToEpochSeconds,
  parseNumber,
  toIIsoDate,
} from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
} from '@tymlez/platform-api-interfaces';
import {
  IUonData,
  IUonRegistryData,
  Registries,
  UonMetrics,
} from './uon.types';
import { StorageService } from '../storage/storage.service';
import { getBatchJsonDataFromS3 } from '../storage/storage.utils';

@Injectable()
export class UonService {
  // private readonly logger = new Logger(UonService.name);
  private readonly fuelCarbonFactorCo2eq = 2.70972; // carbon kgs per liter of fuel = 38.6 * (69.9 + 0.1 + 0.2) / 1000
  private readonly fuelCarbonFactorCo2 = 2.69814; // 38.6 * 69.9 / 1000
  private readonly fuelCarbonFactorCh4 = 0.00386; // 38.6 * 0.1 / 1000
  private readonly fuelCarbonFactorN2o = 0.00772; // 38.6 * 0.2 / 1000
  private readonly abatementCarbonFactor = 0.58; // kg Co2eq / kWh

  // It will show "-2147483648" or "32768" when generator is OFF or not running.
  private readonly invalidGensetValues = [32768, -2147483648];

  constructor(private storageService: StorageService) {}

  async readMeterAt(meter: IMeter, isoDateTime: IIsoDate): Promise<IUonData[]> {
    const timestamp = isoDateTimeToEpochSeconds(isoDateTime);
    // note: the following logic simulate future uon data with
    // historical data within the given valid period
    const simulatedHistoryTimestampStart = isoDateTimeToEpochSeconds(
      '2022-10-03T16:00:00.000Z',
    );
    const simulatedHistoryTimestampEnd = isoDateTimeToEpochSeconds(
      '2022-11-03T16:00:00.000Z',
    );
    const simulatedHistorySpan =
      simulatedHistoryTimestampEnd - simulatedHistoryTimestampStart;

    const simulatedTimestamp =
      simulatedHistoryTimestampStart +
      ((timestamp - simulatedHistoryTimestampStart) % simulatedHistorySpan);

    const metrics = Object.values(Registries);
    const [bucketName, prefix] = meter.dataSource.split('/', 2);

    const prefixes = metrics.flatMap((metric) => [
      `${prefix}/${simulatedTimestamp}/${metric}/`.replace('//', '/'),
    ]);

    const credentials = JSON.parse(meter.dataCredentials || '{}');

    const data = await getBatchJsonDataFromS3(bucketName, prefixes, {
      credentials,
    });

    if (data.length === 0) {
      throw new Error(`no data available ${isoDateTime} # ${timestamp}`);
    }

    // we need to patch the historical data for the cumulative values.
    const simulatedIteration = Math.floor(
      (timestamp - simulatedHistoryTimestampStart) / simulatedHistorySpan,
    );
    const gensetEnergyBase = simulatedIteration * (36728 - 29112);
    const gensetFuelBase = simulatedIteration * (130720 - 104835);

    const patchedData = data.map((i: IUonRegistryData) => {
      const valueValid =
        i.value > 0 && !this.invalidGensetValues.includes(i.value);

      if (valueValid) {
        if (i.registry === Registries.Genset_kWHours) {
          return { ...i, value: i.value + gensetEnergyBase };
        }

        if (i.registry === Registries.Genset_TotalFuelUsed) {
          return { ...i, value: i.value + gensetFuelBase };
        }
      }

      return i;
    });

    return [
      {
        timestamp: isoDateTime,
        registryData: patchedData as IUonRegistryData[],
      },
    ];
  }

  async getTransformedMetrics(
    meter: IMeter,
    isoDateTime: IIsoDate,
  ): Promise<Record<string, number>> {
    try {
      const meterData = await this.storageService.getMeterData(
        meter,
        isoDateTime,
        'transformed',
      );

      const entries = meterData.map((record: IMeterData) => [
        record.metricName,
        record.metricValue,
      ]);

      return Object.fromEntries(entries);
    } catch (error) {
      return {};
    }
  }

  private getRegistryValueAverage(
    data: IUonRegistryData[],
    registryName: string,
    invalidValues: number[] = [],
  ): number {
    const values = data
      .filter(
        (item) =>
          item.registry === registryName &&
          item.value >= 0 &&
          !invalidValues.includes(item.value),
      )
      .map((i) => parseNumber(i.value));

    return mean(values) || 0;
  }

  private getRegistryValueMax(
    data: IUonRegistryData[],
    registryName: string,
    invalidValues: number[] = [],
  ): number {
    const validValues = data
      .filter(
        (item) =>
          item.registry === registryName &&
          item.value > 0 &&
          !invalidValues.includes(item.value),
      )
      .map((i) => parseNumber(i.value));

    return max(validValues) || 0;
  }

  async transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    timezone: string,
    data: IUonData,
  ): Promise<IMeterData[]> {
    const timezoneOffset = getTimezoneOffset(new Date(isoDateTime), timezone);
    const { interval } = meter;
    const previousTimestamp = isoDateTimeToEpochSeconds(isoDateTime) - interval;
    const previousMetrics = await this.getTransformedMetrics(
      meter,
      toIIsoDate(previousTimestamp),
    );

    const prevGensetEnergyCumulated = previousMetrics.genset_energy_cumulated;
    const prevGensetFuelCumulated = previousMetrics.genset_fuel_cumulated;

    const uonMetrics: Record<UonMetrics, number> = {
      water_pumped: 0,
      genset_energy_generated: 0,
      genset_energy_cumulated: 0,
      genset_fuel_used: 0,
      genset_fuel_cumulated: 0,
      inverter1_energy_generated: 0,
      inverter2_energy_generated: 0,
      inverters_energy_generated: 0,
      genset_carbon_emission: 0,
      genset_carbon_emission_ch4: 0,
      genset_carbon_emission_co2: 0,
      genset_carbon_emission_n2o: 0,
      inverters_carbon_abatement: 0,
    };

    const waterPumpedPerSecond = this.getRegistryValueAverage(
      data.registryData,
      Registries.VSD_Pump_Flowrate,
    );

    uonMetrics.water_pumped = waterPumpedPerSecond * meter.interval;

    const thisGensetFuelCumulated = this.getRegistryValueMax(
      data.registryData,
      Registries.Genset_TotalFuelUsed,
      this.invalidGensetValues,
    );

    const genset_fuel_used_deci_litres =
      thisGensetFuelCumulated > prevGensetFuelCumulated
        ? thisGensetFuelCumulated - prevGensetFuelCumulated
        : 0;

    uonMetrics.genset_fuel_used = genset_fuel_used_deci_litres / 10;

    uonMetrics.genset_fuel_cumulated =
      max([thisGensetFuelCumulated, prevGensetFuelCumulated]) || 0;

    uonMetrics.genset_carbon_emission =
      uonMetrics.genset_fuel_used * this.fuelCarbonFactorCo2eq;
    uonMetrics.genset_carbon_emission_co2 =
      uonMetrics.genset_fuel_used * this.fuelCarbonFactorCo2;
    uonMetrics.genset_carbon_emission_ch4 =
      uonMetrics.genset_fuel_used * this.fuelCarbonFactorCh4;
    uonMetrics.genset_carbon_emission_n2o =
      uonMetrics.genset_fuel_used * this.fuelCarbonFactorN2o;

    const thisGensetEnergyCumulated = this.getRegistryValueMax(
      data.registryData.filter((r) => r.value < 1000000000),
      Registries.Genset_kWHours,
      this.invalidGensetValues,
    );

    uonMetrics.genset_energy_generated =
      thisGensetEnergyCumulated > prevGensetEnergyCumulated
        ? thisGensetEnergyCumulated - prevGensetEnergyCumulated
        : 0;

    uonMetrics.genset_energy_cumulated =
      max([thisGensetEnergyCumulated, prevGensetEnergyCumulated]) || 0;

    const inverter1Power = this.getRegistryValueAverage(
      data.registryData,
      Registries.Inverter1_GridTotW,
    );
    uonMetrics.inverter1_energy_generated =
      (inverter1Power * meter.interval) / 3600 / 1000;

    const inverter2Power = this.getRegistryValueAverage(
      data.registryData,
      Registries.Inverter2_GridTotW,
    );

    uonMetrics.inverter2_energy_generated =
      (inverter2Power * meter.interval) / 3600 / 1000;

    uonMetrics.inverters_energy_generated =
      uonMetrics.inverter1_energy_generated +
      uonMetrics.inverter2_energy_generated;

    uonMetrics.inverters_carbon_abatement =
      uonMetrics.inverters_energy_generated * this.abatementCarbonFactor;

    const meterData = Object.entries(uonMetrics).map(([metric, value]) => {
      return {
        meterKey: meter.key,
        interval: meter.interval,
        metricName: metric,
        metricValue: round(value, 6),
        isoDateTime,
        isoDateTimeHour: getStartOfHour(isoDateTime),
        isoDateTimeDay: getStartOfDay(isoDateTime, timezoneOffset),
        isoDateTimeWeek: getStartOfWeek(isoDateTime, timezoneOffset),
        isoDateTimeMonth: getStartOfMonth(isoDateTime, timezoneOffset),
        sourceHash: crypto
          .createHash('md5')
          .update(JSON.stringify(data))
          .digest('hex'),
        tags: [],
      };
    });

    return meterData;
  }
}
