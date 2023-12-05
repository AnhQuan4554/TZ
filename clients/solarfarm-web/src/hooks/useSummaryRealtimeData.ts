import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  ISeriesItem,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';

export function useSummaryData(): UseQueryResult<ISummaryItem[]> {
  return useQuery(
    ['summary-realtime-data'],
    async () => {
      const { data } = await axios.get<ISummaryItem[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/realtime`,
      );
      return data;
    },
    { refetchInterval: 300000 },
  );
}

export function useSummarySeries(name: string): UseQueryResult<ISeriesItem[]> {
  const params = { name };
  return useQuery(
    ['summary-series', params],
    async () => {
      const { data } = await axios.get<ISeriesItem[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/realtime/series`,
        {
          params,
        },
      );
      return data;
    },
    { refetchInterval: 30000 },
  );
}

export function useSummaryPreValue(name: string): UseQueryResult<number> {
  const params = { name };
  return useQuery(
    ['summary-preValue', params],
    async () => {
      const { data } = await axios.get<number>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/realtime/preValue`,
        {
          params,
        },
      );
      return data;
    },
    { refetchInterval: 30000 },
  );
}

export function useRECData() {
  const { data, isLoading } = useQuery(
    ['REC'],
    async () => {
      const { data: rec } = await axios.get<number>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/realtime/rec`,
      );
      return rec;
    },
    { refetchInterval: 30000 },
  );
  return {
    data,
    isLoading,
  };
}

export function useRECPreValue() {
  const { data, isLoading } = useQuery(
    ['REC-preValue'],
    async () => {
      const { data: rec } = await axios.get<number>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/realtime/rec/preValue`,
      );

      return rec;
    },
    { refetchInterval: 30000 },
  );
  return {
    data,
    isLoading,
  };
}

export function usePerformanceRatio() {
  const { data, isLoading } = useQuery(
    ['performance-ratio'],
    async () => {
      const { data: performance } = await axios.get<number>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/performance`,
      );

      return performance;
    },
    { refetchInterval: 30000 },
  );
  return {
    data,
    isLoading,
  };
}
