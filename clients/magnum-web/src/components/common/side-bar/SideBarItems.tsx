import * as React from 'react';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import HomeIcon from './icons/home';
import BioChar from './icons/biochar';
import IronOre from './icons/ironore';
import PigIron from './icons/pigiron';

export const SideBarItems: ISideBarItem[] = [
  {
    path: '/',
    tabName: 'Home',
    icon: <HomeIcon fill="#989898" />,
    activeIcon: <HomeIcon fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/biochar',
    tabName: 'Bio Char',
    icon: <BioChar fill="#989898" />,
    activeIcon: <BioChar fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/ironore',
    tabName: 'Iron Ore',
    icon: <IronOre fill="#989898" />,
    activeIcon: <IronOre fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/pigiron',
    tabName: 'Pig Iron',
    icon: <PigIron fill="#989898" />,
    activeIcon: <PigIron fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
];
