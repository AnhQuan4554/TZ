import axios from 'axios';
import type {
  ISeriesItem,
  ISingleValueHttpResponse,
} from '@tymlez/platform-api-interfaces';
import { useQuery, UseQueryResult } from 'react-query';

export interface ISummaryItem {
  name: string;
  type: 'input' | 'output';
  value: number;
  uom: string;
  label: string;
}

export function useBiocharSummary(
  from: string,
  to: string,
): UseQueryResult<
  ISingleValueHttpResponse<{
    summary: ISummaryItem[];
    outputSeries: ISeriesItem[];
  }>
> {
  const params = { from, to };
  return useQuery(
    ['biochar', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/biochar/summary`,
        { params },
      );
      return data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}

export function useFineIronOreSummary(
  from: string,
  to: string,
): UseQueryResult<
  ISingleValueHttpResponse<{
    summary: ISummaryItem[];
    outputSeries: ISeriesItem[];
  }>
> {
  const params = { from, to };
  return useQuery(
    ['ironore', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/ironore/summary`,
        { params },
      );

      return data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}

export function usePigIronSummary(
  from: string,
  to: string,
): UseQueryResult<
  ISingleValueHttpResponse<{
    summary: ISummaryItem[];
    outputSeries: ISeriesItem[];
  }>
> {
  const params = { from, to };
  return useQuery(
    ['hismelt', params],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/hismelt/summary`,
        { params },
      );

      return data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
