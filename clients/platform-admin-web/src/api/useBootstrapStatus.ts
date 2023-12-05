import axios from 'axios';
import type { IGuardianBootstrapStatus } from '@tymlez/platform-api-interfaces';
import { useQuery } from 'react-query';

export function useBootstrapStatus(polling = false) {
  return useQuery(
    ['fetch-guardian-bootstrap-status'],
    async () => {
      const { data } = await axios.get<IGuardianBootstrapStatus>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/guardian-proxy/bootstrap/CLIENT_NAME`,
      );
      return data;
    },
    {
      staleTime: 1000,
      refetchInterval: polling ? 2000 : false,
      initialData: {
        status: [],
        totalTimes: 0,
        startedAt: '',
        inProgress: true,
      },
    },
  );
}
