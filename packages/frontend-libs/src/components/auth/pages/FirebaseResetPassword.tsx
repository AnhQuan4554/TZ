import { Box, Button, Card, Container, FormHelperText, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { FC, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { LinkStyle } from './styles/LinkStyle';
import { useFirebase } from '../../../hooks/use-firebase';
import { TymlezLogo } from '../../logo';
import { BoxMainStyle, BoxCardStyle } from './styles/LoginStyle';

export const FirebaseResetPassword: FC = () => {
  const [passwordInitiated, setPasswordInitiated] = useState<boolean>(false);

  const { auth } = useFirebase();
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        if (values.email) {
          await handleSendPasswordResetEmail();
        }
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleSendPasswordResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, formik.values.email, {
        url: `${window.location.origin}/authentication/login`,
      });
      setPasswordInitiated(true);
    } catch (err: any) {
      setPasswordInitiated(false);
      switch ((err as FirebaseError).code) {
        case 'auth/user-not-found':
          formik.setErrors({ submit: 'Cannot find a user with the email' });
          break;
        case 'auth/invalid-email':
          formik.setErrors({ submit: 'The email is invalid' });
          break;
        default:
          formik.setErrors({ submit: `Error: ${err.message}` });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <BoxMainStyle>
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <BoxCardStyle>
              <NextLink href="/" passHref>
                <a>
                  <TymlezLogo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </a>
              </NextLink>
              {passwordInitiated ? (
                <>
                  <Typography variant="h4">Password reset initiated</Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 3, textAlign: 'center' }}
                    variant="body2"
                  >
                    You should receive an email shortly with instructions on how to reset your
                    password.
                  </Typography>
                  <Button
                    href="/authentication/login/"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ mt: 5 }}
                  >
                    Back to sign in
                  </Button>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 3, textAlign: 'center' }}
                    variant="body2"
                  >
                    Haven&apos;t received the email? Please check your spam folder.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4">Reset password</Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 3, textAlign: 'center' }}
                    variant="body2"
                  >
                    Enter the email you use to login and we&apos;ll send you a link to get you back
                    into your account
                  </Typography>
                  <Box
                    sx={{
                      width: 1,
                      mt: 3,
                    }}
                  >
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <TextField
                        sx={{ mb: 3 }}
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

                      {formik.errors.submit && (
                        <Box sx={{ mt: 3 }}>
                          <FormHelperText error>{formik.errors.submit}</FormHelperText>
                        </Box>
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Button
                          disabled={formik.isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Send link
                        </Button>
                      </Box>
                    </form>
                  </Box>
                  <LinkStyle>
                    <NextLink href="/authentication/login" passHref>
                      Back to sign in
                    </NextLink>
                  </LinkStyle>
                </>
              )}
            </BoxCardStyle>
          </Card>
        </Container>
      </BoxMainStyle>
    </>
  );
};
