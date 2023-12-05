import type { FC } from 'react';
import * as React from 'react';
import { Button, Box, Stack } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DoneIcon from '@mui/icons-material/Done';
import type {
  IMeterTask,
  IMeterTaskQuery,
} from '@tymlez/platform-api-interfaces';
import { EnumMeterTaskStatus, PERMISSION_SET } from '@tymlez/common-libs';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionConfirmButton,
} from '@tymlez/frontend-libs';
import { Loading } from '../Loading';
import {
  useMeterTasksData,
  useUpdateMeterTask,
} from '../../api/useFetchMeterTasksData';
import { CollapseCell } from '../CollapseCell';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  query: IMeterTaskQuery;
}

export const CustomizedMeterTasksTable: FC<Props> = ({ query }) => {
  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
    refetch,
  } = useMeterTasksData(query);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
    },
    {
      field: 'site',
      headerName: 'SITE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.site.name;
      },
    },
    {
      field: 'updatedAt',
      headerName: 'UPDATED',
      headerAlign: 'center',
      flex: 50,
      align: 'center',
    },
    {
      field: 'meterJob',
      headerName: 'METER JOB',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
      renderCell: (item: any) => {
        return item.meterJob.name;
      },
    },
    {
      field: 'stage',
      headerName: 'STAGE',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
    },
    {
      field: 'isoDateTime',
      headerName: 'DATE TIME',
      headerAlign: 'center',
      flex: 50,
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
    },
    {
      field: 'error',
      headerName: 'ERROR',
      headerAlign: 'center',
      flex: 300,
      align: 'center',
      renderCell: (item: any) => {
        return <CollapseCell error={item.error} limit={300} />;
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 200,
      renderCell: (item: any) => {
        return (
          <Stack justifyContent="center" alignItems="center">
            <ObjectViewer
              data={item}
              rootKey={item.id.toString()}
              mode="dialog"
              allowCopy={false}
            />
            <PermissionConfirmButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              disabled={item.status === EnumMeterTaskStatus.Success}
              btnTxt="Retry"
              btnIcon={<RestartAltIcon />}
              questionTxt="Are you sure you want to reset task for retry?"
              onConfirmMsg="Task status was reset successfully"
              onConfirm={() => handleConfirmRetry(item)}
            />
            <PermissionConfirmButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              disabled={item.status === EnumMeterTaskStatus.Success}
              btnTxt="Mark Done"
              btnIcon={<DoneIcon />}
              questionTxt="Are you sure you want to mark task as 'Completed'?"
              onConfirmMsg="Task status was marked done successfully"
              onConfirm={() => handleConfirmDone(item)}
            />
          </Stack>
        );
      },
    },
  ];

  const updateMeterTask = useUpdateMeterTask();
  const handleConfirmRetry = async (item: IMeterTask) => {
    await updateMeterTask.mutateAsync({
      id: item.id,
      status: 'pending',
      stage: 'collection',
    });
    refetch();
  };
  const handleConfirmDone = async (item: IMeterTask) => {
    await updateMeterTask.mutateAsync({
      id: item.id,
      status: 'success',
      stage: 'ingestion',
    });
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <Button
        sx={{ float: 'right' }}
        onClick={() => refetch()}
        color="info"
        startIcon={<RefreshIcon />}
      >
        Refresh
      </Button>

      <CommonTable
        columns={columns}
        data={queryResult?.data}
        count={queryResult?.count}
        page={page}
        pageSize={pageSize}
        colSpan={10}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        customCellStyle={{
          border: 'none',
        }}
        customHeadStyle={{
          border: 'none',
          background: '#A8D973',
          color: '#3A5320',
        }}
        hideFooter
      />
      <Box sx={{ marginTop: '32px' }}>
        <CustomPagination
          dataTestId="meter-tasks-custom-pagination"
          page={page}
          count={queryResult ? queryResult.count : 0}
          pageSize={pageSize}
          // pageSizeList={[5, 10, 15]}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};
