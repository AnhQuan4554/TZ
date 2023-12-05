import * as React from 'react';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Drawer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { ISite } from '@tymlez/platform-api-interfaces';
import toast from 'react-hot-toast';
import { fetchSiteDetail } from '../../api/useFetchSiteData';
import { useForm } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

interface AddSiteProps {
  open: boolean;
  onClose: () => void;
  id?: string;
}

export function AddSiteModal({ open, onClose, id }: AddSiteProps) {
  const classes = commonStyle();
  const mutateForm = useForm<ISite>('sites', id ? 'PUT' : 'POST', id);

  const formik = useFormik({
    initialValues: {
      name: '',
      label: '',
      address: '',
      lat: '',
      lng: '',
      timezone: '',
      submit: null,
      metaData: undefined,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      label: Yup.string().required('Label is required'),
      address: Yup.string().required('Address is required'),
      lat: Yup.string().required('Lat is required'),
      lng: Yup.string().required('Lng is required'),
      // timezone: Yup.string().required('Timezone is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any), lat: +values.lat, lng: +values.lng },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (id) {
                toast.success('Site updated');
              } else {
                toast.success('Site added');
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
    ['sites/details/id', id],
    async () => {
      if (id) {
        const data = await fetchSiteDetail(id);
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
      {id ? (
        <DialogTitle>Site {formik.values.name}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>Add a Site</Typography>
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
              name="name"
              // label="Enter Email"
              placeholder="Enter Email"
              margin="normal"
              // sx={{ marginTop: 3 }}
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Label</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtLabel"
              // variant="filled"
              name="label"
              // label="Enter Label"
              placeholder="Enter Label"
              margin="normal"
              // sx={{ marginTop: 3 }}
              error={Boolean(formik.touched.label && formik.errors.label)}
              helperText={formik.touched.label && formik.errors.label}
              value={formik.values.label}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Address</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              id="txtAddress"
              // variant="filled"
              name="address"
              // label="Enter Address"
              placeholder="Enter Address"
              margin="normal"
              // sx={{ marginTop: 3 }}
              error={Boolean(formik.touched.address && formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Lat</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              type="number"
              id="txtLat"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="lat"
              // label="Enter Lat"
              placeholder="Enter Lat"
              margin="normal"
              error={Boolean(formik.touched.lat && formik.errors.lat)}
              helperText={formik.touched.lat && formik.errors.lat}
              value={formik.values.lat}
              onChange={formik.handleChange}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Lng</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              // required
              fullWidth
              type="number"
              id="txtLng"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              placeholder="Enter Lng"
              name="lng"
              // label="Enter Lng"
              margin="normal"
              error={Boolean(formik.touched.lng && formik.errors.lng)}
              helperText={formik.touched.lng && formik.errors.lng}
              value={formik.values.lng}
              onChange={formik.handleChange}
            />
            <Typography sx={{ marginTop: 2 }}>TimeZone</Typography>
            <TextField
              fullWidth
              id="txtTimezoneOffset"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="timezone"
              // label="Timezone"
              placeholder="TimeZone"
              margin="normal"
              value={formik.values.timezone}
              onChange={formik.handleChange}
            />
            <Typography sx={{ marginTop: 2 }}>TimeZone</Typography>

            <TextField
              fullWidth
              multiline
              id="txtMetaData"
              // variant="filled"
              name="metaData"
              placeholder="Meta Data"
              margin="normal"
              rows={4}
              // sx={{ marginTop: 3 }}
              value={
                formik.values.metaData
                  ? JSON.stringify(formik.values.metaData)
                  : ''
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
              className={classes.actionBtn}
              loading={mutateForm.isLoading}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              {id ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </form>
    </Drawer>
  );
}
