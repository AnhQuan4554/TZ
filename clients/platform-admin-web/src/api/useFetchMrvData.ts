import type {
  IFindResult,
  IMrv,
  IMrvSummary,
  IMrvQuery,
} from '@tymlez/platform-api-interfaces';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

export async function fetchMrvDetail(id: string) {
  const { data } = await axios.get<IMrv>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/mrv/${id}`,
  );
  return data;
}

async function fetchMrvData(
  mrvQuery: IMrvQuery,
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IMrv>> {
  const params = { page, pageSize, ...mrvQuery };
  const { data } = await axios.get<IFindResult<IMrv>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/mrv`,
    { params },
  );
  return data;
}

export function useFetchMrvData(mrvQuery: IMrvQuery, addRefreshTime: Date) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  useEffect(() => {
    setPage(0);
  }, [mrvQuery]);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IMrv>
  >(
    ['mrv', page, pageSize, mrvQuery, addRefreshTime],
    () => fetchMrvData(mrvQuery, page, pageSize),
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

export function useMrvSummary(startDateTime = '', endDateTime = '') {
  const params = { startDateTime, endDateTime };

  return useQuery(
    ['fetch-mrv-summary', startDateTime, endDateTime],
    async () => {
      const { data } = await axios.get<IMrvSummary[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/mrv/summary`,
        { params },
      );

      return data;
    },
  );
}
