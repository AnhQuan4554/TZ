import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { AuthGuard, RolesGuard } from '@tymlez/frontend-libs';
import { DashboardSiteLayout } from '../layout/DashboardSiteLayout';

export const HomeAdmin: NextPage = () => {
  return (
    <Box
      sx={{ marginTop: 8, width: '100%' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" align="center" sx={{ marginTop: '90px' }}>
        Platform administration
      </Typography>
    </Box>
  );
};

HomeAdmin.getLayout = (page) => (
  <AuthGuard>
    <RolesGuard>
      <DashboardSiteLayout>{page}</DashboardSiteLayout>
    </RolesGuard>
  </AuthGuard>
);

export default HomeAdmin;
