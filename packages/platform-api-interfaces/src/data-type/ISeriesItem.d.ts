import type { IIsoDate } from './IIsoDate';
import type { SafeNumber } from './SafeNumber';

export interface ISeriesItem {
  isoDateTime: IIsoDate;
  value: SafeNumber;
}
