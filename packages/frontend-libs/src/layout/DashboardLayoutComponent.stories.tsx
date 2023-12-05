import type { Meta, Story } from '@storybook/react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { DashboardLayout, DashboardLayoutProps } from './DashboardLayout';

const tabs = [
  {
    path: '/',
    tabName: 'Home',
    icon: <HomeIcon fontSize="small" />,
    activeIcon: <HomeIcon fontSize="small" style={{ color: '#92D050' }} />,
  },
  {
    path: '/trustchain',
    tabName: 'Trust Chain',
    icon: <PersonIcon fontSize="small" />,
    activeIcon: <PersonIcon fontSize="small" style={{ color: '#92D050' }} />,
  },
];

const title = 'DashBoard';

export default { title: 'Layout' } as Meta<DashboardLayoutProps>;

const LayoutTemplate: Story<DashboardLayoutProps> = (args) => <DashboardLayout {...args} />;

export const DashboardLayoutComponent = LayoutTemplate.bind({});
DashboardLayoutComponent.args = {
  tabs,
  title,
};
DashboardLayoutComponent.storyName = 'DashboardLayout';
