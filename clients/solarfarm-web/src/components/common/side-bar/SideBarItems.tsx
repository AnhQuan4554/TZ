import { PERMISSION_SET } from '@tymlez/common-libs';
import type { ISideBarItem } from '@tymlez/platform-api-interfaces';
import HomeIcon from './icons/home';
import Device from './icons/device';
import TrustChainIcon from './icons/trustChainIcon';

export const SideBarItems: ISideBarItem[] = [
  {
    path: '/',
    tabName: 'Home',
    icon: <HomeIcon fill="#989898" />,
    activeIcon: <HomeIcon fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/analytics',
    tabName: 'Analytics',
    icon: <Device fill="#989898" />,
    activeIcon: <Device fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_DASHBOARD_ACCESS,
  },
  {
    path: '/trustchain',
    tabName: 'Trust Chain',
    icon: <TrustChainIcon fill="#989898" />,
    activeIcon: <TrustChainIcon fill="#92D050" />,
    permissions: PERMISSION_SET.CLIENT_TRUSTCHAIN_ACCESS,
  },
];
