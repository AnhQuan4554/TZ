import * as React from 'react';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  Select,
  MenuItem,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Typography,
  Drawer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import type { ITenancy } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../api/usePostForm';
import { useFetchMeterData } from '../../api/useFetchMeterData';
import { fetchTenancyDetail } from '../../api/useFetchTenancyData';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { commonStyle } from '../../styles/CommonStyle';

interface AddTenancyProps {
  open: boolean;
  onClose: () => void;
  tenancyId?: string;
  tenancyName?: string;
}

const initTags = [0, 1, 2, 3, 4, 5];

export function AddTenancyModal({
  open,
  onClose,
  tenancyId,
  tenancyName,
}: AddTenancyProps) {
  const classes = commonStyle();
  const meterData = useFetchMeterData();
  if (open && meterData?.count === 0) {
    toast.error('No meter. Please add a meter first');
  }

  const mutateForm = useForm<ITenancy>(
    'tenancy',
    tenancyId ? 'PUT' : 'POST',
    tenancyId,
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      meter: '',
      tags: [],
      visible: false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      meter: Yup.string().required('Meter is required'),
      tags: Yup.array().of(Yup.string()).required('Tags are required'),
    }),

    onSubmit: async (values, helpers): Promise<void> => {
      if (formik.values.tags.length === 0) {
        helpers.setErrors({ submit: 'Tags are required' });
        return;
      }
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (tenancyId) {
                toast.success('Tenancy updated');
              } else {
                toast.success('Tenancy added');
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
  const defaultTags = initTags.map((x) => {
    let tag = `${x}@`;
    if (formik.values.meter === '') {
      return { value: tag, label: tag };
    }

    const meter = meterData?.data.find((m) => m.id === formik.values.meter);
    tag += `${meter?.key}`;
    return { value: tag, label: tag };
  });

  const onVisibleChange = () => {
    formik.setFieldValue('visible', !formik.values.visible);
  };

  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };

  useQuery(
    ['tenancy/id', tenancyId],
    async () => {
      if (tenancyId) {
        const data = await fetchTenancyDetail(tenancyId);
        formik.resetForm({ values: data as any });
        formik.setFieldValue('meter', data.meter.id);
      }
    },
    { refetchOnWindowFocus: false },
  );
  const onSelectChange = (values: string[]) => {
    if (formik.values.meter === '') {
      formik.setFieldError('tags', 'Please select meter first!');
    } else {
      formik.setFieldValue('tags', values);
    }
  };
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
      {tenancyId ? (
        <DialogTitle className={classes.dialogButton}>
          Tenancy {tenancyName} ({tenancyId})
        </DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>Add a Tenancy</Typography>
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
              placeholder="Enter Name"
              margin="normal"
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              // sx={{ marginTop: 3 }}
              control={
                <Checkbox
                  checked={formik.values.visible}
                  onChange={onVisibleChange}
                />
              }
              label="Visible"
            />
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography>Meter</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <FormControl required fullWidth sx={{ marginTop: 1 }}>
              <Select
                required
                displayEmpty
                // variant="filled"
                labelId="client-simple-select-required-label"
                id="selectMeter"
                // label="Meter Tag"
                name="meter"
                error={Boolean(formik.touched.meter && formik.errors.meter)}
                value={formik.values.meter}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <MenuItem value="" disabled>
                  Choose meter
                </MenuItem>
                {meterData?.data?.map((meter) => (
                  <MenuItem key={`meter-${meter.id}`} value={meter.id}>
                    {meter.key}
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
              onChange={(values) => onSelectChange(values)}
              error={formik.errors.tags}
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
              {tenancyId ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
