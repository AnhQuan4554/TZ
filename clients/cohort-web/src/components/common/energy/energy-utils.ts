import type {
  IEnergyTimeSeries,
  IEnergyTimeSeriesPoint,
  IMeterDataResult,
  ITenancyDataResult,
} from '@tymlez/platform-api-interfaces';
import { convertTimezone } from '@tymlez/common-libs';
import { useMemo } from 'react';
import _ from 'lodash';
import { stringToColor } from '@tymlez/frontend-libs';

export type ColorMap = Record<string, string>;

export function energySeriesToChart(
  energySeries?: IEnergyTimeSeries[],
  colorMap?: ColorMap,
) {
  if (!energySeries) {
    return [];
  }
  return energySeries.map((series) => ({
    ...series,
    color: colorMap
      ? colorMap[series.name] ?? stringToColor(series.name)
      : stringToColor(series.name),
    data: series.data.map((item: IEnergyTimeSeriesPoint) => ({
      x: convertTimezone(item.timestamp),
      y: _.round(item.value, 3),
    })),
  }));
}

export function tenancySeriesToChart(
  energySeries?: ITenancyDataResult[],
  colorMap?: ColorMap,
) {
  if (!energySeries) {
    return [];
  }

  return energySeries.map((series) => {
    return {
      ...series,
      color: colorMap
        ? colorMap[series.name] ?? stringToColor(series.name)
        : stringToColor(series.name),
      data: series.data.map((item: IMeterDataResult) => {
        return {
          x: new Date(new Date(item.isoDateTime).toUTCString()),
          y: _.round(item.value, 3),
        };
      }),
    };
  });
}

// todo: move this file to a better location. This is not a component
export function useChartSeries(energySeries?: IEnergyTimeSeries[]) {
  return useMemo(() => energySeriesToChart(energySeries), [energySeries]);
}
