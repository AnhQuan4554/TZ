import axios from 'axios';
import type { IDovu, IFindResult } from '@tymlez/platform-api-interfaces';
import { useQuery, UseQueryResult } from 'react-query';

export function useDovuLink(): UseQueryResult<string> {
  return useQuery(['dovu-path'], async () => {
    const { data } = await axios.get<string>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/dovu/path`,
    );
    return data;
  });
}

export function useCarbonPurchased(): UseQueryResult<number> {
  return useQuery(['carbon-purchased'], async () => {
    const { data } = await axios.get<number>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/dovu/purchased`,
    );
    return data;
  });
}

async function fetchPurchaseHistory(): Promise<IFindResult<IDovu>> {
  const { data } = await axios.get<IFindResult<IDovu>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/dovu`,
  );

  return data;
}

export function useViewPurchaseHistory() {
  const { data } = useQuery<IFindResult<IDovu>>(
    ['fetch-purchaseHistory'],
    () => fetchPurchaseHistory(),
    { refetchInterval: 5000 }, //refresh every 5 seconds
  );

  return data;
}
