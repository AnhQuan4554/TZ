import type { ITimestampMsec, kWh } from '@tymlez/platform-api-interfaces';

export interface IMeterTimeSeriesPoint {
  timestamp: ITimestampMsec;
  values: kWh[];
}

export interface IMeterTimeSeries {
  meterId: string;
  data: Array<IMeterTimeSeriesPoint>;
}

export interface IMeterData {
  meters: IMeterTimeSeries[];
}

export interface IMeterService {
  getHistory(meterIds: string[], from: Date, to: Date): Promise<IMeterData>;

  getRealtime(
    meterIds: string[],
    limit: number,
    since?: ITimestampMsec,
  ): Promise<IMeterData>;
}
