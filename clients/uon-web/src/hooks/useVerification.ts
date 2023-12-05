import { useState } from 'react';
import { useQuery } from 'react-query';
import type { IVerification, IVpRecord } from '@tymlez/platform-api-interfaces';
import axios from 'axios';

async function fetchSiteVerification(
  page: number,
  pageSize: number,
  refreshToken = '',
): Promise<IVerification> {
  const params = { page, pageSize, refreshToken };
  const { data } = await axios.get<IVerification>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/verification`,
    { params },
  );
  return data;
}

export function useVerificationData(refreshToken = '') {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading } = useQuery<IVerification>(
    ['verification', page, pageSize, refreshToken],
    () => fetchSiteVerification(page, pageSize, refreshToken),
    {
      staleTime: 10000,
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

async function fetchVcRecords(
  hash: string,
  mocked: boolean,
): Promise<IVpRecord> {
  const params = { mocked };
  const { data } = await axios.get<IVpRecord>(
    `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/verification/${hash}`,
    { params },
  );

  return data;
}

export function useVcRecords(hash: string, mocked = false) {
  const { data, isLoading } = useQuery<IVpRecord>(
    ['fetch-vcRecords', hash, mocked],
    () => fetchVcRecords(hash, mocked),
  );

  return { data, isLoading };
}
