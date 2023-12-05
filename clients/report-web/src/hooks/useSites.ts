import axios from 'axios';
import { useQuery } from 'react-query';
import type { ISite, IFindResult } from '@tymlez/platform-api-interfaces';

async function fetchSites(): Promise<IFindResult<ISite> | []> {
  try {
    const { data } = await axios.get<IFindResult<ISite> | []>(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/sites`,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export function useSites() {
  const useSitesResult: any = useQuery<IFindResult<ISite> | []>(
    ['getSites'],
    () => fetchSites(),
  );

  const currentSite = useSitesResult.data?.data[0];

  return {
    currentSite,
    // setCurrentSite,
    ...useSitesResult,
  };
}
