import axios from 'axios';
import type { IFindResult, ITenancy } from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchTenancyDetail(tenancyId: string) {
  const { data } = await axios.get<ITenancy>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/tenancy/${tenancyId}`,
  );
  return data;
}

async function fetchTenancyData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<ITenancy>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<ITenancy>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/tenancy`,
    { params },
  );
  return data;
}

export function useFetchTenancyData() {
  const { data } = useQuery<IFindResult<ITenancy>>(
    ['tenancy'],
    () => fetchTenancyData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}

export function useTenancyData(addRefreshTime: Date, updateRefreshTime: Date) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<ITenancy>
  >(
    ['tenancy', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchTenancyData(page, pageSize),
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
