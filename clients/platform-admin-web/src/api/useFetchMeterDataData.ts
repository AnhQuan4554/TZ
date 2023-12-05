import type {
  IFindResult,
  IMeterData,
  IMeterDataAdminQuery,
} from '@tymlez/platform-api-interfaces';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

async function fetchMeterDataData(
  query: IMeterDataAdminQuery,
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IMeterData>> {
  const params = { page, pageSize, ...query };
  const { data } = await axios.get<IFindResult<IMeterData>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-data`,
    { params },
  );
  return data;
}

export function useMeterDataData(query: IMeterDataAdminQuery) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(100);

  useEffect(() => {
    setPage(0);
  }, [query]);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IMeterData>
  >(
    ['meter-data', page, pageSize, query],
    () => fetchMeterDataData(query, page, pageSize),
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

export function useFetchMetricNames() {
  return useQuery(
    ['fetch-metric-name'],
    async () => {
      const { data } = await axios.get<string[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-data/metric-names`,
      );
      return data;
    },
    {
      initialData: [],
    },
  );
}
