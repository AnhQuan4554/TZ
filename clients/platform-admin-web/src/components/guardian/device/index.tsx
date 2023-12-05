import * as React from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { NextPage } from 'next';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { CustomizedDeviceTable } from './DeviceTable';
import { AddDeviceModal } from './AddDeviceModal';
import { commonStyle } from '../../../styles/CommonStyle';

export const DevicePage: NextPage = () => {
  const classes = commonStyle();
  const [showModal, setShowModal] = React.useState(false);
  const [addRefreshTime, setAddRefreshTime] = React.useState(new Date());

  const onDeviceModelClose = () => {
    setShowModal(false);
    setAddRefreshTime(new Date());
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          textAlign: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(200px, 1fr))',
        }}
      >
        <PermissionButton
          allowPermissions={PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT}
          className={classes.actionBtn}
          size="medium"
          style={{ position: 'relative' }}
          variant="contained"
          onClick={() => {
            setShowModal(true);
          }}
          startIcon={<AddIcon />}
        >
          Add new
        </PermissionButton>
      </Box>

      <CustomizedDeviceTable addRefreshTime={addRefreshTime} />
      {showModal && (
        <AddDeviceModal open={showModal} onClose={onDeviceModelClose} />
      )}
    </Box>
  );
};
