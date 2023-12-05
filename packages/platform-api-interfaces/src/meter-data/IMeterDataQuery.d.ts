import type { IIsoDate } from '../data-type';

export type IMetricName =
  | 'customCarbon'
  | 'officialCarbon'
  | 'generation'
  | 'eRealPositiveKwh';
export type IMetricGranularity =
  | 'total'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'auto';

export interface IMeterDataQuery {
  meterKeys?: string[];
  tags?: string[];
  metricNames: string[];
  fromIsoDateTime: IIsoDate;
  toIsoDateTime: IIsoDate;
  granularity: IMetricGranularity;
  groupByTags?: boolean;
  groupByMeters?: boolean;
  groupByMetrics?: boolean;
}

export interface IMeterDataAdminQuery {
  metricName: string;
  startDateTime: string;
  endDateTime: string;
  exactDateTime: string;
}
