/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  ITenancyDataResult,
} from '@tymlez/platform-api-interfaces';

export function useTenancyData(
  from: IIsoDate,
  to: IIsoDate,
  granularity: string,
): UseQueryResult<ITenancyDataResult[]> {
  const params = { granularity, from, to };
  return useQuery(
    ['tenancy-data', params],
    async () => {
      const { data } = await axios.get<ITenancyDataResult[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/tenancy/main`,
        { params },
      );

      return data;
    },
    { staleTime: Infinity, refetchInterval: 5 * 60 * 1000 },
  );
}
