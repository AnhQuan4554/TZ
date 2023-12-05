import React, { FC, useState } from 'react';
import { Box, Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { IUser } from '@tymlez/platform-api-interfaces';
import {
  CommonTable,
  CustomPagination,
  PermissionButton,
} from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { UpdateUserModal } from './UpdateUserModal';
import { Loading } from '../Loading';
import { useUserData } from '../../api/useFetchUserData';
import { DeleteUserModal } from './DeleteUserModal';

interface Props {
  addRefreshTime: Date;
}

export const UsersTable: FC<Props> = ({ addRefreshTime }) => {
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [updateRefreshTime, setUpdateRefreshTime] = React.useState(new Date());
  const [deleting, setDeleting] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'email',
      headerName: 'EMAIL',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'NAME',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'userRoles',
      headerName: 'ROLES',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.userRoles.map((userRole: any) => userRole.name).join(', ');
      },
    },
    {
      field: 'tags',
      headerName: 'Tags',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'timeout',
      headerName: 'TIMEOUT (MINUTES)',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
    },

    {
      field: 'emailVerified',
      headerName: 'Email Verified',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: ({ emailVerified, tags }: any) => {
        if (tags?.[0] === 'microsoft.com') {
          return 'N/A';
        }
        return emailVerified ? 'Yes' : 'No';
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
          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <PermissionButton
              allowPermissions={PERMISSION_SET.USER_WRITE_MANAGEMENT}
              title="Edit"
              onClick={() => {
                setSelectedUser(item);
                setDeleting(false);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </PermissionButton>
            <PermissionButton
              allowPermissions={PERMISSION_SET.USER_WRITE_MANAGEMENT}
              title="Delete"
              onClick={() => {
                setSelectedUser(item);
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
    setSelectedUser(undefined);
    setUpdateRefreshTime(new Date());
  };

  const {
    queryResult,
    isLoading,
    page,
    pageSize,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useUserData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {selectedUser && (
        <>
          <UpdateUserModal
            open={!deleting}
            onClose={handleClose}
            user={selectedUser}
          />

          <DeleteUserModal
            open={deleting}
            onClose={handleClose}
            userId={selectedUser.id}
            email={selectedUser.email}
          />
        </>
      )}
      <Card sx={{ padding: '24px', marginTop: '24px' }}>
        <CommonTable
          columns={columns}
          data={queryResult?.data}
          selectedCell={selectedUser}
          count={queryResult?.count}
          page={page}
          pageSize={pageSize}
          colSpan={6}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          hideFooter
          customCellStyle={{
            border: 'none',
          }}
          customHeadStyle={{
            border: 'none',
            background: '#A8D973',
            color: '#3A5320',
          }}
        />
        <Box sx={{ marginTop: '32px' }}>
          <CustomPagination
            dataTestId="admin-magament-custom-pagination"
            page={page}
            count={queryResult ? queryResult.count : 0}
            pageSize={pageSize}
            // pageSizeList={[5, 10, 15]}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </div>
  );
};
