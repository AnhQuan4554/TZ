import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useState } from 'react';
import { useQuery } from 'react-query';
import type { HistoryQuery } from '@tymlez/frontend-libs';
import axios from 'axios';
import type {
  ICarbonReport,
  ICarbonAudit,
} from '@tymlez/frontend-libs/src/utils/TEMPORARY';
import type { IHookReturnWithPeriod } from '../api/QueryPeriod';

async function fetchCarbonReport(
  from: IIsoDate,
  to: IIsoDate,
): Promise<ICarbonReport> {
  const params = { from, to };
  const { data } = await axios.get<ICarbonReport>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/dashboard/report/carbon-report`,
    { params },
  );
  return data;
}

export const useCarbonReport = (
  startTime: IIsoDate,
  endTime: IIsoDate,
): IHookReturnWithPeriod<ICarbonReport> => {
  const [query, setQuery] = useState<HistoryQuery>({
    dateRange: [startTime, endTime],
  });

  const useQueryResult = useQuery<ICarbonReport | undefined>(
    ['carbon-report', query],
    () => fetchCarbonReport(query.dateRange[0] || '', query.dateRange[1] || ''),
    {
      staleTime: Infinity,
    },
  );

  return {
    query,
    setQuery,
    ...useQueryResult,
  } as IHookReturnWithPeriod<ICarbonReport>;
};

async function fetchCarbonAudit(): Promise<ICarbonAudit[]> {
  const { data } = await axios.get<ICarbonAudit[]>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/dashboard/report/carbon-audit`,
  );
  return data;
}

export const useCarbonAudit = () => {
  return useQuery<ICarbonAudit[] | undefined>(
    ['carbon-audit'],
    () => fetchCarbonAudit(),
    {
      staleTime: Infinity,
    },
  );
};
