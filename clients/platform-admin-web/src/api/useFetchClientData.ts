import axios from 'axios';
import type { IClient } from '@tymlez/platform-api-interfaces';
import { useQuery } from 'react-query';

export async function fetchClientData(): Promise<IClient> {
  const { data } = await axios.get<IClient>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/clients`,
  );
  return data;
}

export function useClientData() {
  const { data } = useQuery<IClient>(
    ['auth/clients'],
    () => fetchClientData(),
    {
      staleTime: 10000,
    },
  );
  return data as IClient;
}
