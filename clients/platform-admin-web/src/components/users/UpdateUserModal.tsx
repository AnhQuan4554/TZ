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
import type { IUser } from '@tymlez/platform-api-interfaces';
import { useFormik } from 'formik';
import React, { FC, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useRoleList } from 'src/api/useRoleList';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { useForm } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUser;
};

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  roles: Yup.array().of(Yup.string()).required('Roles are required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255),
  confirmPassword: Yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  }),
  name: Yup.string().required('Name is required'),
});

export const UpdateUserModal: FC<Props> = (props) => {
  const { user, open, onClose } = props;

  const initialValues = useMemo(
    () => ({
      ...user,
      password: '',
      confirmPassword: '',
      submit: null,
    }),
    [user],
  );
  const classes = commonStyle();
  const mutateForm = useForm<IUser>('user', 'PUT', user?.id);
  const defaultRoles = useRoleList().data?.map((x) => {
    return { value: x.name, label: x.name };
  });

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
              toast.success('User updated');
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
    if (user) {
      fSetValues(initialValues);
    }
  }, [user, open, initialValues, fSetValues]);

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
        User {user?.id}
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex' }}>
            <Typography>Email Address </Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            autoFocus
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            sx={{ marginTop: 3 }}
          />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Typography>Name</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            placeholder="Enter Name"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="name"
            value={formik.values.name}
            sx={{ marginTop: 3 }}
          />
          {defaultRoles && (
            <CreatableMultiSelect
              label="Roles"
              values={formik.values.roles}
              options={defaultRoles}
              onChange={(values) => formik.setFieldValue('roles', values)}
              error={formik.touched.roles ? formik.errors.roles : undefined}
            />
          )}
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Typography>Password</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            inputProps={{ readOnly: true }}
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            placeholder="Enter Password"
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onFocus={(e) => {
              e.target.readOnly = false;
            }}
            type="password"
            value={formik.values.password}
            sx={{ marginTop: 3 }}
          />
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Typography>Confirm Password</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            inputProps={{ readOnly: true }}
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword,
            )}
            fullWidth
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            placeholder="Confirm Password"
            margin="normal"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onFocus={(e) => {
              e.target.readOnly = false;
            }}
            type="password"
            value={formik.values.confirmPassword}
            sx={{ marginTop: 3 }}
          />
          <Box sx={{ display: 'flex', mt: 3 }}>
            <Typography>Timeout (minutes)</Typography>
            <Typography sx={{ color: '#CF372C' }}>*</Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.timeout && formik.errors.timeout)}
            fullWidth
            helperText={formik.touched.timeout && formik.errors.timeout}
            placeholder="Timeout (minutes)"
            margin="normal"
            name="timeout"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.timeout}
            sx={{ marginTop: 3 }}
          />
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
