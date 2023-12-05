import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  IMetricGranularity,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';

export function useEnergyGenerationData(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity,
): UseQueryResult<Record<string, ISeriesItem[]>> {
  const params = { from, to, granularity };

  return useQuery(
    ['energy-generation', params],
    async () => {
      const { data } = await axios.get<Record<string, ISeriesItem[]>>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/energy/series`,
        { params },
      );

      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}
