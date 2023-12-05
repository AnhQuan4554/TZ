import { PERMISSION_SET } from '@tymlez/common-libs';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import * as React from 'react';
import Analytics from './icons/analytics';
import HomeIcon from './icons/home';
import TrustChainIcon from './icons/TrustChainIcon';

export const SideBarItems = () =>
  [
    {
      path: '/',
      tabName: 'Home',
      icon: (color: any) => <HomeIcon fontSize="small" style={{ color }} />,
      permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
      isAbsolute: true,
    },
    document.location.href.includes('solarfarm')
      ? {
          path: '/analytics',
          tabName: 'Analytics',
          icon: (color: any) => (
            <Analytics fontSize="small" style={{ color }} />
          ),
          permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
          isAbsolute: true,
        }
      : undefined,
    {
      path: '/',
      tabName: 'TYMLEZ Trust Chain',
      icon: (color: any) => (
        <TrustChainIcon fontSize="small" style={{ color }} />
      ),
      permissions: PERMISSION_SET.CLIENT_TRUSTCHAIN_ACCESS,
    },
  ].filter(Boolean) as ISideBarItem[];
