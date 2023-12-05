import type { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import TaskIcon from '@mui/icons-material/Task';
import WorkIcon from '@mui/icons-material/Work';
import HouseIcon from '@mui/icons-material/House';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PlaceIcon from '@mui/icons-material/Place';
import MonitorIcon from '@mui/icons-material/Monitor';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { DashboardLayout } from '@tymlez/frontend-libs';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardSiteLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;

  const tabs: ISideBarItem[] = [
    {
      path: '/client',
      tabName: 'Client Information',
      icon: (color: any) => <PersonIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/users-management',
      tabName: 'User Management',
      icon: (color: any) => (
        <ManageAccountsIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.USER_MANAGEMENT,
    },
    {
      path: '/permissions',
      tabName: 'User Permissions',
      icon: (color: any) => (
        <AccessibilityIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.USER_MANAGEMENT,
    },
    {
      path: '/guardian',
      tabName: 'Guardian',
      icon: (color: any) => (
        <WorkspacesIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.GUARDIAN_MANAGEMENT,
    },
    {
      path: '/sites',
      tabName: 'Sites',
      icon: (color: any) => <PlaceIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/meters',
      tabName: 'Meters',
      icon: (color: any) => <GasMeterIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/tenancies',
      tabName: 'Tenancy',
      icon: (color: any) => <HouseIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/meter-jobs',
      tabName: 'Meter Jobs',
      icon: (color: any) => <WorkIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/meter-tasks',
      tabName: 'Meter Tasks',
      icon: (color: any) => <TaskIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/data-flows',
      tabName: 'Data Flows (Beta)',
      icon: (color: any) => <WorkIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/data-tasks',
      tabName: 'Data Tasks (Beta)',
      icon: (color: any) => <TaskIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/meter-data',
      tabName: 'Meter Data',
      icon: (color: any) => (
        <DescriptionIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
    {
      path: '/mrv',
      tabName: 'Mrv',
      icon: (color: any) => (
        <SettingsApplicationsIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.DATA_MANAGEMENT,
    },
    {
      path: '/queue',
      tabName: 'Bull Management',
      icon: (color: any) => <MonitorIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },

    {
      path: '/settings',
      tabName: 'Settings',
      icon: (color: any) => <SettingsIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },

    {
      path: '/import-export',
      tabName: 'Import & Export Data',
      icon: (color: any) => (
        <ImportExportIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
    },
  ];

  return (
    <DashboardLayout
      dataTestId="admin-dashboard-navbar"
      tabs={tabs}
      title="System Admin"
      openSidebar
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: '32px',
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
            margin: '0px',
          }}
        >
          {children}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};
