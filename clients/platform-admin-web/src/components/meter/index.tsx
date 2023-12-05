import * as React from 'react';
import type { NextPage } from 'next';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AddMeterModal } from './AddMeterModal';
import { CustomizedMeterTable } from './MeterTable';
import { commonStyle } from '../../styles/CommonStyle';

export const MeterPage: NextPage = () => {
  const classes = commonStyle();
  const [showModal, setShowModal] = React.useState(false);
  const [addRefreshTime, setAddRefreshTime] = React.useState(new Date());

  const onMeterModelClose = () => {
    setShowModal(false);
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
          allowPermissions={PERMISSION_SET.CONFIG_WRITE_MANAGEMENT}
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

      <CustomizedMeterTable addRefreshTime={addRefreshTime} />

      <AddMeterModal open={showModal} onClose={onMeterModelClose} />
    </Box>
  );
};
