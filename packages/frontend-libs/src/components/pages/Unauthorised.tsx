import type { FC } from 'react';
import NextLink from 'next/link';
import { Button, Container, Typography } from '@mui/material';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';
import { StyledBackButtonBox, StyledUnauthorisedBox } from './styled-components';

export const Unauthorised: FC = () => {
  const isSmallScreen = useBreakpoint('sm', 'down');

  return (
    <StyledUnauthorisedBox component="main">
      <Container maxWidth="lg">
        <Typography align="center" variant={isSmallScreen ? 'h4' : 'h1'}>
          401: Authorization required
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="subtitle2">
          You have not logged in or your session is expired. Please try log in again.
        </Typography>

        <StyledBackButtonBox>
          <NextLink href="/authentication/login" passHref>
            <Button component="a" variant="outlined">
              Login
            </Button>
          </NextLink>
        </StyledBackButtonBox>
      </Container>
    </StyledUnauthorisedBox>
  );
};
