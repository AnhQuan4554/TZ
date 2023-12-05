import type { IFindResult, IUser } from '@tymlez/platform-api-interfaces';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

async function fetchUserData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IUser>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IUser>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/user`,
    { params },
  );
  return data;
}

export function useUserData(addRefreshTime: Date, updateRefreshTime: Date) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IUser>
  >(
    ['user', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchUserData(page, pageSize),
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
