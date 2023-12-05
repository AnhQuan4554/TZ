import { Box } from '@mui/material';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { UsersTable } from './UsersTable';
import { CreateUserModal } from './CreateUserModal';
import { commonStyle } from '../../styles/CommonStyle';

export const UserManagementPage: NextPage = () => {
  const classes = commonStyle();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [addRefreshTime, setAddRefreshTime] = React.useState(new Date());

  const onUserModelClose = () => {
    setIsCreating(false);
    setAddRefreshTime(new Date());
  };
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
        }}
      >
        <PermissionButton
          allowPermissions={PERMISSION_SET.USER_WRITE_MANAGEMENT}
          className={classes.actionBtn}
          size="medium"
          style={{ position: 'relative' }}
          variant="contained"
          onClick={() => {
            setIsCreating(true);
          }}
          startIcon={<AddIcon />}
        >
          Add new
        </PermissionButton>
      </Box>
      <UsersTable addRefreshTime={addRefreshTime} />

      <CreateUserModal open={isCreating} onClose={onUserModelClose} />
    </Box>
  );
};
