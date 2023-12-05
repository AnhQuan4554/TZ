import type { FC } from 'react';
import Link from 'next/link';
import { Button, Container, Typography } from '@mui/material';
import { useBreakpoint } from '../../hooks/media/useBreakpointsQuery';
import { StyledBackButtonBox, StyledNotFoundBox } from './styled-components';

export const NotFound: FC = () => {
  const isSmallScreen = useBreakpoint('sm', 'down');

  return (
    <StyledNotFoundBox component="main">
      <Container maxWidth="lg">
        <Typography align="center" variant={isSmallScreen ? 'h4' : 'h1'}>
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="subtitle2">
          You either tried some shady route or you came here by mistake. Whichever it is, try using
          the navigation.
        </Typography>

        <StyledBackButtonBox>
          <Link href="/" passHref>
            <Button component="a" variant="outlined">
              Back to Dashboard
            </Button>
          </Link>
        </StyledBackButtonBox>
      </Container>
    </StyledNotFoundBox>
  );
};

export default NotFound;
