import type { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';
import { DashboardLayout } from '@tymlez/frontend-libs';
import HomeIcon from '@mui/icons-material/Home';
import TrustChainIcon from '../components/common/side-bar/icons/trustChainIcon';
import Device from '../components/common/side-bar/icons/device';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardSiteLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const tabs = [
    {
      path: '/',
      tabName: 'Home',
      icon: (color: any) => <HomeIcon fontSize="small" style={{ color }} />,
    },
    {
      path: '/analytics',
      tabName: 'Analytics',
      icon: (color: any) => <Device fontSize="small" style={{ color }} />,
    },
    {
      path: '/trustchain',
      tabName: 'Trust Chain',
      icon: (color: any) => (
        <TrustChainIcon fontSize="small" style={{ color }} />
      ),
    },
  ];

  return (
    <DashboardLayout
      dataTestId="solarfarm-dashboard-navbar"
      title="Dashboard"
      tabs={tabs}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          maxWidth: '1440px',
          margin: 'auto',
          marginTop: '32px',
          p: {
            xs: 0,
            sm: 2,
          },
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            minWidth: 'lg',
            width: '100%',
            margin: '0px',
            p: 1,
          }}
        >
          {children}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};
