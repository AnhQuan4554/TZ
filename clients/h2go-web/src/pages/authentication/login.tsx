import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Card, Container, Typography } from '@mui/material';
import { GuestGuard } from '@tymlez/devias-material-kit/dist/components/authentication/guest-guard';
import { gtm } from '@tymlez/devias-material-kit/dist/lib/gtm';
import {
  FirebaseLogin,
  useAuth,
  TymlezLogo,
  BoxMainStyle,
  BoxCardStyle,
} from '@tymlez/frontend-libs';

const Login: NextPage = () => {
  const { platform } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
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
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in on the internal platform (
                <span data-test-id="version">
                  {process.env.NEXT_PUBLIC_GIT_SHA}
                </span>
                )
              </Typography>
            </BoxCardStyle>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === 'Firebase' && <FirebaseLogin />}
            </Box>
          </Card>
        </Container>
      </BoxMainStyle>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
