import axios from 'axios';
import type {
  IFindResult,
  IGuardianSite,
} from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchGuardianSiteDetail(id: string) {
  const { data } = await axios.get<IGuardianSite>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/guardian-sites/details/${id}`,
  );
  return data;
}

async function fetchGuardianSiteData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IGuardianSite>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IGuardianSite>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/guardian-sites`,
    { params },
  );
  return data;
}

export function useFetchGuardianSiteData() {
  const { data } = useQuery<IFindResult<IGuardianSite>>(
    ['guardian-sites'],
    () => fetchGuardianSiteData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}

export function useGuardianSiteData(
  addRefreshTime: Date,
  updateRefreshTime: Date,
) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IGuardianSite>
  >(
    ['guardian-sites', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchGuardianSiteData(page, pageSize),
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
