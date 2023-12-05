import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Drawer,
} from '@mui/material';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { IPolicy } from '@tymlez/platform-api-interfaces';
import { EnumPolicyNames } from '@tymlez/common-libs';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useForm } from '../../../api/usePostForm';
import { fetchPolicyDetail } from '../../../api/useFetchPolicyData';
import { Loading } from '../../Loading';
import { commonStyle } from '../../../styles/CommonStyle';

interface AddPolicyProps {
  open: boolean;
  onClose: () => void;
  id?: string;
}

export function AddPolicyModal({ open, onClose, id }: AddPolicyProps) {
  const classes = commonStyle();
  const names = Object.values(EnumPolicyNames);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const mutateForm = useForm<IPolicy>('policy', id ? 'PUT' : 'POST', id);

  const formik = useFormik({
    initialValues: {
      name: names[0],
      version: '1.0.0',
      content: undefined,
      tokenMintValue: 1,
      republishedSchema: false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Policy Name is required'),
      version: Yup.string()
        .required('Version is required')
        .matches(
          /^[0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}$/,
          'Must in version format',
        ),
    }),

    onSubmit: async (_, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(formik.values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              if (id) {
                toast.success('Policy updated');
              } else {
                toast.success('Policy added');
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
            helpers.setErrors({ submit: err.response?.data.message });
          },
        },
      );
    },
  });

  useQuery(
    ['id', id],
    async () => {
      if (id) {
        const data = await fetchPolicyDetail(id);
        formik.resetForm({ values: data as any });
        setIsPublished(data.isPublished);
      }
    },
    { refetchOnWindowFocus: false },
  );
  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };

  if (mutateForm.isLoading) {
    <Loading />;
  }
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
        <DialogTitle>Policy {id}</DialogTitle>
      ) : (
        <Typography className={classes.dialogButton}>Add a Policy</Typography>
      )}

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Policy Name</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <FormControl
            required
            disabled={isPublished}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            <Select
              // variant="filled"
              labelId="type-simple-select-required-label"
              id="selectName"
              // label="Policy Name"
              name="name"
              error={Boolean(formik.touched.name && formik.errors.name)}
              value={formik.values.name}
              onChange={formik.handleChange}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Version</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            disabled={isPublished}
            fullWidth
            id="txtVersion"
            // variant="filled"
            name="version"
            // label="Version"
            margin="normal"
            rows={4}
            // sx={{ marginTop: 3 }}
            value={formik.values.version}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.version && formik.errors.version)}
            helperText={formik.touched.version && formik.errors.version}
            onBlur={formik.handleBlur}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Token Mint Value</Typography>
          </Box>
          <TextField
            disabled={isPublished}
            fullWidth
            type="number"
            id="txtToken"
            // variant="filled"
            name="tokenMintValue"
            // label="Token Mint Value"
            margin="normal"
            rows={4}
            // sx={{ marginTop: 3 }}
            value={formik.values.tokenMintValue}
            onChange={formik.handleChange}
            error={Boolean(
              formik.touched.tokenMintValue && formik.errors.tokenMintValue,
            )}
            helperText={
              formik.touched.tokenMintValue && formik.errors.tokenMintValue
            }
            onBlur={formik.handleBlur}
          />
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Republished Schema</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <FormControl
            required
            disabled={isPublished}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            <Select
              // variant="filled"
              labelId="type-simple-select-required-label"
              id="selectRepublishedSchema"
              // label="Republished Schema"
              name="republishedSchema"
              error={Boolean(
                formik.touched.republishedSchema &&
                  formik.errors.republishedSchema,
              )}
              value={formik.values.republishedSchema}
              onChange={formik.handleChange}
            >
              <MenuItem key="true" value="true">
                true
              </MenuItem>
              <MenuItem key="false" value="false">
                false
              </MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Typography>Content</Typography>
          </Box>
          <TextField
            placeholder="Enter Content"
            disabled={isPublished}
            fullWidth
            multiline
            id="txtContent"
            // variant="filled"
            name="content"
            // label="Content"
            margin="normal"
            rows={4}
            // sx={{ marginTop: 3 }}
            value={formik.values.content}
            onChange={formik.handleChange}
          />
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
              size="large"
              color="inherit"
              onClick={closeForm}
              sx={{ mr: 3, color: '#5C6A82' }}
            >
              Cancel
            </Button>
            <LoadingButton
              className={classes.actionBtn}
              disabled={isPublished}
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
