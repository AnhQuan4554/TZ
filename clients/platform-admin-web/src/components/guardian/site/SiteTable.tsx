import { FC, useState } from 'react';
import * as React from 'react';
import { Box, Button, Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PreviewIcon from '@mui/icons-material/Preview';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
} from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { Loading } from '../../Loading';
import { DeleteSiteModal } from './DeleteSiteModal';
import { AddSiteModal } from './AddSiteModal';
import PublishSiteButton from './PublishSiteButton';
import { useGuardianSiteData } from '../../../api/useFetchGuardianSiteData';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedSiteTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = useState(new Date());
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedSiteName, setSelectedSiteName] = useState('');
  const [deleting, setDeleting] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'lat',
      headerName: 'LAT',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'lng',
      headerName: 'LNG',
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
          <Stack direction="row">
            <Button
              title="View"
              onClick={() => {
                setSelectedSite(item.id);
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
          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                setSelectedSite(item.id);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
              isLoadingButton
              title="Delete"
              onClick={() => {
                setSelectedSite(item.id);
                setSelectedSiteName(item.name);
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
                setSelectedSite(item.id);
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
    setDeleting(false);
    setSelectedSite('');
    setUpdateRefreshTime(new Date());
    setPublishing(false);
  };

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useGuardianSiteData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {selectedSite !== '' && (
        <>
          <PublishSiteButton
            id={selectedSite}
            open={publishing}
            onClose={handleClose}
          />

          <AddSiteModal
            open={!deleting && !publishing}
            onClose={handleClose}
            id={selectedSite}
            siteName={selectedSiteName}
          />

          <DeleteSiteModal
            open={deleting}
            onClose={handleClose}
            id={selectedSite}
            siteName={selectedSiteName}
          />
        </>
      )}
      <Card sx={{ marginTop: '24px', p: 3 }}>
        <CommonTable
          columns={columns}
          data={queryResult.data}
          selectedCell={selectedSite}
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
            dataTestId="guardian-site-custom-pagination"
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
