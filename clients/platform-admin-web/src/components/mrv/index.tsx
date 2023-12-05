import * as React from 'react';
import type { NextPage } from 'next';
import type { IMrvQuery } from '@tymlez/platform-api-interfaces';
import { EnumMrvAprrovedStatus, EnumMrvStatus } from '@tymlez/common-libs';
import { Box, Button, Card, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CustomizedMrvTable } from './MrvTable';
import { MrvQueryForm } from './MrvQueryForm';
import { MrvSummary } from './MrvSummary';
import { AddMRVModal } from './AddMRVModal';
import { commonStyle } from '../../styles/CommonStyle';

export const MrvPage: NextPage = () => {
  const classes = commonStyle();
  const [addRefreshTime, setAddRefreshTime] = React.useState(new Date());
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const handleRefresh = () => {
    setAddRefreshTime(new Date());
  };
  const onMRVModelClose = () => {
    setShowModal(false);
  };
  const [query, setQuery] = React.useState<IMrvQuery>({
    startDateTime: '',
    endDateTime: '',
    status: EnumMrvStatus.all,
    dataSourceType: 'all',
    isApproved: EnumMrvAprrovedStatus.all,
    policyTag: 'all',
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MrvSummary
        startDateTime={query.startDateTime}
        endDateTime={query.endDateTime}
      />
      <Card sx={{ p: 3 }}>
        <MrvQueryForm query={query} onUpdateQuery={setQuery} />
      </Card>
      <FormControl component="fieldset" sx={{ marginTop: 3 }}>
        <Button
          className={classes.actionBtn}
          size="large"
          style={{ position: 'relative' }}
          variant="contained"
          onClick={() => {
            setShowModal(true);
          }}
          startIcon={<AddIcon />}
        >
          Upload Carbon Data
        </Button>
      </FormControl>
      <AddMRVModal
        open={showModal}
        onClose={onMRVModelClose}
        handleRefresh={handleRefresh}
      />

      <CustomizedMrvTable
        query={query}
        addRefreshTime={addRefreshTime}
        handleRefresh={handleRefresh}
      />
    </Box>
  );
};
