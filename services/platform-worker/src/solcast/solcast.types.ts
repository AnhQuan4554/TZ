import type { IIsoDate } from '@tymlez/platform-api-interfaces';

export interface ISolcastData {
  dataSource: string;
  pv_estimate: number;
  period_end: IIsoDate;
  period: string;
}
