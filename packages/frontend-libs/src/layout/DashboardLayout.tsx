import { Grid } from '@mui/material';
import type { FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import type { Shadows } from '@mui/material/styles/shadows';
import { DashboardNavbar } from './DashboardNavbar';
import { SideBar } from './SideBar';
import { StyledDashboardLayoutRoot, StyledDrawer } from './styled-components';

export interface DashboardLayoutProps {
  dataTestId: string;
  title: string;
  tabs: any;
  openSidebar?: boolean;
}

const drawStyles = makeStyles({
  StyledDrawerPaper: {
    marginTop: '92px',
    borderRight: 'none !important',
  },
  childrenComponentWrap: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
  },
});

export const mainTheme = createTheme({
  typography: {
    allVariants: { fontFamily: `'Lato', sans-serif` },
    fontFamily: `'Lato', sans-serif`,
    h6: {
      fontWeight: 600,
    },
  },
  shadows: ['none', ...Array(24).fill('rgb(100 116 139 / 12%) 0px 6px 15px')] as Shadows,
  palette: {
    primary: {
      main: '#75A640',
      light: '#92d050',
    },
    text: {
      primary: '#293343',
      secondary: '#5C6A82',
    },
    background: {
      default: '#E5E5E5',
    },
  },
});

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  dataTestId,
  tabs,
  title,
  children,
  openSidebar = false,
}) => {
  const classes = drawStyles();
  return (
    <StyledDashboardLayoutRoot>
      <ThemeProvider theme={mainTheme}>
        <StyledDrawer
          sx={{
            display: {
              xs: 'none',
              sm: 'unset',
            },
          }}
          variant="permanent"
          open={openSidebar}
          classes={{
            paper: classes.StyledDrawerPaper,
          }}
        >
          <SideBar data={tabs} open={openSidebar} />
        </StyledDrawer>

        <Grid container className={classes.childrenComponentWrap}>
          {children}
        </Grid>
        <DashboardNavbar dataTestId={dataTestId} data={tabs} title={title} />
      </ThemeProvider>
    </StyledDashboardLayoutRoot>
  );
};
