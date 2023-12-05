import axios from 'axios';
import type {
  IFindResult,
  IMeterJob,
  UUID,
} from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useMutation, UseMutationResult, useQuery } from 'react-query';

export async function fetchMeterJobsDetail(id: string) {
  const { data } = await axios.get<IMeterJob>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-job/${id}`,
  );
  return data;
}

async function fetchMeterJobsData(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IMeterJob>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IMeterJob>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-job`,
    { params },
  );
  return data;
}

export function useFetchMeterJobsData() {
  const { data } = useQuery<IFindResult<IMeterJob>>(
    ['meter-job'],
    () => fetchMeterJobsData(),
    {
      staleTime: 10000,
    },
  );
  return data;
}

export function useMeterJobsData(
  addRefreshTime: Date,
  updateRefreshTime: Date,
) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const {
    data: queryResult = { count: 0, data: [] },
    isLoading,
    refetch,
  } = useQuery<IFindResult<IMeterJob>>(
    ['meter-job', page, pageSize, addRefreshTime, updateRefreshTime],
    () => fetchMeterJobsData(page, pageSize),
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
    refetch,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

async function duplicateMeterJob(jobId: UUID): Promise<IMeterJob> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/meter-job/duplicate`,
    { id: jobId },
  );
  return data;
}

export const useDuplicateMeterJob = (): UseMutationResult<
  IMeterJob,
  unknown,
  UUID,
  unknown
> => {
  const mutation = useMutation((jobId: UUID) => {
    return duplicateMeterJob(jobId);
  });
  return mutation;
};
