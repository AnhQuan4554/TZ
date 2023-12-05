import type { FC } from 'react';
import { AppBar, Box, IconButton, Toolbar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { Menu as MenuIcon } from '@tymlez/devias-material-kit/dist/icons/menu';
import { Image, AccountButton } from '@tymlez/frontend-libs';
import logo from '../../public/logo/logo_white.png';

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
        backgroundColor: '#92d050',
      }
    : {
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'space-between',
            display: {
              lg: 'inline-flex',
              xs: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: 150,
            }}
          >
            <Link href="/">
              <Image src={logo} />
            </Link>
          </Box>

          {/* <Box
            sx={{
              width: 80,
              p: 1,
            }}
          >
            <Image src={clientLogo} />
          </Box> */}
        </Box>
        <IconButton
          onClick={onOpenSidebar}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none',
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <AccountButton />
      </Toolbar>
    </DashboardNavbarRoot>
  );
};
