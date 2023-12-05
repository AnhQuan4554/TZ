import * as React from 'react';
import {
  Button,
  TextField,
  FormHelperText,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Grid,
  Drawer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import type { IGroup, ISetting } from '@tymlez/platform-api-interfaces';
import { useForm } from '../../api/usePostForm';
import { fetchSettingDetail } from '../../api/useFetchSettingData';
import { commonStyle } from '../../styles/CommonStyle';

interface AddSettingProps {
  open: boolean;
  onClose: () => void;
  id?: string;
}

export function AddSettingModal({ open, onClose, id }: AddSettingProps) {
  const classes = commonStyle();
  const groups: IGroup[] = [
    'COMMON_MRV',
    'CET_MRV',
    'CRU_MRV',
    'GOO_MRV',
    'Tymlez_CET',
    'Tymlez_CRU',
    'Tymlez_GOO',
    'Platform',
    'Client',
    'TrustChain',
  ];
  const types = ['string', 'number'];

  const mutateForm = useForm<ISetting>('settings', id ? 'PUT' : 'POST', id);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: types[0],
      group: '',
      value: '',
      metaValue: '',
      description: '',
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      type: Yup.string().required('Type is required'),
      group: Yup.string().required('Group is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              if (id) {
                toast.success('Setting updated');
              } else {
                toast.success('Setting added');
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
    ['settings/details/id', id],
    async () => {
      if (id) {
        const data = await fetchSettingDetail(id);
        formik.resetForm({ values: data as any });
        formik.setFieldValue('group', data.group ? data.group : '-');
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
        <DialogTitle className={classes.dialogButton}>Setting {id}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>Add a Setting</Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography>Name</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter name"
              // required
              fullWidth
              id="txtName"
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex' }}>
                  <Typography>Type</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <FormControl
                  required
                  fullWidth
                  sx={{ marginTop: 3, marginRight: 1 }}
                >
                  <Select
                    displayEmpty
                    // variant="filled"
                    labelId="client-simple-select-required-label"
                    id="selectType"
                    // label="Type"
                    name="type"
                    error={Boolean(formik.touched.type && formik.errors.type)}
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="" disabled>
                      Choose Type
                    </MenuItem>
                    {types?.map((x) => (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex' }}>
                  <Typography>Group</Typography>
                  <Typography sx={{ color: '#CF372C' }}>*</Typography>
                </Box>
                <FormControl required fullWidth sx={{ marginTop: 3 }}>
                  <Select
                    displayEmpty
                    // variant="filled"
                    labelId="client-simple-select-required-label"
                    id="selectGroup"
                    // label="Group"
                    name="group"
                    error={Boolean(formik.touched.group && formik.errors.group)}
                    value={formik.values.group}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="" disabled>
                      No Group
                    </MenuItem>

                    {groups.map((x) => (
                      <MenuItem key={x} value={x}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Value</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              id="txtValue"
              // variant="filled"
              name="value"
              // label="Enter Value"
              placeholder="Enter Value"
              margin="normal"
              sx={{ marginTop: 3 }}
              value={formik.values.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Meta Value</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              id="txtMetaValue"
              // variant="filled"
              name="metaValue"
              placeholder="Enter Meta Value"
              margin="normal"
              // sx={{ marginTop: 3 }}
              value={formik.values.metaValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Description</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              id="txtDescription"
              // variant="filled"
              name="description"
              // label="Description"
              placeholder="Enter Description"
              margin="normal"
              // sx={{ marginTop: 3 }}
              value={formik.values.description}
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
