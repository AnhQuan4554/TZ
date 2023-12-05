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
import { AddSiteModal } from './AddSiteModal';
import { DeleteSiteModal } from './DeleteSiteModal';
import { useSiteData } from '../../api/useFetchSiteData';
import { Loading } from '../Loading';

interface Props {
  addRefreshTime: Date;
}

export const CustomizedSiteTable: FC<Props> = ({ addRefreshTime }) => {
  const [updateRefreshTime, setUpdateRefreshTime] = useState(new Date());
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedSitename, setSelectedSitename] = useState('');
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
      field: 'label',
      headerName: 'LABEL',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'address',
      headerName: 'ADDRESS',
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
      field: 'timezone',
      headerName: 'TIMEZONE',
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
        return (
          <Stack direction="row">
            <PermissionButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                setSelectedSite(item.id);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
              title="Delete"
              onClick={() => {
                setSelectedSite(item.id);
                setSelectedSitename(item.name);
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
    setSelectedSite('');
    setUpdateRefreshTime(new Date());
  };

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useSiteData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {selectedSite !== '' && (
        <>
          <AddSiteModal
            open={!deleting}
            onClose={handleClose}
            id={selectedSite}
          />

          <DeleteSiteModal
            open={deleting}
            onClose={handleClose}
            siteName={selectedSitename}
            id={selectedSite}
          />
        </>
      )}
      <Card sx={{ padding: '24px', marginTop: '24px' }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
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
            dataTestId="site-custom-pagination"
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
