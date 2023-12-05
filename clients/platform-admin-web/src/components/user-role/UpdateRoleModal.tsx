import {
  Button,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  Box,
  FormHelperText,
  Drawer,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import type { IRole } from '@tymlez/platform-api-interfaces';
import { useFormik } from 'formik';
import React, { FC, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { useForm } from '../../api/usePostForm';
import { useFetchPermissions } from '../../api/useRoleList';
import { commonStyle } from '../../styles/CommonStyle';

type Props = {
  open: boolean;
  onClose: () => void;
  role: IRole;
};

export const userSchema = Yup.object().shape({
  permissions: Yup.array()
    .of(Yup.string())
    .required('Permissions are required'),
  description: Yup.string().required('Description is required'),
  name: Yup.string().required('Role name is required'),
});

export const UpdateRoleModal: FC<Props> = (props) => {
  const classes = commonStyle();
  const { role, open, onClose } = props;
  const defaultPermissions = useFetchPermissions().data?.map((x) => {
    return { value: x, label: x };
  });

  const initialValues = useMemo(
    () => ({
      ...role,
      submit: null,
    }),
    [role],
  );

  const mutateForm = useForm<IRole>('auth/roles', 'PUT', role.name);

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
              toast.success('User role updated');
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
  const fSetValues = formik.setValues;
  useEffect(() => {
    if (role) {
      fSetValues(initialValues);
    }
  }, [role, open, initialValues, fSetValues]);

  const onEdit = async () => {
    await formik.submitForm();
  };
  const closeForm = () => {
    mutateForm.reset();
    formik.resetForm();
    onClose();
  };

  return (
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
      <DialogTitle className={classes.dialogButton}>
        Role {role?.name}
      </DialogTitle>
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
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="name"
            value={formik.values.name}
            sx={{ marginTop: 3 }}
          />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Typography>Description</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            error={Boolean(
              formik.touched.description && formik.errors.description,
            )}
            fullWidth
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="description"
            value={formik.values.description}
            sx={{ marginTop: 3 }}
          />
          {defaultPermissions && (
            <CreatableMultiSelect
              label="Permissions"
              values={formik.values.permissions}
              options={defaultPermissions}
              onChange={(values) => formik.setFieldValue('permissions', values)}
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
            loading={mutateForm.isLoading}
            className={classes.actionBtn}
            size="large"
            variant="contained"
            color="primary"
            onClick={onEdit}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Box>
    </Drawer>
  );
};
