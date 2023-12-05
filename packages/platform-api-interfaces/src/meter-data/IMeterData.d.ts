import type { IIsoDate, SafeNumber } from '../data-type';

export interface IMeterData {
  id?: number;
  meterKey: string;
  metricName: string;
  interval: SafeNumber;
  metricValue: SafeNumber;
  isoDateTime: IIsoDate;
  isoDateTimeHour: IIsoDate;
  isoDateTimeDay: IIsoDate;
  isoDateTimeWeek: IIsoDate;
  isoDateTimeMonth: IIsoDate;
  tags?: string[];
  sourceHash?: string;
}
