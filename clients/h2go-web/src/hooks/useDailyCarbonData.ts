import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IIsoDate,
  IMetricGranularity,
} from '@tymlez/platform-api-interfaces';

export function useDailyCarbonData(
  from: IIsoDate,
  to: IIsoDate,
  granularity: IMetricGranularity,
): UseQueryResult<any> {
  const params = { from, to, granularity };
  //IDailyCarbonEmission
  return useQuery(
    ['daily-carbon', params],
    async () => {
      const { data } = await axios.get<any>( //IDailyCarbonEmission
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/carbon/series`,
        { params },
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}
