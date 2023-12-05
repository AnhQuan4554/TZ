import type { IIsoDate, SafeNumber } from '../data-type';

export interface IMeterDataResult {
  isoDateTime: IIsoDate;
  isoDateTimeHour: IIsoDate;
  isoDateTimeDay: IIsoDate;
  value: SafeNumber;
  tag?: string;
  metricName?: string;
  meterKey?: string;
}
