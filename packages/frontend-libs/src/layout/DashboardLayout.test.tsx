import ReactDOM from 'react-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { DashboardLayout } from './DashboardLayout';

test('renders without crashing', () => {
  const div = document.createElement('div');
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
  ReactDOM.render(<DashboardLayout dataTestId="navbar" tabs={tabs} title={title} />, div);
});
