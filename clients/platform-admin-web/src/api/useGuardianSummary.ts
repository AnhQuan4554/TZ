import axios from 'axios';
import type { IGuardianSummary } from '@tymlez/platform-api-interfaces';
import { useQuery } from 'react-query';

export function useGuardianSummary() {
  return useQuery(['fetch-guardian-summary'], async () => {
    const { data } = await axios.get<IGuardianSummary>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/guardian-proxy/bootstrap/CLIENT_NAME/summary`,
    );
    return data;
  });
}
