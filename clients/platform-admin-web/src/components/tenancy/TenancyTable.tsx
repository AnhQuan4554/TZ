import { FC, useState } from 'react';
import * as React from 'react';
import { Box, Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
} from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AddTenancyModal } from './AddTenancyModal';
import { DeleteTenancyModal } from './DeleteTenancyModal';
import { useTenancyData } from '../../api/useFetchTenancyData';
import { Loading } from '../Loading';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedTenancyTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = React.useState(new Date());
  const [selectedTenancy, setSelectedTenancy] = useState<string | undefined>(
    '',
  );
  const [selectedTenancyName, setSelectedTenancyName] = useState('');
  const [deleting, setDeleting] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'meterTag',
      headerName: 'METER TAG',
      headerAlign: 'center',
      minWidth: 150,
      align: 'center',
      renderCell: (item: any) => {
        return item.meter.key;
      },
    },
    {
      field: 'dataTags',
      headerName: 'DATA TAGS',
      headerAlign: 'center',
      minWidth: 500,
      align: 'center',
      renderCell: (item: any) => {
        return item.tags.join(', ');
      },
    },
    {
      field: 'visible',
      headerName: 'VISIBLE',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
      renderCell: (item: any) => {
        return item.visible ? 'Yes' : 'No';
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
      renderCell: (item: any) => {
        return (
          <Stack direction="row">
            <ObjectViewer
              data={item}
              rootKey={item.id}
              mode="dialog"
              allowCopy={false}
            />
            <PermissionButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                setSelectedTenancy(item.id);
                setSelectedTenancyName(item.name);
                setDeleting(false);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              title="Delete"
              onClick={() => {
                setSelectedTenancy(item.id);
                setSelectedTenancyName(item.name);
                setDeleting(true);
              }}
              startIcon={<DeleteForeverIcon />}
            >
              Delete
            </PermissionButton>
          </Stack>
        );
      },
    },
  ];

  const handleClose = () => {
    setDeleting(false);
    setSelectedTenancy('');
    setUpdateRefreshTime(new Date());
  };

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTenancyData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {selectedTenancy !== '' && (
        <>
          <AddTenancyModal
            open={!deleting}
            onClose={handleClose}
            tenancyId={selectedTenancy}
            tenancyName={selectedTenancyName}
          />

          <DeleteTenancyModal
            open={deleting}
            onClose={handleClose}
            tenancyId={selectedTenancy}
            tenancyName={selectedTenancyName}
          />
        </>
      )}
      <Card sx={{ padding: '24px', marginTop: '24px' }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedTenancy}
          count={queryResult?.count}
          page={page}
          pageSize={pageSize}
          colSpan={7}
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
            dataTestId="tenancy-custom-pagination"
            page={page}
            count={queryResult ? queryResult.count : 0}
            pageSize={pageSize}
            // pageSizeList={[5, 10, 15]}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </>
  );
};
