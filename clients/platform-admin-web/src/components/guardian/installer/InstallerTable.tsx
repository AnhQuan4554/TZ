import { FC, useState } from 'react';
import * as React from 'react';
import { Box, Button, Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PreviewIcon from '@mui/icons-material/Preview';
import { PERMISSION_SET } from '@tymlez/common-libs';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
} from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { AddInstallerModal } from './AddInstallerModal';
import { DeleteInstallerModal } from './DeleteInstallerModal';
import { useInstallerData } from '../../../api/useFetchInstallerData';
import { Loading } from '../../Loading';
import PublishInstallerButton from './PublishInstallerButton';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedIntallerTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = useState(new Date());
  const [selectedInstaller, setSelectedInstaller] = useState('');
  const [installerId, setInstallerId] = useState('');
  const [deleting, setDeleting] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'installerId',
      headerName: 'ID',
      headerAlign: 'center',
      minWidth: 50,
      align: 'center',
    },
    {
      field: 'installerName',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'registrationCountry',
      headerName: 'REGISTRATION COUNTRY',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'businessRegistrationNumber',
      headerName: 'BUSSINESS REGISTRATION NUMBER',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'businessRegistrationNumberType',
      headerName: 'BUSSINESS REGISTRATION NUMBER TYPE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'businessRegistrationDate',
      headerName: 'BUSSINESS REGISTRATION DATE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'businessType',
      headerName: 'BUSSINESS TYPE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'certificationExpiryDate',
      headerName: 'CERTIFICATION EXPIRY DATE',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
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
                setSelectedInstaller(item.id);
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
                setSelectedInstaller(item.id);
                setInstallerId(item.installerId);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Delete"
              onClick={() => {
                setSelectedInstaller(item.id);
                setInstallerId(item.installerId);
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
                setSelectedInstaller(item.id);
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
    setSelectedInstaller('');
    setInstallerId('');
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
  } = useInstallerData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {selectedInstaller !== '' && (
        <>
          <PublishInstallerButton
            id={selectedInstaller}
            open={publishing}
            onClose={handleClose}
          />

          <AddInstallerModal
            open={!deleting && !publishing}
            onClose={handleClose}
            id={selectedInstaller}
            installerId={installerId}
          />

          <DeleteInstallerModal
            open={deleting}
            onClose={handleClose}
            installerId={installerId}
            id={selectedInstaller}
          />
        </>
      )}
      <Card sx={{ marginTop: '24px', p: 3 }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedInstaller}
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
            dataTestId="installer-custom-pagination"
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
