import type { IRole } from '@tymlez/platform-api-interfaces';
import axios from 'axios';
import { useQuery } from 'react-query';

export function useRoleData(addRefreshTime: Date, updateRefreshTime: Date) {
  return useQuery<IRole[]>(
    ['roles', addRefreshTime, updateRefreshTime],
    async () => {
      const { data } = await axios.get<IRole[]>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/roles`,
      );
      return data;
    },
  );
}

export function useFetchPermissions() {
  return useQuery<string[]>(['roles/getPermissions'], async () => {
    const { data } = await axios.get<string[]>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/roles/permissions`,
    );
    return data;
  });
}

export function useRoleList() {
  return useQuery<IRole[]>(['roles'], async () => {
    const { data } = await axios.get<IRole[]>(
      `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/roles`,
    );
    return data;
  });
}
