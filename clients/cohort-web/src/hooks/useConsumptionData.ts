/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  kWh,
  IMetricGranularity,
  ISeriesItem,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';

export function useConsumptionTotal(
  from: IIsoDate,
  to: IIsoDate,
): UseQueryResult<kWh> {
  const params = { from, to };
  return useQuery(
    ['consumption-total', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/consumption/total`,
        { params },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useConsumptionSeries(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity,
): UseQueryResult<ISeriesItem[]> {
  const params = { from, to, granularity };
  return useQuery(
    ['consumption-series', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/consumption/series`,
        { params },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useConsumptionKeyMetrics(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity = 'hour',
): UseQueryResult<ISummaryItem> {
  const params = { granularity, from, to };
  return useQuery(
    ['consumption-metrics', params],
    async () => {
      const { data } = await axios.get<ISummaryItem>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/consumption/metrics`,
        { params },
      );

      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}
