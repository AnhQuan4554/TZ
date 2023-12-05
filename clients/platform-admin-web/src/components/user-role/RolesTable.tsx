import React, { FC, useState } from 'react';
import { Card, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { IRole } from '@tymlez/platform-api-interfaces';
import { CommonTable, PermissionButton } from '@tymlez/frontend-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { useRoleData } from 'src/api/useRoleList';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { Loading } from '../Loading';
import { DeleteRoleModal } from './DeleteRoleModal';
import { UpdateRoleModal } from './UpdateRoleModal';

interface Props {
  addRefreshTime: Date;
}

export const RolesTable: FC<Props> = ({ addRefreshTime }) => {
  const [selectedRole, setSelectedRole] = useState<IRole | undefined>();
  const [updateRefreshTime, setUpdateRefreshTime] = useState(new Date());
  const [deleting, setDeleting] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'ROLE',
      headerAlign: 'center',
      minWidth: 100,
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      headerAlign: 'center',
      minWidth: 300,
      align: 'center',
    },
    {
      field: 'permissions',
      headerName: 'PERMISSIONS',
      headerAlign: 'center',
      minWidth: 200,
      align: 'center',
      renderCell: (item: any) => {
        return item.permissions.join(', ');
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
                setSelectedRole(item);
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
                setSelectedRole(item);
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
    setSelectedRole(undefined);
    setUpdateRefreshTime(new Date());
  };

  const { isLoading, data } = useRoleData(addRefreshTime, updateRefreshTime);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {selectedRole && (
        <>
          <UpdateRoleModal
            open={!deleting}
            onClose={handleClose}
            role={selectedRole}
          />

          <DeleteRoleModal
            open={deleting}
            onClose={handleClose}
            name={selectedRole.name}
          />
        </>
      )}
      <Card sx={{ padding: '24px', marginTop: '24px' }}>
        <CommonTable
          columns={columns}
          data={data}
          selectedCell={selectedRole}
          count={data?.length}
          colSpan={6}
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
      </Card>
    </div>
  );
};
