import type { FC } from 'react';
import * as React from 'react';
import { Box, Stack } from '@mui/material';
import type { IDataTask } from '@tymlez/platform-api-interfaces';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
  PermissionConfirmButton,
} from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  dataTasks: IDataTask[];
  onCreateNew: () => void;
  page: number;
  pageSize: number;
  onChangePage: Function;
  onChangeRowsPerPage: Function;
  onEditDataTask: Function;
  onDeleteDataTask: Function;
}

export const DataTasksTable: FC<Props> = ({
  dataTasks,
  page,
  pageSize,
  onChangePage,
  onChangeRowsPerPage,
  onEditDataTask,
  onDeleteDataTask,
  onCreateNew,
}) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
      renderCell: (item: any) => {
        return `${item?.id?.substr(0, 8)}...`;
      },
    },
    {
      field: 'name',
      headerName: 'FlowName / TaskName',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return `${item?.dataFlow?.name} / ${item?.name}`;
      },
    },
    {
      field: 'type',
      headerName: 'Type',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item?.type;
      },
    },
    {
      field: 'dependsOn',
      headerName: 'Parent Tasks',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item?.dependsOn.length || 0;
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 350,
      renderCell: (item: any) => {
        return (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <ObjectViewer
              data={item}
              rootKey={item.id.toString()}
              mode="dialog"
              allowCopy={false}
            />
            <PermissionButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                onEditDataTask(item);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionConfirmButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              btnTxt="Delete"
              btnIcon={<ContentCopyIcon />}
              questionTxt={`Are you sure you want to delete the data task (${item.name})?`}
              onConfirmMsg="Deleting Data Task"
              onConfirm={() => onDeleteDataTask(item)}
            />
          </Stack>
        );
      },
    },
  ];
  console.log(onCreateNew);

  return (
    <Box>
      <CommonTable
        columns={columns}
        data={dataTasks}
        count={dataTasks.length}
        page={page}
        pageSize={pageSize}
        colSpan={5}
        handleChangePage={(_, newPage) => onChangePage(newPage)}
        handleChangeRowsPerPage={(event) =>
          onChangeRowsPerPage(parseInt(event.target.value, 10))
        }
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
          dataTestId="data-task-beta-custom-pagination"
          page={page}
          count={dataTasks ? dataTasks.length : 0}
          pageSize={pageSize}
          // pageSizeList={[5, 10, 15]}
          handleChangePage={(_: any, newPage: any) => onChangePage(newPage)}
          handleChangePageSize={(event) =>
            onChangeRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Box>
    </Box>
  );
};
