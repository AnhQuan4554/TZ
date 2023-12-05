import { useState } from 'react';
import type {
  IIsoDate,
  IPanelGroupVerification,
  IVerification,
  IVpRecord,
} from '@tymlez/platform-api-interfaces';
import axios from 'axios';
import { useQuery } from 'react-query';

async function fetchVerification(
  from: IIsoDate,
  to: IIsoDate,
  page: number,
  pageSize: number,
): Promise<IVerification> {
  const params = { from, to, page, pageSize };
  const { data } = await axios.get<IVerification>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/verification`,
    { params },
  );

  return data;
}

export function useVerificationData(from: IIsoDate, to: IIsoDate) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading } = useQuery<IVerification>(
    ['verification', page, pageSize, from, to],
    () => fetchVerification(from, to, page, pageSize),
    {
      staleTime: Infinity,
    },
  );
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return {
    data,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

async function fetchVcRecords(hash: string): Promise<IVpRecord> {
  const { data } = await axios.get<IVpRecord>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/verification/${hash}`,
  );

  return data;
}

export function useVcRecords(hash: string) {
  const { data, isLoading } = useQuery<IVpRecord>(
    ['fetch-vcRecords', hash],
    () => fetchVcRecords(hash),
  );

  return { data, isLoading };
}

async function fetchPanelGroup(
  refreshToken = '',
): Promise<IPanelGroupVerification> {
  const params = { refreshToken };
  const { data } = await axios.get<IPanelGroupVerification>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/energy/groups`,
    { params },
  );
  return data;
}

export function usePanelGroup(refreshToken: string) {
  const { data, isLoading } = useQuery<IPanelGroupVerification>(
    ['panel-group', refreshToken],
    () => fetchPanelGroup(refreshToken),
    {
      staleTime: Infinity,
    },
  );

  return {
    data,
    isLoading,
  };
}
