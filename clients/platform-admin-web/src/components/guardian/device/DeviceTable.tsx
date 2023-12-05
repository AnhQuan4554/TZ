import { FC, useState } from 'react';
import * as React from 'react';
import { Box, Button, Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PreviewIcon from '@mui/icons-material/Preview';
import { formatDateAu, PERMISSION_SET } from '@tymlez/common-libs';
import type { GridColDef } from '@mui/x-data-grid';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
} from '@tymlez/frontend-libs';
import { AddDeviceModal } from './AddDeviceModal';
import { DeleteDeviceModal } from './DeleteDeviceModal';
import { useDeviceData } from '../../../api/useFetchDeviceData';
import { Loading } from '../../Loading';
import PublishDeviceButton from './PublishDeviceButton';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedDeviceTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = useState(new Date());
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deleting, setDeleting] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'deviceId',
      headerName: 'ID',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'deviceName',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'deviceType',
      headerName: 'TYPE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'deviceDescription',
      headerName: 'DESCRIPTION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'make',
      headerName: 'MAKE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'model',
      headerName: 'MODEL',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'serialNumber',
      headerName: 'SERIAL NUMBER',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'site.name',
      headerName: 'SITE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.site.name;
      },
    },
    {
      field: 'installerId',
      headerName: 'INSTALLER',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.installer.installerId;
      },
    },
    {
      field: 'certificationExpiryDate',
      headerName: 'CERTIFICATION EXPIRY DATE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return formatDateAu(new Date(item.certificationExpiryDate));
      },
    },
    {
      field: 'action',
      headerName: 'ACTION',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.isPublished ? (
          <Stack direction="column">
            <Button
              title="View"
              onClick={() => {
                setSelectedDevice(item.id);
              }}
              startIcon={<PreviewIcon />}
            >
              View
            </Button>
            <Button disabled title="Delete" startIcon={<DeleteForeverIcon />}>
              Delete
            </Button>
            <Button disabled title="Published" startIcon={<FileUploadIcon />}>
              Published
            </Button>
          </Stack>
        ) : (
          <Stack direction="column">
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                setSelectedDevice(item.id);
                setDeviceId(item.deviceId);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Delete"
              onClick={() => {
                setSelectedDevice(item.id);
                setDeviceId(item.deviceId);
                setDeleting(true);
              }}
              startIcon={<DeleteForeverIcon />}
            >
              Delete
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Publish"
              onClick={() => {
                setSelectedDevice(item.id);
                setPublishing(true);
              }}
              startIcon={<FileUploadIcon />}
            >
              Publish
            </PermissionButton>
          </Stack>
        );
      },
    },
  ];

  const handleClose = () => {
    setSelectedDevice('');
    setDeviceId('');
    setUpdateRefreshTime(new Date());
    setDeleting(false);
    setPublishing(false);
  };

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDeviceData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {selectedDevice !== '' && (
        <>
          <PublishDeviceButton
            id={selectedDevice}
            open={publishing}
            onClose={handleClose}
          />

          <AddDeviceModal
            open={!deleting && !publishing}
            onClose={handleClose}
            id={selectedDevice}
            deviceId={deviceId}
          />

          <DeleteDeviceModal
            open={deleting}
            onClose={handleClose}
            id={selectedDevice}
            deviceId={deviceId}
          />
        </>
      )}
      <Card sx={{ marginTop: '24px', p: 3 }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedDevice}
          count={queryResult?.count}
          page={page}
          pageSize={pageSize}
          colSpan={14}
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
            dataTestId="device-custom-pagination"
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
