import axios from 'axios';
import { useQuery } from 'react-query';

export function useQueryData() {
  return useQuery(
    ['meta-info'],
    async () => {
      const { data } = await axios.get<string>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/meta-info`,
      );

      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useMicroserviceQueryData() {
  return useQuery<string[]>(
    ['microservice-setting'],
    async () => {
      const { data } = await axios.get<string[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/microservice-setting`,
      );

      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}
