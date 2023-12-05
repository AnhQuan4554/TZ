import axios from 'axios';
import type { IFindResult, ISetting } from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchSettingDetail(id: string) {
  const { data } = await axios.get<ISetting>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/settings/${id}`,
  );
  return data;
}

export async function fetchSettingData(
  page = 0,
  pageSize = 25,
  filter = '',
): Promise<IFindResult<ISetting>> {
  const params = { page, pageSize, filter };
  const { data } = await axios.get<IFindResult<ISetting>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/settings`,
    { params },
  );
  return data;
}

export function useSettingData(
  addRefreshTime: Date,
  updateRefreshTime: Date,
  filter: string,
) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<ISetting>
  >(
    ['settings', page, pageSize, addRefreshTime, updateRefreshTime, filter],
    () => fetchSettingData(page, pageSize, filter),
    {
      staleTime: 10000,
    },
  );

  const handleChangePage = (newPage: number) => {
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
