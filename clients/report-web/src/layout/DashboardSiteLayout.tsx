import type { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { DashboardLayout } from '@tymlez/frontend-libs';
import { SideBarItems } from '../components/common/side-bar/SideBarItems';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardSiteLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;

  const tabs: ISideBarItem[] = SideBarItems;

  return (
    <DashboardLayout
      dataTestId="report-dashboard-navbar"
      title="Reports"
      tabs={tabs}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 4,
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
            m: 0,
            p: 1,
          }}
        >
          {children}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};
