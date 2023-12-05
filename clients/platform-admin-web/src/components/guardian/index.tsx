import React, { FC, ReactNode } from 'react';
import DevicesIcon from '@mui/icons-material/Devices';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import OverviewIcon from '@mui/icons-material/Summarize';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';
import TokenIcon from '@mui/icons-material/Token';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PolicyIcon from '@mui/icons-material/Policy';
import { Box, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';

interface GuardianLayoutsProps {
  children?: ReactNode;
}
export const GuardianLayout: FC<GuardianLayoutsProps> = (props) => {
  const router = useRouter();

  const tabList = [
    {
      id: 0,
      tabName: 'Overview',
      icon: <OverviewIcon fontSize="small" />,
      path: '/guardian',
    },
    {
      id: 1,
      tabName: 'Root Authority',
      icon: <AccountBoxIcon fontSize="small" />,
      path: '/guardian/root-authority',
    },
    {
      id: 2,
      tabName: 'Token Owner',
      icon: <TokenIcon fontSize="small" />,
      path: '/guardian/token-owner',
    },
    {
      id: 3,
      tabName: 'Project',
      icon: <WysiwygIcon fontSize="small" />,
      path: '/guardian/project',
    },
    {
      id: 4,
      tabName: 'Site',
      icon: <PlaceIcon fontSize="small" />,
      path: '/guardian/site',
    },
    {
      id: 5,
      tabName: 'Installer',
      icon: <GroupIcon fontSize="small" />,
      path: '/guardian/installer',
    },
    {
      id: 6,
      tabName: 'Device',
      icon: <DevicesIcon fontSize="small" />,
      path: '/guardian/device',
    },
    {
      id: 7,
      tabName: 'Policy',
      icon: <PolicyIcon fontSize="small" />,
      path: '/guardian/policy',
    },
  ];

  const handleChange = (newValue: number) => {
    router.push(tabList[newValue].path);
  };
  const tab = tabList.findIndex((x) => x.path === router.pathname);
  const { children } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab}>
          {tabList.map((item) => {
            return (
              <Tab
                key={item.id}
                icon={item.icon}
                iconPosition="start"
                label={item.tabName}
                value={item.id}
                onClick={() => handleChange(item.id)}
              />
            );
          })}
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
};
