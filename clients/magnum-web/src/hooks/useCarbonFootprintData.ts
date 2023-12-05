import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  ISingleValueHttpResponse,
} from '@tymlez/platform-api-interfaces';
import type { ISummaryItem } from './useSummaryData';

export function useCarbonFootprintData(
  from: IIsoDate,
  to: IIsoDate,
): UseQueryResult<ISummaryItem[]> {
  const params = { from, to };
  return useQuery(
    ['average-netCO2', params],
    async () => {
      const { data } = await axios.get<
        ISingleValueHttpResponse<ISummaryItem[]>
      >(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/hismelt/carbon-footprint`, {
        params,
      });

      return data.data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
