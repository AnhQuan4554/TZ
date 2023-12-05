import type { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';
import { DashboardLayout } from '@tymlez/frontend-libs';
import HomeIcon from '@mui/icons-material/Home';
import BioChar from '../components/common/side-bar/icons/biochar';
import IronOre from '../components/common/side-bar/icons/ironore';
import PigIron from '../components/common/side-bar/icons/pigiron';

interface DashboardSiteLayoutProps {
  title?: string;
  children?: ReactNode;
}

export const DashboardSiteLayout: FC<DashboardSiteLayoutProps> = (props) => {
  const { children, title } = props;
  const tabs = [
    {
      path: '/',
      tabName: 'Home',
      icon: (color: any) => <HomeIcon fontSize="small" style={{ color }} />,
    },
    {
      path: '/biochar',
      tabName: 'Bio Char',
      icon: (color: any) => <BioChar fontSize="small" style={{ color }} />,
    },
    {
      path: '/ironore',
      tabName: 'Iron Ore',
      icon: (color: any) => <IronOre fontSize="small" style={{ color }} />,
    },
    {
      path: '/pigiron',
      tabName: 'Pig Iron',
      icon: (color: any) => <PigIron fontSize="small" style={{ color }} />,
    },
  ];

  return (
    <DashboardLayout
      dataTestId="magnum-dashboard-navbar"
      title={title || ''}
      tabs={tabs}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 4,
          maxWidth: '1440px',
          margin: 'auto',
        }}
      >
        <Grid container>
          <Grid item md={12} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};
