import React, { useEffect } from 'react';
import { useMutation, UseMutationResult, useQuery } from 'react-query';
import axios from 'axios';
import type {
  IFindResult,
  IMeterTask,
  IMeterTaskQuery,
} from '@tymlez/platform-api-interfaces';
import type { MeterTask } from '@tymlez/platform-middleware/src/modules/meter-task/entities/meter-task.entity';

async function fetchMeterTasksData(
  meterTaskQuery: IMeterTaskQuery,
  page = 0,
  pageSize = 25,
): Promise<IFindResult<MeterTask>> {
  const params = { page, pageSize, ...meterTaskQuery };
  const { data } = await axios.get<IFindResult<MeterTask>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-tasks`,
    { params },
  );
  return data;
}

export function useMeterTasksData(meterTaskQuery: IMeterTaskQuery) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  useEffect(() => {
    setPage(0);
  }, [meterTaskQuery]);

  const {
    data: queryResult = { count: 0, data: [] },
    isLoading,
    refetch,
  } = useQuery<IFindResult<MeterTask>>(
    ['meter-tasks', page, pageSize, meterTaskQuery],
    () => fetchMeterTasksData(meterTaskQuery, page, pageSize),
    {
      staleTime: 10000,
      refetchInterval: 5000,
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
    refetch,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

async function updateMeterTask(
  newData: Partial<IMeterTask>,
): Promise<IMeterTask> {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-tasks/${newData.id!}`,
    newData,
  );
  return data;
}

export const useUpdateMeterTask = (): UseMutationResult<
  IMeterTask,
  unknown,
  Partial<IMeterTask>,
  unknown
> => {
  const mutation = useMutation((newData: Partial<IMeterTask>) => {
    return updateMeterTask(newData);
  });
  return mutation;
};
