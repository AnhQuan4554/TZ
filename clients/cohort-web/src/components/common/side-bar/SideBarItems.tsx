import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs/dist';
import TrustChainIcon from './icons/TrustChainIcon';

export const SideBarItems: ISideBarItem[] = [
  {
    path: '/',
    tabName: 'Home',
    icon: <HomeIcon fontSize="small" />,
    activeIcon: <HomeIcon fontSize="small" style={{ color: '#92D050' }} />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/trustchain',
    tabName: 'Trust Chain',
    icon: <TrustChainIcon fontSize="small" />,
    activeIcon: (
      <TrustChainIcon fontSize="small" style={{ color: '#92D050' }} />
    ),
    permissions: PERMISSION_SET.CLIENT_TRUSTCHAIN_ACCESS,
  },
];
