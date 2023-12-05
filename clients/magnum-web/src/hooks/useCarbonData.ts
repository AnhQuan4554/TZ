import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  IMetricGranularity,
} from '@tymlez/platform-api-interfaces';

export function useCarbonData(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity,
  processName?: string,
): UseQueryResult<any> {
  const params = { from, to, granularity };
  return useQuery(
    ['daily-carbon', params, processName],
    async () => {
      if (!processName) {
        const { data } = await axios.get<any>(
          `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/carbon/series`,
          { params },
        );

        return data.data;
      }

      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/${processName}/carbon-series`,
        { params },
      );

      return data.data;
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
