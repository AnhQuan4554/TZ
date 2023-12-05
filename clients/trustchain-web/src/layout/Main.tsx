/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactNode, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { DashboardLayout, RolesGuard } from '@tymlez/frontend-libs';
import { PERMISSIONS } from '@tymlez/common-libs';
import { SideBarItems } from '../components/common/side-bar/SideBarItems';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;
  const memorizedItems = useMemo(() => SideBarItems(), []);

  const title = 'Dashboard';

  return (
    <RolesGuard
      permissions={[
        PERMISSIONS.ALL_RESOURCE_READ,
        PERMISSIONS.TRUSTCHAIN_READ,
        PERMISSIONS.ALL_RESOURCE_WRITE,
      ]}
    >
      <DashboardLayout
        dataTestId="trustchain-dashboard-navbar"
        tabs={memorizedItems}
        title={title}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
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
              margin: 'auto',
              maxWidth: '1440px',
            }}
          >
            {children}
          </Grid>
        </Box>
      </DashboardLayout>
    </RolesGuard>
  );
};
