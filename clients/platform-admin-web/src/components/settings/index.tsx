import * as React from 'react';
import { Box, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { AddSettingModal } from './AddSettingModal';
import { CustomizedSettingTable } from './SettingTable';
import { CustomizedFilter } from '../CustomizedFilter';
import { commonStyle } from '../../styles/CommonStyle';

export const SettingPage = () => {
  const classes = commonStyle();
  const [showModal, setShowModal] = React.useState(false);
  const [addRefreshTime, setAddRefreshTime] = React.useState(new Date());
  const [filterQuery, setFilterQuery] = React.useState<string>('');

  const onSettingModelClose = () => {
    setShowModal(false);
    setAddRefreshTime(new Date());
  };

  return (
    <Card sx={{ width: '100%', p: 3 }}>
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
      <Box sx={{ width: '25%' }}>
        <CustomizedFilter
          filterQuery={filterQuery}
          onUpdateQuery={setFilterQuery}
        />
      </Box>
      <CustomizedSettingTable
        addRefreshTime={addRefreshTime}
        filterQuery={filterQuery}
      />

      <AddSettingModal open={showModal} onClose={onSettingModelClose} />
    </Card>
  );
};
