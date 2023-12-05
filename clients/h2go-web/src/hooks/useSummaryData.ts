import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type { IIsoDate, ISeriesItem } from '@tymlez/platform-api-interfaces';

export interface ISummaryItem {
  name: string;
  type: 'input' | 'output';
  value: number;
  preValue: number;
  uom: string;
  label: string;
}

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

export function useSummaryPreValue(
  from: IIsoDate,
  to: IIsoDate,
  name: string,
): UseQueryResult<number> {
  const params = { from, to, name };
  return useQuery(
    ['summary-preValue', params],
    async () => {
      const { data } = await axios.get<number>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/summary/preValue`,
        {
          params,
        },
      );
      return data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
