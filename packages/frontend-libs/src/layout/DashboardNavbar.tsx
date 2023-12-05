import { AppBar, AppBarProps, Box, Drawer, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountButton } from '../components/auth/AccountButton';
import { SideBar } from './SideBar';
import { TLogo } from '../components/logo';
import {
  StyledLogoBox,
  StyledNavbarBox,
  StyledNavbarTitle,
  StyledToolbarStyle,
} from './styled-components';
import { useBreakpoint } from '../hooks/media/useBreakpointsQuery';
import { DialogTimeZone } from '../components/auth/DialogTimeZone';

interface DashboardNavbarProps extends AppBarProps {
  dataTestId: string;
  data: any;
  title: string;
  onOpenSidebar?: () => void;
}
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: 'none',
        backgroundColor: '#ffffff',
      }
    : {
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

type Anchor = 'left';

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const isSmallScreen = useBreakpoint('sm', 'down');
  const { data, title, onOpenSidebar, dataTestId, ...others } = props;

  const [openToggleDrawer, setOpenToggleDrawer] = useState(false);
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      setOpenToggleDrawer(open);
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid sx={{ mt: 11 }}>
        <SideBar data={data} open={openToggleDrawer} />
      </Grid>
    </Box>
  );
  return (
    <DashboardNavbarRoot {...others}>
      {(['left'] as const).map((anchor) => (
        <StyledToolbarStyle key={anchor} disableGutters>
          {!isSmallScreen ? (
            <StyledNavbarBox>
              <StyledLogoBox>
                <TLogo />
              </StyledLogoBox>
              <Box>
                <StyledNavbarTitle data-test-id={dataTestId}>{title}</StyledNavbarTitle>
              </Box>
            </StyledNavbarBox>
          ) : (
            <MenuIcon sx={{ color: '#989898' }} onClick={toggleDrawer(anchor, !openToggleDrawer)} />
          )}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 1 }} />
          <DialogTimeZone />
          <AccountButton />
        </StyledToolbarStyle>
      ))}
    </DashboardNavbarRoot>
  );
};
