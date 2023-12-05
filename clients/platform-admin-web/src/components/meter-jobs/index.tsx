import * as React from 'react';
import type { NextPage } from 'next';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PermissionButton } from '@tymlez/frontend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { LoadingButton } from '@mui/lab';
import { CustomizedMeterJobsTable } from './MeterJobsTable';
import { AddMeterJobsModal } from './AddMeterJobsModal';
import { fetchMeterJobsDetail } from '../../api/useFetchMeterJobsData';
import { formMultiple } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

export const MeterJobsPage: NextPage = () => {
  const classes = commonStyle();
  const [showModal, setShowModal] = React.useState(false);
  const [addRefreshTime, setAddRefreshTime] = React.useState(new Date());
  const [meterJobs, setMeterJobs] = React.useState([]);
  const [loadingActivate, setLoadingActivate] = React.useState(false);
  const [loadingDeactivate, setLoadingDeactivate] = React.useState(false);

  const editType = ['Activate', 'Deactivate'];

  const onMeterModelClose = () => {
    setShowModal(false);
    setAddRefreshTime(new Date());
  };

  const onMeterJobActivate = async (type: any) => {
    if (type === editType[0]) {
      setLoadingActivate(true);
    } else {
      setLoadingDeactivate(true);
    }
    for (let index = 0; index < meterJobs.length; index++) {
      const data = await fetchMeterJobsDetail(meterJobs[index]);
      await formMultiple('meter-job', 'PUT', {
        ...(data as any),
        ...{ isPaused: type !== editType[0] },
      });
    }
    setLoadingActivate(false);
    setLoadingDeactivate(false);
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
        {meterJobs.length !== 0 && (
          <>
            {editType.map((type) => (
              <LoadingButton
                loading={
                  type === editType[0] ? loadingActivate : loadingDeactivate
                }
                disabled={
                  type === editType[0] ? loadingDeactivate : loadingActivate
                }
                variant="outlined"
                style={{ marginLeft: '10px' }}
                onClick={() => onMeterJobActivate(type)}
              >
                {type}
              </LoadingButton>
            ))}
          </>
        )}
      </Box>

      <CustomizedMeterJobsTable
        addRefreshTime={addRefreshTime}
        setMeterJobs={setMeterJobs}
      />

      <AddMeterJobsModal open={showModal} onClose={onMeterModelClose} />
    </Box>
  );
};
