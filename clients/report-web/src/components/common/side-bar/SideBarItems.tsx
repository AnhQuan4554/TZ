import * as React from 'react';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import HomeIcon from './icons/home';
import TrustChainIcon from './icons/trustChainIcon';
import ReportIcon from './icons/report';

export const SideBarItems: ISideBarItem[] = [
  {
    path: '/',
    tabName: 'Home',
    icon: (color: any) => <HomeIcon fontSize="small" style={{ color }} />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/trustchain',
    tabName: 'Trust Chain',
    icon: (color: any) => <TrustChainIcon fontSize="small" style={{ color }} />,
    permissions: PERMISSION_SET.CLIENT_TRUSTCHAIN_ACCESS,
  },
  {
    path: '/report',
    tabName: 'Report',
    icon: (color: any) => <ReportIcon fontSize="small" style={{ color }} />,
    permissions: PERMISSION_SET.AUDIT_ACCESS,
  },
];
