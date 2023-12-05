import type { ICarbonSeries, IIsoDate } from '@tymlez/platform-api-interfaces';

export interface IDashboadBlockSummary {
  value: number;
  percentageChange: number;
  data?: IPoint[];
}

export interface IPoint {
  x: number | Date;
  y: number;
}

export interface ICarbonReport {
  abated: ICarbonField;
  produced: ICarbonField;
  penetration: ICarbonField;
  data: ICarbonSeries; // ICarbonData[];
}

export interface ICarbonData {
  timestamp: IIsoDate;
  abated: number;
  produced: number;
}

export interface ICarbonField {
  title: string;
  description: string;
  subTitle: string;
  data: number;
}

export interface ICarbonAudit {
  source: string;
  measurement: number;
  units: string;
  carbon: number;
  auditLink: string;
}
