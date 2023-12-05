import * as React from 'react';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  Switch,
  FormControlLabel,
  Typography,
  Drawer,
} from '@mui/material';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IMeterJob } from '@tymlez/platform-api-interfaces';
import { EnumPolicyTags, isIsoDate } from '@tymlez/common-libs';
import { LoadingButton } from '@mui/lab';

import toast from 'react-hot-toast';
import { useForm } from '../../api/usePostForm';
import { fetchMeterJobsDetail } from '../../api/useFetchMeterJobsData';
import { useFetchMeterData } from '../../api/useFetchMeterData';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { commonStyle } from '../../styles/CommonStyle';

interface AddMeterJobsProps {
  open: boolean;
  onClose: () => void;
  meterJobId?: string;
  meterName?: string;
}
const jobTypes = ['DATA', 'MRV'];
const defaultTags = Object.values(EnumPolicyTags).map((v) => ({
  value: v,
  label: v,
}));

export function AddMeterJobsModal({
  open,
  onClose,
  meterJobId,
  meterName,
}: AddMeterJobsProps) {
  const classes = commonStyle();
  const meterData = useFetchMeterData();
  if (open && meterData?.count === 0) {
    toast.error('No meter. Please add a meter first');
  }

  const mutateForm = useForm<IMeterJob>(
    'meter-job',
    meterJobId ? 'PUT' : 'POST',
    meterJobId,
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      startISODateTime: new Date().toISOString(),
      endISODateTime: new Date().toISOString(),
      meter: '',
      type: 'DATA',
      tags: [],
      isPaused: false,
      submit: null,
      settings: null,
      runSettings: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      type: Yup.string().required('Name is required'),
      startISODateTime: Yup.string().test(
        'is-iso-date',
        'Start date is not ISO-8601 date',
        (value) => isIsoDate(value || ''),
      ),
      endISODateTime: Yup.string().test(
        'is-iso-date',
        'End date is not ISO-8601 date',
        (value) => isIsoDate(value || ''),
      ),
      meter: Yup.string().required('Meter is required'),
      settings: Yup.object().nullable(),
      runSettings: Yup.object().nullable(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (meterJobId) {
                toast.success('Meter job updated');
              } else {
                toast.success('Meter job added');
              }
              closeForm();
            } else {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: res.data.message });
              helpers.setSubmitting(false);
            }
          },
          onError: (err: any) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
          },
        },
      );
    },
  });

  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };

  useQuery(
    ['meter-job/id', meterJobId],
    async () => {
      if (meterJobId) {
        const jobData = await fetchMeterJobsDetail(meterJobId);
        const data = { ...jobData, meter: jobData.meter.id };

        formik.resetForm({ values: data as any });
      }
    },
    { refetchOnWindowFocus: false },
  );

  return (
    <Drawer
      open={open}
      onClose={closeForm}
      anchor="right"
      PaperProps={{
        sx: {
          width: '50%',
          marginTop: '92px',
          height: '-webkit-fill-available',
        },
      }}
    >
      {meterName ? (
        <DialogTitle className={classes.dialogButton}>
          Meter Job - {meterName}
        </DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>
          Add a Meter Job
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography>Name</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtName"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="name"
              placeholder="Name"
              margin="normal"
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Meter</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <Select
                displayEmpty
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="selectMeter"
                // label="Meter *"
                name="meter"
                error={Boolean(formik.touched.meter && formik.errors.meter)}
                value={formik.values.meter}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose meter
                </MenuItem>
                {meterData?.data?.map((meter) => (
                  <MenuItem key={meter.id} value={meter.id}>
                    {meter.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 3 }}>
              <Typography>Job Type</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <Select
                // variant="filled"
                // label="type"
                name="type"
                id="type"
                error={Boolean(formik.touched.type && formik.errors.type)}
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose job type
                </MenuItem>
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 2 }}>
              <Typography>Tag</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <CreatableMultiSelect
              // label="Tags *"
              values={formik.values.tags}
              options={defaultTags}
              onChange={(values) => formik.setFieldValue('tags', values)}
              error={formik.errors.tags}
            />

            <FormControlLabel
              sx={{ marginTop: 3 }}
              control={
                <Switch
                  checked={formik.values.isPaused}
                  name="isPaused"
                  onChange={formik.handleChange}
                />
              }
              label="is paused"
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Start ISO Date String</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              fullWidth
              id="txtStartIsoDateTime"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="startISODateTime"
              placeholder="Enter start ISO date string"
              margin="normal"
              autoFocus
              error={Boolean(
                formik.touched.startISODateTime &&
                  formik.errors.startISODateTime,
              )}
              helperText={
                formik.touched.startISODateTime &&
                formik.errors.startISODateTime
              }
              value={formik.values.startISODateTime || ''}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>End ISO Date String</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              fullWidth
              id="txtEndISODateTime"
              // variant="filled"
              sx={{ marginTop: 3 }}
              name="endISODateTime"
              // label="End ISO Date String"
              placeholder="Enter end ISO date string"
              margin="normal"
              autoFocus
              error={Boolean(
                formik.touched.endISODateTime && formik.errors.endISODateTime,
              )}
              helperText={
                formik.touched.endISODateTime && formik.errors.endISODateTime
              }
              value={formik.values.endISODateTime || ''}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Settings</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              multiline
              fullWidth
              id="txtSettings"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="settings"
              placeholder="Enter settings"
              margin="normal"
              autoFocus
              error={Boolean(formik.touched.settings && formik.errors.settings)}
              helperText={formik.touched.settings && formik.errors.settings}
              value={
                typeof formik.values.settings === 'string'
                  ? formik.values.settings
                  : JSON.stringify(formik.values.settings || {}, null, 4)
              }
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Run Settings</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              multiline
              fullWidth
              id="txtRunSettings"
              name="runSettings"
              placeholder="Enter settings in JSON format"
              margin="normal"
              error={Boolean(
                formik.touched.runSettings && formik.errors.runSettings,
              )}
              helperText={
                formik.touched.runSettings && formik.errors.runSettings
              }
              value={
                typeof formik.values.runSettings === 'string'
                  ? formik.values.runSettings
                  : JSON.stringify(formik.values.runSettings || {}, null, 4)
              }
              onChange={formik.handleChange}
            />
          </>
        </DialogContent>

        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            p: 3,
          }}
        >
          <Box>
            {formik.errors.submit && (
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            )}
          </Box>
          <DialogActions>
            <Button
              sx={{ mr: 3, color: '#5C6A82' }}
              color="inherit"
              size="large"
              onClick={closeForm}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={mutateForm.isLoading}
              className={classes.actionBtn}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {meterJobId ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
