import { round, sum } from 'lodash';
import type {
  IMeterDataResult,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { mergeAndSortSeriesData } from './series';

export function lookupMetricValue(
  meterData: IMeterDataResult[],
  metricNames: string[],
): number {
  const values = meterData
    .filter((data) => metricNames.includes(data.metricName!))
    .map((data) => Number(data.value));

  return round(sum(values), 4);
}

export function lookupMetricSeries(
  meterData: IMeterDataResult[],
  metricNames: string[],
): ISeriesItem[] {
  const outputSerices = meterData
    .filter((data) => metricNames.includes(data.metricName!))
    .map((data) => ({
      isoDateTime: data.isoDateTime,
      value: data.value,
    }));

  return mergeAndSortSeriesData(outputSerices);
}

export function findMetricValue(
  meterData: IMeterDataResult[],
  metricName: string,
): number {
  const values = meterData
    .filter((data) => data.meterKey === metricName)
    .map((data) => Number(data.value));

  return round(sum(values), 4);
}

export function findMetricSeries(
  meterData: IMeterDataResult[],
  metricName: string,
): ISeriesItem[] {
  const outputSerices = meterData
    .filter((data) => data.meterKey === metricName)
    .map((data) => ({
      isoDateTime: data.isoDateTime,
      value: round(data.value, 4),
    }));
  return mergeAndSortSeriesData(outputSerices);
}

export function getMetricValue(meterData: IMeterDataResult[]): number {
  const values = meterData.map((data) => Number(data.value));
  return round(sum(values), 4);
}

export function getMetricSeries(meterData: IMeterDataResult[]): ISeriesItem[] {
  const outputSerices = meterData.map((data) => ({
    isoDateTime: data.isoDateTime,
    value: round(data.value, 4),
  }));
  return mergeAndSortSeriesData(outputSerices);
}
