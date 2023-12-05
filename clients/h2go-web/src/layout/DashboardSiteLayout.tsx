import type { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';
import { DashboardLayout } from '@tymlez/frontend-libs';
import TrustChainIcon from 'src/components/common/side-bar/icons/TrustChainIcon';
import HomeIcon from '@mui/icons-material/Home';

interface DashboardSiteLayoutProps {
  children?: ReactNode;
}

export const DashboardSiteLayout: FC<DashboardSiteLayoutProps> = (props) => {
  const { children } = props;
  const tabs = [
    {
      path: '/',
      tabName: 'Home',
      icon: (color: any) => <HomeIcon fontSize="small" style={{ color }} />,
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
      dataTestId="h2go-dashboard-navbar"
      title="Dashboard for Green Hydrogen"
      tabs={tabs}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 4,
          p: {
            xs: 0,
            sm: 3,
          },
        }}
      >
        <Grid
          container
          spacing={5}
          style={{
            minWidth: 'lg',
            width: '100%',
            maxWidth: '1440px',
            margin: 'auto',
          }}
        >
          {children}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};
