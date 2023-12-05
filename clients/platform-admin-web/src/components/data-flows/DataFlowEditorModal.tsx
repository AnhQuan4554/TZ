import * as React from 'react';
import type { IDataFlow, IMeterJob } from '@tymlez/platform-api-interfaces';
import { isIsoDate } from '@tymlez/common-libs';
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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';

import toast from 'react-hot-toast';
import { useForm } from '../../api/usePostForm';
import { useFetchMeterData } from '../../api/useFetchMeterData';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { commonStyle } from '../../styles/CommonStyle';

interface DataFlowEditorModalProps {
  open: boolean;
  onClose: () => void;
  dataFlow?: IDataFlow | null;
}

export function DataFlowEditorModal({
  open,
  onClose,
  dataFlow,
}: DataFlowEditorModalProps) {
  const classes = commonStyle();
  const meterData = useFetchMeterData();
  if (open && meterData?.count === 0) {
    toast.error('No meter. Please add a meter first');
  }

  const isCreatingNew = dataFlow === undefined || dataFlow === null;

  const mutateForm = useForm<IMeterJob>(
    'data-flow',
    isCreatingNew ? 'POST' : 'PUT',
    dataFlow?.id,
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      startISODateTime: new Date().toISOString(),
      endISODateTime: new Date().toISOString(),
      meter: '',
      runDelayIntervals: 0,
      tags: [],
      isPaused: false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
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
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (isCreatingNew) {
                toast.success('Data flow added');
              } else {
                toast.success('Data flow updated');
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

  const { resetForm } = formik; // this is to silence lint warnings
  React.useEffect(() => {
    if (dataFlow) {
      resetForm({
        values: { ...(dataFlow as any), meter: dataFlow.meter.id },
      });
    }
  }, [dataFlow, resetForm]);

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
      {dataFlow ? (
        <DialogTitle>Data Flow - {dataFlow.name}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>
          Add a Data Flow
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
            <Box sx={{ display: 'flex' }}>
              <Typography>Meter</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <Select
                displayEmpty
                // variant="filled"
                labelId="meter-simple-select-required-label"
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
            <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 2 }}>
              <Typography>Tags</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <CreatableMultiSelect
              // label="Tags *"
              values={formik.values.tags}
              options={[]}
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
            <Box sx={{ display: 'flex', marginTop: 1 }}>
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
              // label="Start ISO Date String"
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
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography>End ISO Date String</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              fullWidth
              id="txtEndISODateTime"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="endISODateTime"
              // label="End ISO Date String"
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
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography>Run Delay Intervals</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              id="txtRunDelayIntervals"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="runDelayIntervals"
              // label="Run Delay Intervals"
              margin="normal"
              autoFocus
              error={Boolean(
                formik.touched.runDelayIntervals &&
                  formik.errors.runDelayIntervals,
              )}
              helperText={
                formik.touched.runDelayIntervals &&
                formik.errors.runDelayIntervals
              }
              value={formik.values.runDelayIntervals || 0}
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
              className={classes.actionBtn}
              loading={mutateForm.isLoading}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {isCreatingNew ? 'Save' : 'Update'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
