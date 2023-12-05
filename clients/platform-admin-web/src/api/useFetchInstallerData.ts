import axios from 'axios';
import type { IFindResult, IInstaller } from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchInstallerDetail(installerId: string) {
  const { data } = await axios.get<IInstaller>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/installer/${installerId}`,
  );
  return data;
}

async function fetchInstallerData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IInstaller>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IInstaller>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/installer`,
    { params },
  );
  return data;
}

export function useInstallerData(
  addRefreshTime: Date,
  updateRefreshTime: Date,
) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IInstaller>
  >(
    ['installer', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchInstallerData(page, pageSize),
    {
      staleTime: 10000,
    },
  );

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };
  return {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export function useFetchInstallerData() {
  const { data } = useQuery<IFindResult<IInstaller>>(
    ['installer'],
    () => fetchInstallerData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}
