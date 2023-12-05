import axios from 'axios';
import type { IFindResult, IPolicy } from '@tymlez/platform-api-interfaces';
import { useQuery } from 'react-query';

export async function fetchPolicyDetail(policyId: string) {
  const { data } = await axios.get<IPolicy>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/policy/${policyId}`,
  );
  return data;
}

async function fetchPolicyData(): Promise<IFindResult<IPolicy>> {
  const { data } = await axios.get<IFindResult<IPolicy>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/policy`,
  );
  data.data.forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el.tokenId = el.config?.children
      .find((x: any) => x.tag === 'mint_events')
      ?.children?.find((r: any) => r.tag === 'mint_token').tokenId;
  });
  return data;
}

export function usePolicyData(addRefreshTime: Date, updateRefreshTime: Date) {
  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IPolicy>
  >(['policy', addRefreshTime, updateRefreshTime], () => fetchPolicyData(), {
    staleTime: 10000,
  });

  return {
    queryResult,
    isLoading,
  };
}
