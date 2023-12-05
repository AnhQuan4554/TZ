import { makeStyles } from '@mui/styles';
import { Box, Toolbar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const StyledDashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {},
}));

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  top: '65px',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const StyledDrawerPaper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {},
}));

export const StyledToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: 92,
  left: 0,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export const StyledNavbarBox = styled(Box)(() => ({
  flexGrow: 1,
  justifyContent: 'space-between',
  display: 'contents',
}));

export const StyledLogoBox = styled(Box)(({ theme }) => ({
  marginLeft: '-30px',
  marginRight: theme.spacing(3),
}));

export const StyledNavbarTitle = styled('h5')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '24px',
}));

export const layoutStyle = makeStyles({
  sidebarOpen: {
    display: 'block',
    '&:hover': {
      backgroundColor: 'rgba(146, 208, 80, 0.08)',
    },
    '&.Mui-selected': {
      backgroundColor: '#dcedc8',
    },
  },
  sidebarClose: {
    display: 'flex',
    width: '48px',
    height: '48px',
    padding: '12px',
    borderRadius: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 8.5px 16px 8.5px',

    '& > div:hover': {
      background: 'unset !important',
    },
    '&:hover': {
      backgroundColor: 'rgba(146, 208, 80, 0.2)',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(146, 208, 80, 0.5)',
    },
  },
});
