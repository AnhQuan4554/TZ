import type { FC } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { Button, Container, Typography, Stack } from '@mui/material';
import { useAuth } from '../../contexts/FirebaseContext';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';
import { StyledBackButtonBox, StyledForbiddenBox } from './styled-components';

export const Forbidden: FC = () => {
  const isSmallScreen = useBreakpoint('sm', 'down');

  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
    router.push('/authentication/login');
  };

  return (
    <StyledForbiddenBox component="main">
      <Container maxWidth="lg">
        <Typography align="center" color="textPrimary" variant={isSmallScreen ? 'h4' : 'h1'}>
          403: Forbidden
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="subtitle2">
          You either tried some shady route or you came here by mistake. Whichever it is, try using
          the navigation.
        </Typography>

        <StyledBackButtonBox>
          <Stack direction="row">
            <Link href="/">
              <Button color="primary" component="a" variant="outlined">
                Back to Home
              </Button>
            </Link>
            <Button
              color="primary"
              component="button"
              variant="outlined"
              sx={{ ml: 3 }}
              onClick={handleLogout}
            >
              Login with diffrent account
            </Button>
          </Stack>
        </StyledBackButtonBox>
      </Container>
    </StyledForbiddenBox>
  );
};

export default Forbidden;
