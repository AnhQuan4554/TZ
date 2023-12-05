/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type {
  ICarbonSeries,
  ICarbonTotal,
  IIsoDate,
  IMetricGranularity,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';
import { useQuery, UseQueryResult } from 'react-query';

export function useCarbonTotalData(
  from: IIsoDate,
  to: IIsoDate,
): UseQueryResult<ICarbonTotal> {
  const params = { from, to };
  return useQuery(
    ['carbon-total-data', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/carbon/total`,
        { params },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useCarbonSeriesData(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity,
): UseQueryResult<ICarbonSeries> {
  const params = { granularity, from, to };
  return useQuery(
    ['carbon-emission-data', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/carbon/series`,
        { params },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useCarbonKeyMetrics(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity = 'hour',
): UseQueryResult<ISummaryItem[]> {
  const params = { granularity, from, to };
  return useQuery(
    ['carbon-metrics', params],
    async () => {
      const { data } = await axios.get<ISummaryItem[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/carbon/metrics`,
        { params },
      );
      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}
