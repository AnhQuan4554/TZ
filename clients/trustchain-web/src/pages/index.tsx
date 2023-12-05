import type { NextPage } from 'next';
import { Box } from '@mui/material';
import { AuthGuard } from '@tymlez/frontend-libs';
import { MainLayout } from '../layout/Main';
import { CoverPage } from '../components/cover-page';

// or
export const TrustChainHome: NextPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CoverPage />
    </Box>
  );
};

TrustChainHome.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>{page}</MainLayout>
  </AuthGuard>
);
export default TrustChainHome;
