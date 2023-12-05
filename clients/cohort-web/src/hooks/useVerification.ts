import { useState } from 'react';
import type { IIsoDate, IVerification } from '@tymlez/platform-api-interfaces';
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
