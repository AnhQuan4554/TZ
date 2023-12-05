import axios from 'axios';
import type { IFindResult, ISite } from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchSiteDetail(id: string) {
  const { data } = await axios.get<ISite>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/sites/details/${id}`,
  );
  return data;
}

async function fetchSiteData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<ISite>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<ISite>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/sites`,
    { params },
  );
  return data;
}

export function useFetchSiteData() {
  const { data } = useQuery<IFindResult<ISite>>(
    ['sites'],
    () => fetchSiteData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}

export function useSiteData(addRefreshTime: Date, updateRefreshTime: Date) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<ISite>
  >(
    ['sites', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchSiteData(page, pageSize),
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
