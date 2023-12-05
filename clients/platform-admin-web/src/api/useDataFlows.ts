import axios from 'axios';
import type {
  IFindResult,
  IDataFlow,
  UUID,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import React from 'react';
import { useMutation, UseMutationResult, useQuery } from 'react-query';

async function fetchDataFlows(
  page = 0,
  pageSize = 25,
): Promise<IFindResult<IDataFlow>> {
  const params = { page, pageSize };
  const { data } = await axios.get<IFindResult<IDataFlow>>(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-flow`,
    { params },
  );
  return data;
}

export function useDataFlows(initPageSize = 25) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(initPageSize);

  const {
    data: queryResult = { count: 0, data: [] },
    isLoading,
    refetch,
  } = useQuery<IFindResult<IDataFlow>>(
    ['data-flow', page, pageSize],
    () => fetchDataFlows(page, pageSize),
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

async function duplicateDataFlow(dataFlowId: UUID): Promise<IMutationResult> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-flow/duplicate`,
    { id: dataFlowId },
  );
  return data;
}

export const useDuplicateDataFlow = (): UseMutationResult<
  IMutationResult,
  unknown,
  UUID,
  unknown
> => {
  const mutation = useMutation((dataFlowId: UUID) => {
    return duplicateDataFlow(dataFlowId);
  });
  return mutation;
};

async function publishDataFlow(dataFlowId: UUID): Promise<IMutationResult> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-flow/publish`,
    { id: dataFlowId },
  );
  return data;
}

export const usePublishDataFlow = (): UseMutationResult<
  IMutationResult,
  unknown,
  UUID,
  unknown
> => {
  const mutation = useMutation((dataFlowId: UUID) => {
    return publishDataFlow(dataFlowId);
  });
  return mutation;
};

async function deleteDataFlow(dataFlowId: UUID): Promise<IMutationResult> {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-flow/${dataFlowId}`,
  );
  return data;
}

export const useDeleteDataFlow = (): UseMutationResult<
  IMutationResult,
  unknown,
  UUID,
  unknown
> => {
  const mutation = useMutation((dataFlowId: UUID) => {
    return deleteDataFlow(dataFlowId);
  });
  return mutation;
};

async function toggleDataFlow(
  dataFlowId: UUID,
  enabled: boolean,
): Promise<IMutationResult> {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/data-flow/${dataFlowId}`,
    { isPaused: !enabled },
  );
  return data;
}

export const useToggleDataFlow = (): UseMutationResult<
  IMutationResult,
  unknown,
  { dataFlowId: UUID; enabled: boolean },
  unknown
> => {
  const mutation = useMutation(
    ({ dataFlowId, enabled }: { dataFlowId: UUID; enabled: boolean }) => {
      return toggleDataFlow(dataFlowId, enabled);
    },
  );
  return mutation;
};
