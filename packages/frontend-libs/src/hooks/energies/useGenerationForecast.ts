import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type {
  IMeterDataResult,
  IMultiValueHttpResponse,
  ISingleValueHttpResponse,
} from '@tymlez/platform-api-interfaces';

export const useGenerationForecastTotal = (hours = 24): UseQueryResult<number> => {
  const params = { hours };
  return useQuery(
    ['generation-forecast-total', params],
    async () => {
      const { data } = await axios.get<ISingleValueHttpResponse<number>>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/generation/forecast-total`,
        { params }
      );
      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false }
  );
};

export const useGenerationForecastSeries = (hours = 24): UseQueryResult<IMeterDataResult[]> => {
  const params = { hours };
  return useQuery(
    ['generation-forecast-series', params],
    async () => {
      const { data } = await axios.get<IMultiValueHttpResponse<IMeterDataResult>>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/generation/forecast-series`,
        { params }
      );

      return data.data;
    },
    { refetchOnWindowFocus: false, retry: false }
  );
};
