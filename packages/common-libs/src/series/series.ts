import type { ISeriesItem } from '@tymlez/platform-api-interfaces';
import { groupBy, round, sortBy, sum } from 'lodash';

export function mergeAndSortSeriesData(data: ISeriesItem[]) {
  const groups = groupBy(data, (item) => item.isoDateTime);

  const merged = Object.entries(groups).map(([dt, groupItems]) => {
    const values = groupItems.map(
      (item: ISeriesItem) => Number(item.value) || 0,
    );
    return {
      isoDateTime: dt,
      value: round(sum(values), 4),
    };
  });

  return sortBy(merged, ['isoDatetime']);
}

export function diffSeriesData(
  series1: ISeriesItem[],
  series2: ISeriesItem[],
): ISeriesItem[] {
  return series1.map(({ isoDateTime, value }) => {
    const series2Item = series2.find(
      (data) => data.isoDateTime === isoDateTime,
    );
    const diff = value - (series2Item?.value || 0);
    return { isoDateTime, value: diff };
  });
}
