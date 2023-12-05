import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, TextField, Divider, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useMounted } from '@tymlez/devias-material-kit/dist/hooks/use-mounted';
import { Toaster } from 'react-hot-toast';
import NextLink from 'next/link';
import { LinkStyle } from './pages/styles/LinkStyle';
import { useAuth } from '../../contexts';
import MicrosoftLogo from './MicrosoftLogo';
import { useFirebase } from '../../hooks/use-firebase';
import { StyledDefaultAccountDiv } from './styled-components';

interface ILoginFormProps {
  enabledMicrosoftLogin?: boolean;
  enabledDefaultAccount?: boolean;
  defaultAccount?: string;
  defaultPassword?: string;
}

export const FirebaseLogin: FC<ILoginFormProps> = (props: ILoginFormProps) => {
  const {
    enabledMicrosoftLogin = true,
    enabledDefaultAccount = false,
    defaultAccount = 'demo@tymlez.com',
    defaultPassword = 'Password123!',
  } = props;

  const isMounted = useMounted();
  const router = useRouter();
  const { signInWithEmailAndPassword, signInWithMicrosoft, isAuthenticated, user } = useAuth();
  const { auth } = useFirebase();
  const formik = useFormik({
    initialValues: {
      email: enabledDefaultAccount ? defaultAccount : process.env.NEXT_PUBLIC_LOGIN_EMAIL,
      password: enabledDefaultAccount ? defaultPassword : process.env.NEXT_PUBLIC_LOGIN_PASSWORD,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        if (values.email && values.password) {
          await signInWithEmailAndPassword(values.email, values.password);
        }
      } catch (err: any) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleMicrosoftLogin = async () => {
    formik.setSubmitting(true);
    try {
      await signInWithMicrosoft();
    } catch (err: any) {
      formik.setStatus({ success: false });
      formik.setErrors({ submit: err.message });
      formik.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      isMounted() &&
      isAuthenticated &&
      (user?.emailVerified || user?.provider === 'microsoft.com')
    ) {
      const returnUrl = (router.query.returnUrl as string) || '/';
      router.push(returnUrl);
    }

    if (user && user.emailVerified === false && user.provider === 'password') {
      router.push('email-verification');
    }
  }, [isAuthenticated, router, isMounted, user, auth]);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Toaster position="top-center" />
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email Address"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2, mb: 5 }}>
        <Button
          name="btnLogin"
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Log In
        </Button>
      </Box>

      {enabledDefaultAccount && (
        <StyledDefaultAccountDiv>
          <ErrorOutlineIcon sx={{ color: 'rgb(100 182 247)', transform: 'rotate(180deg)' }} />
          <Typography sx={{ marginLeft: '8px', fontSize: '14px' }}>
            You can use <b>{defaultAccount}</b> and password <b>{defaultPassword}</b>
          </Typography>
        </StyledDefaultAccountDiv>
      )}

      {enabledMicrosoftLogin && (
        <>
          <Divider>OR</Divider>
          <Box sx={{ mt: 5 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleMicrosoftLogin}
              disabled={formik.isSubmitting}
              startIcon={<MicrosoftLogo />}
            >
              Login with Microsoft
            </Button>
          </Box>
        </>
      )}

      <LinkStyle>
        <NextLink href="/authentication/forgot-password/" passHref>
          Forgot password?
        </NextLink>
      </LinkStyle>
    </form>
  );
};
