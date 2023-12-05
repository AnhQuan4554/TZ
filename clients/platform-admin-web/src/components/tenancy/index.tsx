import * as React from 'react';
import type { NextPage } from 'next';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AddTenancyModal } from './AddTenancyModal';
import { CustomizedTenancyTable } from './TenancyTable';
import { commonStyle } from '../../styles/CommonStyle';

export const TenancyPage: NextPage = () => {
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

      <CustomizedTenancyTable addRefreshTime={addRefreshTime} />

      <AddTenancyModal open={showModal} onClose={onMeterModelClose} />
    </Box>
  );
};
