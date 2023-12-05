import axios from 'axios';
import { useQuery } from 'react-query';
import type { ITrustChainSite } from '@tymlez/platform-api-interfaces';

async function fetchTrustChainSiteInfo(): Promise<ITrustChainSite> {
  try {
    const { data } = await axios.get<ITrustChainSite>(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/sites/trust-chain`,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export function useTrustChainSiteInfo() {
  return useQuery<ITrustChainSite>(
    ['getTrustChainSite'],
    async () => await fetchTrustChainSiteInfo(),
  );
}
