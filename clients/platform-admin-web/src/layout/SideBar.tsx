import {
  List,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Tooltip,
  ListItemText,
} from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';
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
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { useAuth } from '@tymlez/frontend-libs';

interface SideBarProps {
  open?: boolean;
}

const sideBarItems: ISideBarItem[] = [
  {
    path: '/client',
    tabName: 'Client Information',
    icon: <PersonIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/users-management',
    tabName: 'User Management',
    icon: <ManageAccountsIcon fontSize="small" />,
    permissions: PERMISSION_SET.USER_MANAGEMENT,
  },
  {
    path: '/permissions',
    tabName: 'User Permissions',
    icon: <AccessibilityIcon fontSize="small" />,
    permissions: PERMISSION_SET.USER_MANAGEMENT,
  },
  {
    path: '/guardian',
    tabName: 'Guardian',
    icon: <WorkspacesIcon fontSize="small" />,
    permissions: PERMISSION_SET.GUARDIAN_MANAGEMENT,
  },
  {
    path: '/sites',
    tabName: 'Sites',
    icon: <PlaceIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/meters',
    tabName: 'Meters',
    icon: <GasMeterIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/tenancies',
    tabName: 'Tenancy',
    icon: <HouseIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/meter-jobs',
    tabName: 'Meter Jobs',
    icon: <WorkIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/meter-tasks',
    tabName: 'Meter Tasks',
    icon: <TaskIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/data-flows',
    tabName: 'Data Flows (Beta)',
    icon: <WorkIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/data-tasks',
    tabName: 'Data Tasks (Beta)',
    icon: <TaskIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/meter-data',
    tabName: 'Meter Data',
    icon: <DescriptionIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
  {
    path: '/mrv',
    tabName: 'Mrv',
    icon: <SettingsApplicationsIcon fontSize="small" />,
    permissions: PERMISSION_SET.DATA_MANAGEMENT,
  },
  {
    path: '/queue',
    tabName: 'Bull Management',
    icon: <MonitorIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },

  {
    path: '/settings',
    tabName: 'Settings',
    icon: <SettingsIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },

  {
    path: '/import-export',
    tabName: 'Import & Export Data',
    icon: <ImportExportIcon fontSize="small" />,
    permissions: PERMISSION_SET.CONFIG_MANAGEMENT,
  },
];

export const SideBar: React.FC<SideBarProps> = ({ open }) => {
  const router = useRouter();
  const tab = router.pathname.includes('guardian')
    ? sideBarItems.find((x) => x.path.includes('guardian'))
    : sideBarItems.find((x) => x.path === router.pathname);
  const { user } = useAuth();

  const itemsWithPermission = sideBarItems.filter((item) =>
    item.permissions.some((permission) =>
      user?.permissions?.includes(permission),
    ),
  );
  return (
    <List>
      {itemsWithPermission.map((item) => (
        <ListItem
          key={item.tabName}
          disablePadding
          sx={{
            display: 'block',
            '&:hover': {
              backgroundColor: 'rgba(146, 208, 80, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: '#dcedc8',
            },
          }}
          onClick={() => {
            router.push(item.path);
          }}
          selected={tab?.tabName === item.tabName}
        >
          <Tooltip title={item.tabName} enterDelay={open ? 60000 : 0}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.tabName}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};
