export interface ISolarFarmData {
  timestamp_auto: number;
  timestamp: number;
  SolarFarm: SolarFarm;
}

export interface IProcessOutput {
  output: IMetricValue;
}
export interface SolarFarm {
  solar_array_1: IProcessOutput;
  solar_array_2: IProcessOutput;
  solar_array_3: IProcessOutput;
  solar_array_4: IProcessOutput;
}

export interface IMetricValue {
  uom: string;
  panels: number;
  performance_percentage: number;
  forecast_value: number;
  duration: number;
  value: number;
}

export interface ISolarFarmJobSettings {
  solcastUrl: string;
  timeFactors: number;
  duration: number;
}
