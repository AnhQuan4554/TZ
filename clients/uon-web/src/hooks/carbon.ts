import axios from 'axios';
import { useQuery } from 'react-query';
import type {
  ICarbonSeries,
  IIsoDate,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import type { ISiteCarbonData } from '@tymlez/frontend-libs/src/utils/TEMPORARY';
import {
  getStartOfDay,
  getStartOfHour,
  getTimezoneOffset,
} from '@tymlez/common-libs';

export const useEnergyData = (
  startTime: IIsoDate,
  endTime: IIsoDate,
  timezone = 'UTC',
) => {
  const { data } = useQuery<Record<string, ISeriesItem[]>>(
    ['energy', startTime, endTime, 'timezone'],
    () => fetchMetricData(startTime, endTime, 'energy', timezone),
    {
      staleTime: Infinity,
    },
  );

  return {
    title: 'Generation',
    data,
  };
};

async function fetchMetricData(
  from: IIsoDate,
  to: IIsoDate,
  metricName: string,
  timezone = 'UTC',
): Promise<Record<string, ISeriesItem[]>> {
  //auto-time scaling - hourly data when less than 7 days range is selected
  const startDate = new Date(from).getTime();
  const endDate = new Date(to).getTime() + 86400000;

  const granularity =
    endDate - startDate >= 10 * 24 * 60 * 60 * 1000 ? 'day' : 'hour';

  const params = { from, to, granularity };

  const { data } = await axios.get<Record<string, ISeriesItem[]>>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/dashboard/series/${metricName}`,
    { params },
  );

  const now = new Date().toISOString();
  const currentHour = getStartOfHour(now);
  const currentDay = getStartOfDay(
    now,
    getTimezoneOffset(new Date(), timezone),
  );
  const endBoundary = granularity === 'hour' ? currentHour : currentDay;
  const removedLast = Object.entries(data).map(([k, v]) => [
    k,
    v.filter((x) => x.isoDateTime < endBoundary),
  ]);
  return Object.fromEntries(removedLast);
}

export const useCarbonEmission = (
  startTime: IIsoDate,
  endTime: IIsoDate,
  timezone = 'UTC',
): ISiteCarbonData => {
  const { data } = useQuery<Record<string, ISeriesItem[]>>(
    ['carbon emission', startTime, endTime, timezone],
    () => fetchMetricData(startTime, endTime, 'carbon', timezone),

    {
      staleTime: Infinity,
    },
  );

  return {
    title: 'Carbon Emissions',
    data: data as ICarbonSeries,
  };
};
