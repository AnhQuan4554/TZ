import type {
  ITimeSpanSec,
  ITimestampSec,
} from '@tymlez/platform-api-interfaces';

export interface IWattwatchersData {
  dataSource: string;
  timestamp: ITimestampSec;
  duration: ITimeSpanSec;

  eRealKwh: number[];
  eRealNegativeKwh: number[];
  eRealPositiveKwh: number[];

  eReactiveKwh: number[];
  eReactiveNegativeKwh: number[];
  eReactivePositiveKwh: number[];

  iRMSMin: number[];
  iRMSMax: number[];

  vRMSMin: number[];
  vRMSMax: number[];
}
