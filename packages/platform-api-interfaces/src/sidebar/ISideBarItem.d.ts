import type { ReactNode } from 'react';

export interface ISideBarItem {
  path: string;
  tabName: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  permissions: string[];
  isAbsolute?: boolean;
}
