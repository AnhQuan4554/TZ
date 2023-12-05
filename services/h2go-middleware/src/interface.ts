export interface IHydrogenDashboard {
  sites: any[];
}

export interface IDailyCarbonEmission {
  data: ICarbonData;
}

export interface ICarbonData {
  [key: string]: any;
}

export interface ISummaryItem {
  name: string;
  type: 'input' | 'output';
  value: number;
  preValue: number;
  uom: string;
  label: string;
}

export interface IProcess {
  name: string;
  group: string;
  step: number;
  metrics: IProcessMetric[];
}

export interface IProcessMetric {
  label: string;
  keys: string[];
  uom: string;
  value: number;
}
