import axios from 'axios';
import type {
  IFindResult,
  IDataTask,
  UUID,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useMutation, UseMutationResult, useQuery } from 'react-query';

async function fetchDataTasks(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IDataTask>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IDataTask>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-task`,
    { params },
  );
  return data;
}

export function useDataTasks() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);
  console.log('data tasks');
  const {
    data: queryResult = { count: 0, data: [] },
    isLoading,
    refetch,
  } = useQuery<IFindResult<IDataTask>>(
    ['data-task', page, pageSize],
    () => fetchDataTasks(page, pageSize),
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
    refetch,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

async function deleteDataTask(dataTaskId: UUID): Promise<IMutationResult> {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-task/${dataTaskId}`,
  );
  return data;
}

export const useDeleteDataTask = (): UseMutationResult<
  IMutationResult,
  unknown,
  UUID,
  unknown
> => {
  const mutation = useMutation((dataTaskId: UUID) => {
    return deleteDataTask(dataTaskId);
  });
  return mutation;
};
