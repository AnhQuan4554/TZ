import { FC, useState, useEffect } from 'react';
import { Box, Card, Typography, Container, Button, Alert } from '@mui/material';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useFirebase } from '../../../hooks/use-firebase';

import { TymlezLogo } from '../../../components/logo';

const BoldTextBox = styled(Box)({
  display: 'inline',
  fontWeight: 'bold',
});

const FlexBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
});

const MainContainer = styled(FlexBox)({
  minHeight: '100vh',
  paddingTop: 50,
});
const StyledLogoBox = styled(Box)({
  marginBottom: 45,
});
const MainBox = styled(FlexBox)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  paddingBottom: 25,
  justifyContent: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({ marginTop: theme.spacing(3) }));
const StyledTypography = styled(Typography)(({ theme }) => ({ marginTop: theme.spacing(3) }));
const Heading = styled(Typography)({ marginTop: 5 });
interface IEmailVerificationProps {
  loginPath?: string;
}
export const EmailVerification: FC<IEmailVerificationProps> = ({ loginPath = 'login' }) => {
  const { auth } = useFirebase();
  const [error, setError] = useState('');
  const [sent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser, {
        url: window.location.href.replace('email-verification', 'login'),
      });
      auth.currentUser.emailSent = true;
      toast.success('Email sent successfully');
      setEmailSent(true);
    } catch (err: any) {
      setError('Unable to send the email pleae lease try again after 30 seconds');
    }
  };
  const signoutAndLoginHandle = async () => {
    await signOut(auth);
    router.push(loginPath);
  };

  useEffect(() => {
    if (auth && !auth.currentUser) {
      router.push(loginPath);
    }
    if (auth && auth.currentUser) {
      // check if email not sent, sent the email
      const isEmailSent = localStorage.getItem(auth.currentUser.uid);
      if (!isEmailSent) {
        sendEmailVerification(auth.currentUser, {
          url: window.location.href.replace('email-verification', 'login'),
        });
        localStorage.setItem(auth.currentUser.uid, 'sent');
      }
    }
  }, [auth, router, loginPath]);

  if (!auth || !auth.currentUser) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  return (
    <MainContainer component="main">
      <Toaster position="top-center" />
      <Container maxWidth="sm">
        <Card elevation={16} sx={{ p: 4, pb: 10 }}>
          <MainBox>
            <StyledLogoBox>
              <TymlezLogo />
            </StyledLogoBox>
            <Heading variant="h4">Please verify your email</Heading>
            <Typography color="textSecondary" sx={{ mt: 3 }} variant="body2">
              We sent an email to <BoldTextBox>{auth.currentUser?.email}</BoldTextBox> Check your
              inbox to activate your account.
            </Typography>
          </MainBox>
          {error && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <StyledButton
            fullWidth
            size="large"
            type="button"
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSendVerificationEmail}
          >
            Resend Email
          </StyledButton>
          {sent && (
            <>
              <StyledTypography>
                Haven&apos;t recieved the email?. Please check your spam folder.
              </StyledTypography>

              <StyledButton
                fullWidth
                size="large"
                type="button"
                variant="text"
                sx={{ mt: 3 }}
                onClick={signoutAndLoginHandle}
              >
                Sign In
              </StyledButton>
            </>
          )}
        </Card>
      </Container>
    </MainContainer>
  );
};
