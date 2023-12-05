/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  kWh,
  IMetricGranularity,
  ISeriesItem,
  ISingleValueHttpResponse,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';

export function useGenerationHistoryTotal(
  from: IIsoDate,
  to: IIsoDate,
): UseQueryResult<kWh> {
  const params = { from, to };
  return useQuery(
    ['generation-total', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/generation/history-total`,
        {
          params,
        },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useGenerationHistorySeries(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity,
): UseQueryResult<ISeriesItem[]> {
  const params = { from, to, granularity };
  return useQuery(
    ['generation-total', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/generation/history-series`,
        {
          params,
        },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useGenerationHistoryKeyMetrics(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity = 'hour',
): UseQueryResult<ISummaryItem> {
  const params = { granularity, from, to };
  return useQuery(
    ['generation-history-metrics', params],
    async () => {
      const { data } = await axios.get<ISummaryItem>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/generation/history-metrics`,
        { params },
      );

      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export const useGenerationForecastTotal = (
  hours = 24,
): UseQueryResult<number> => {
  const params = { hours };
  return useQuery(
    ['generation-forecast-total', params],
    async () => {
      const { data } = await axios.get<ISingleValueHttpResponse<number>>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/generation/forecast-total`,
        { params },
      );
      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
};
