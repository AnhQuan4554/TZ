export interface IH2GOData {
  timestamp_auto: number;
  timestamp: number;
  H2GoO: H2GoO;
}

export interface IProcessInputOutput {
  output: Output;
  input: Input;
}
export interface H2GoO {
  electrolyser: IProcessInputOutput;
  water_treatment: IProcessInputOutput;
  gas_purification: IProcessInputOutput;
  compression: IProcessInputOutput;
  solar: Solar;
}

export interface Input {
  water: IMetricValue;
  electricity: IMetricValue;
  solar: IMetricValue;
  hydrogen: IMetricValue;
}

export interface IMetricValue {
  meter_type: string;
  uom: string;
  duration: number;
  meta: string;
  value: number;
}

export interface Output {
  hydrogen: IMetricValue;
  oxygen: IMetricValue;
  water: IMetricValue;
}

export interface Solar {
  pv_estimate: string;
}

export interface IH2GoJobSettings {
  solcastUrl: string;
  timeFactors: number;
  duration: number;
}
