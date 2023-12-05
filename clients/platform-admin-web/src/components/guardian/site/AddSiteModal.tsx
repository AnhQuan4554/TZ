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
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IGuardianSite } from '@tymlez/platform-api-interfaces';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useForm } from '../../../api/usePostForm';
import { fetchGuardianSiteDetail } from '../../../api/useFetchGuardianSiteData';
import { commonStyle } from '../../../styles/CommonStyle';

interface AddSiteProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  siteName?: string;
}

export function AddSiteModal({ open, onClose, id, siteName }: AddSiteProps) {
  const classes = commonStyle();
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const mutateForm = useForm<IGuardianSite>(
    'guardian-sites',
    id ? 'PUT' : 'POST',
    id,
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      lat: '',
      lng: '',
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lat: Yup.string().required('Lat is required'),
      lng: Yup.string().required('Lng is required'),
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
    ['guardian-sites/details/id', id],
    async () => {
      if (id) {
        const data = await fetchGuardianSiteDetail(id);
        formik.resetForm({ values: data as any });
        setIsPublished(data.isPublished);
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
        <DialogTitle className={classes.dialogButton}>
          Site {siteName}
        </DialogTitle>
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
              disabled={isPublished}
              // required
              fullWidth
              id="txtName"
              placeholder="Enter Name"
              // variant="filled"
              name="name"
              // label="Name"
              margin="normal"
              // sx={{ marginTop: 3 }}
              autoFocus
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography>Lat</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter Lat"
              // required
              fullWidth
              type="number"
              id="txtLat"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="lat"
              // label="Lat"
              margin="normal"
              error={Boolean(formik.touched.lat && formik.errors.lat)}
              helperText={formik.touched.lat && formik.errors.lat}
              value={formik.values.lat}
              disabled={isPublished}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 1 }}>
              <Typography>Lng</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter Lng"
              // required
              fullWidth
              type="number"
              id="txtLng"
              // variant="filled"
              // sx={{ marginTop: 3 }}
              name="lng"
              // label="Lng"
              margin="normal"
              error={Boolean(formik.touched.lng && formik.errors.lng)}
              helperText={formik.touched.lng && formik.errors.lng}
              value={formik.values.lng}
              disabled={isPublished}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
