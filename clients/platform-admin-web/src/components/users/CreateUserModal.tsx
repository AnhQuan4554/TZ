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
import type { IUser } from '@tymlez/platform-api-interfaces';
import { LoadingButton } from '@mui/lab';
import React, { FC, useEffect } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRoleList } from 'src/api/useRoleList';
import { CreatableMultiSelect } from '../CreatableMultiSelect';
import { useForm } from '../../api/usePostForm';
import { commonStyle } from '../../styles/CommonStyle';

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialValues = {
  email: '',
  roles: [],
  password: '',
  confirmPassword: '',
  name: '',
  timeout: 60,
  submit: null,
};

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  roles: Yup.array().of(Yup.string()).required('Roles are required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  name: Yup.string().required('Name is required'),
});

export const CreateUserModal: FC<Props> = (props) => {
  const classes = commonStyle();
  const { open, onClose } = props;

  const mutateForm = useForm<IUser>('user');
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
              toast.success('User created');
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
        <Typography className={classes.dialogButton}>Create User</Typography>
        <DialogContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex' }}>
              <Typography>Email Address </Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              placeholder="Enter Email"
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
            />
            <Box sx={{ display: 'flex' }}>
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
            />
            <Box sx={{ display: 'flex' }}>
              <Typography>Role</Typography>
              <Typography sx={{ color: '#CF372C', marginBottom: 2 }}>
                *
              </Typography>
            </Box>
            {defaultRoles && (
              <CreatableMultiSelect
                values={formik.values.roles}
                options={defaultRoles}
                onChange={(values) => formik.setFieldValue('roles', values)}
                error={formik.touched.roles ? formik.errors.roles : undefined}
              />
            )}
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Password</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              inputProps={{ readOnly: true }}
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              placeholder="Enter Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onFocus={(e) => {
                e.target.readOnly = false;
              }}
              type="password"
              value={formik.values.password}
            />
            <Box sx={{ display: 'flex', marginTop: 1 }}>
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
              placeholder="Enter Password again"
              margin="normal"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onFocus={(e) => {
                e.target.readOnly = false;
              }}
              type="password"
              value={formik.values.confirmPassword}
            />
            <Box sx={{ display: 'flex', marginTop: 2 }}>
              <Typography>Timeout (minutes)</Typography>
              <Typography sx={{ color: '#CF372C' }}>*</Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.timeout && formik.errors.timeout)}
              fullWidth
              helperText={formik.touched.timeout && formik.errors.timeout}
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
