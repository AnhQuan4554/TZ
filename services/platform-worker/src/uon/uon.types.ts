import type { IIsoDate, ITimestampSec } from '@tymlez/platform-api-interfaces';

export enum Registries {
  VSD_Pump_Flowrate = 'VSD_Pump_Flowrate',
  Genset_TotalFuelUsed = 'ComAp TotalFuelUsed',
  Genset_kWHours = 'ComAp kWHours',
  Inverter1_GridTotW = 'SMA1_30776_GridTotW',
  Inverter2_GridTotW = 'SMA2_30776_GridTotW',
}

export enum UonMetrics {
  WaterPumped = 'water_pumped',
  GensetEnergyGenerated = 'genset_energy_generated',
  GensetEnergyCommulated = 'genset_energy_cumulated',
  GensetFuelUsed = 'genset_fuel_used',
  GensetFuelCumulated = 'genset_fuel_cumulated',
  GensetCarbonEmission = 'genset_carbon_emission',
  Inverter1EnergyGenerated = 'inverter1_energy_generated',
  Inverter2EnergyGenerated = 'inverter2_energy_generated',
  InvertersEnergyGenerated = 'inverters_energy_generated',
  InvertersCarbonAbatement = 'inverters_carbon_abatement',
  GensetCarbonEmissionCo2 = 'genset_carbon_emission_co2',
  GensetCarbonEmissionCh4 = 'genset_carbon_emission_ch4',
  GensetCarbonEmissionN2o = 'genset_carbon_emission_n2o',
}

export interface IUonRegistryData {
  timestamp: ITimestampSec;
  value: number;
  registry: Registries;
}

export interface IUonData {
  timestamp: IIsoDate;
  registryData: IUonRegistryData[];
}
