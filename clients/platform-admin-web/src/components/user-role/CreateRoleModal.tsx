import {
  Button,
  DialogContent,
  DialogActions,
  TextField,
  FormHelperText,
  Box,
  Typography,
  Drawer,
} from '@mui/material';
import { useFormik } from 'formik';
import type { IRole } from '@tymlez/platform-api-interfaces';
import { LoadingButton } from '@mui/lab';
import React, { FC, useEffect } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useFetchPermissions } from 'src/api/useRoleList';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { useForm } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialValues = {
  permissions: [],
  name: '',
  description: '',
  submit: null,
};

export const userSchema = Yup.object().shape({
  permissions: Yup.array()
    .of(Yup.string())
    .required('Permissions are required'),
  description: Yup.string().required('Description is required'),
  name: Yup.string().required('Role name is required'),
});

export const CreateRoleModal: FC<Props> = (props) => {
  const classes = commonStyle();
  const { open, onClose } = props;

  const defaultPermissions = useFetchPermissions().data?.map((x) => {
    return { value: x, label: x };
  });

  const mutateForm = useForm<IRole>('auth/roles');

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      mutateForm.mutate(
        { ...(values as any) },
        {
          onSuccess: (res: any) => {
            if (res.data.success) {
              helpers.setStatus({ success: true });
              toast.success('Role created');
              onClose();
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
  const fSetValues = formik.setValues;
  useEffect(() => {
    fSetValues(initialValues);
  }, [open, fSetValues]);

  const onAdd = async () => {
    await formik.submitForm();
  };
  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };
  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        PaperProps={{
          sx: {
            width: '50%',
            marginTop: '92px',
            height: '-webkit-fill-available',
          },
        }}
      >
        <Typography className={classes.dialogButton}>Create Role</Typography>
        <DialogContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex' }}>
              <Typography>Name</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              placeholder="Enter Role Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="name"
              value={formik.values.name}
            />

            <Box sx={{ display: 'flex' }}>
              <Typography>Description</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              error={Boolean(
                formik.touched.description && formik.errors.description,
              )}
              fullWidth
              helperText={
                formik.touched.description && formik.errors.description
              }
              placeholder="Enter Description"
              margin="normal"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="description"
              value={formik.values.description}
            />

            <Box sx={{ display: 'flex' }}>
              <Typography>Permission</Typography>
              <Typography sx={{ color: '#CF372C', marginBottom: 2 }}>
                *
              </Typography>
            </Box>
            {defaultPermissions && (
              <CreatableMultiSelect
                values={formik.values.permissions}
                options={defaultPermissions}
                onChange={(values) =>
                  formik.setFieldValue('permissions', values)
                }
                error={
                  formik.touched.permissions
                    ? formik.errors.permissions
                    : undefined
                }
              />
            )}
          </form>
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
              onClick={onAdd}
            >
              Add
            </LoadingButton>
          </DialogActions>
        </Box>
      </Drawer>
    </div>
  );
};
