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
import { AddMeterModal } from './AddMeterModal';
import { DeleteMeterModal } from './DeleteMeterModal';
import { useMeterData } from '../../api/useFetchMeterData';
import { Loading } from '../Loading';
import { ObjectViewer } from '../common/ObjectViewer';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedMeterTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = React.useState(new Date());
  const [selectedMeter, setSelectedMeter] = useState<string | undefined>('');
  const [selectedMeterName, setSelectedMeterName] = useState('');
  const [deleting, setDeleting] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'key',
      headerName: 'KEY',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'meterType',
      headerName: 'TYPE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'interval',
      headerName: 'INTERVAL',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'dataSourceType',
      headerName: 'SOURCE TYPE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'siteName',
      headerName: 'SITE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.site.name;
      },
    },
    {
      field: 'deviceId',
      headerName: 'DEVICE ID',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.device?.deviceId;
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 200,
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
                setSelectedMeter(item.id);
                setSelectedMeterName(item.name);
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
                setSelectedMeter(item.id);
                setSelectedMeterName(item.name);
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
    setSelectedMeter('');
    setUpdateRefreshTime(new Date());
  };

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useMeterData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {selectedMeter !== '' && (
        <>
          <AddMeterModal
            open={!deleting}
            onClose={handleClose}
            meterId={selectedMeter}
            meterName={selectedMeterName}
          />

          <DeleteMeterModal
            open={deleting}
            onClose={handleClose}
            meterId={selectedMeter}
            meterName={selectedMeterName}
          />
        </>
      )}
      <Card sx={{ padding: '24px', marginTop: '24px' }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedMeter}
          count={queryResult?.count}
          page={page}
          pageSize={pageSize}
          colSpan={8}
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
            dataTestId="meter-custom-pagination"
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
