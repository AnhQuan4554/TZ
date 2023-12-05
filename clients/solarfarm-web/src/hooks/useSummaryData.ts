import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  ISeriesItem,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';

export function useSummaryData(
  from: IIsoDate,
  to: IIsoDate,
): UseQueryResult<ISummaryItem[]> {
  const params = { from, to };
  return useQuery(
    ['summary-data', params],
    async () => {
      const { data } = await axios.get<ISummaryItem[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/summary`,
        { params },
      );
      return data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}

export function useSummarySeries(
  from: IIsoDate,
  to: IIsoDate,
  name: string,
): UseQueryResult<ISeriesItem[]> {
  const params = { from, to, name };
  return useQuery(
    ['summary-series', params],
    async () => {
      const { data } = await axios.get<ISeriesItem[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/summary/series`,
        {
          params,
        },
      );
      return data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}

export function useSummaryPreValue(from: IIsoDate, to: IIsoDate, name: string) {
  const params = { from, to, name };
  const { data, isLoading } = useQuery(
    ['summary-preValue', params],
    async () => {
      const { data: preValue } = await axios.get<number>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/summary/preValue`,
        {
          params,
        },
      );
      return preValue;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
  return {
    data,
    isLoading,
  };
}
