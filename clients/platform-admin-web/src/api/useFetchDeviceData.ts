import axios from 'axios';
import type { IDevice, IFindResult } from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useQuery } from 'react-query';

export async function fetchDeviceDetail(deviceId: string) {
  const { data } = await axios.get<IDevice>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/device/${deviceId}`,
  );
  return data;
}

async function fetchDeviceData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IDevice>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IDevice>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/device`,
    { params },
  );
  return data;
}

export function useDeviceData(addRefreshTime: Date, updateRefreshTime: Date) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const { data: queryResult = { count: 0, data: [] }, isLoading } = useQuery<
    IFindResult<IDevice>
  >(
    ['device', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchDeviceData(page, pageSize),
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

export function useFetchDevicesMetersByInstaller(id = '') {
  return useQuery<IDevice[]>(
    ['device/getDevicesMetersByInstaller', id],
    async () => {
      if (id === '') {
        return [];
      }
      const { data } = await axios.get<IDevice[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/device/getDevicesMetersByInstaller/${id}`,
      );
      return data;
    },
  );
}

export function useFetchDevicesWithoutMetersByInstaller(id = '') {
  return useQuery<IDevice[]>(
    ['device/getDevicesWithoutMetersByInstaller', id],
    async () => {
      if (id === '') {
        return [];
      }
      const { data } = await axios.get<IDevice[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/device/getDevicesWithoutMetersByInstaller/${id}`,
      );
      return data;
    },
  );
}

export function useFetchDevicesMetersByGuardianSite(id = '') {
  return useQuery<IDevice[]>(
    ['device/getDevicesMetersByGuardianSite', id],
    async () => {
      if (id === '') {
        return [];
      }
      const { data } = await axios.get<IDevice[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/device/getDevicesMetersByGuardianSite/${id}`,
      );
      return data;
    },
  );
}

export function useFetchDevicesWithoutMetersByGuardianSite(id = '') {
  return useQuery<IDevice[]>(
    ['device/getDevicesWithoutMetersByGuardianSite', id],
    async () => {
      if (id === '') {
        return [];
      }
      const { data } = await axios.get<IDevice[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/device/getDevicesWithoutMetersByGuardianSite/${id}`,
      );
      return data;
    },
  );
}

export function useFetchDeviceData() {
  const { data } = useQuery<IFindResult<IDevice>>(
    ['device'],
    () => fetchDeviceData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}
