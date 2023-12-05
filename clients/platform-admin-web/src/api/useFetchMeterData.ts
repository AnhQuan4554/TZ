import axios from 'axios';
import type { IMeter, IFindResult } from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchMeterDetail(meterId: string) {
  const { data } = await axios.get<IMeter>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meters/${meterId}`,
  );
  return data;
}

async function fetchMeterData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IMeter>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IMeter>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meters`,
    { params },
  );
  return data;
}

export function useFetchMeterData() {
  const { data } = useQuery<IFindResult<IMeter>>(
    ['meters'],
    () => fetchMeterData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}

export function useMeterData(addRefreshTime: Date, updateRefreshTime: Date) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IMeter>
  >(
    ['meters', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchMeterData(page, pageSize),
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

export function useFetchMetersBySite(id: string) {
  return useQuery<IMeter[]>(['meters/metersBySite', id], async () => {
    if (id === '') {
      return [];
    }
    const { data } = await axios.get<IMeter[]>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meters/metersBySite/${id}`,
    );
    return data;
  });
}

export function useFetchMetersByDevice(id: string) {
  return useQuery<IMeter[]>(['meters/metersByDevice', id], async () => {
    if (id === '') {
      return [];
    }
    const { data } = await axios.get<IMeter[]>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meters/metersByDevice/${id}`,
    );
    return data;
  });
}
