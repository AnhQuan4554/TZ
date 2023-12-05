import type { FC } from 'react';
import * as React from 'react';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
} from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { useSettingData } from '../../api/useFetchSettingData';
import { AddSettingModal } from './AddSettingModal';
import { Loading } from '../Loading';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  addRefreshTime: Date;
  filterQuery: string;
}

export const CustomizedSettingTable: FC<Props> = ({
  addRefreshTime,
  filterQuery,
}) => {
  const [updateRefreshTime, setUpdateRefreshTime] = React.useState(new Date());
  const [selectedSettingId, setSelectedSettingId] = React.useState('');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'type',
      headerName: 'TYPE',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'group',
      headerName: 'GROUP',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'value',
      headerName: 'VALUE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'metaValue',
      headerName: 'META VALUE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <ObjectViewer data={item.jsonValue} rootKey={item.id} mode="dialog" />
        );
      },
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <PermissionButton
            allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
            disabled={
              item.name === 'RootAuthority' ||
              item.name === 'Project' ||
              item.name === 'TokenOwner' ||
              item.readOnly === true
            }
            title="Edit"
            onClick={() => {
              setSelectedSettingId(item.id);
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </PermissionButton>
        );
      },
    },
  ];

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useSettingData(addRefreshTime, updateRefreshTime, filterQuery);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {selectedSettingId && (
        <AddSettingModal
          open={selectedSettingId !== ''}
          onClose={() => {
            setSelectedSettingId('');
            setUpdateRefreshTime(new Date());
          }}
          id={selectedSettingId}
        />
      )}
      <CommonTable
        columns={columns}
        data={queryResult?.data}
        selectedCell={selectedSettingId}
        colSpan={6}
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
          dataTestId="settings-custom-pagination"
          page={page}
          count={queryResult ? queryResult.count : 0}
          pageSize={pageSize}
          // pageSizeList={[5, 10, 15]}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};
