import type { FC } from 'react';
import { AppBar, Box, Toolbar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { AccountButton, Image } from '@tymlez/frontend-libs';

import logo from '../../public/static/logo.png';

interface DashboardNavbarProps extends AppBarProps {
  pageTitle: string;
}

// const languages: { [key: string]: string } = {
//   en: '/static/icons/uk_flag.svg',
//   de: '/static/icons/de_flag.svg',
//   es: '/static/icons/es_flag.svg',
// };

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
        backgroundColor: '#ffffff',
      }
    : {
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { pageTitle, ...other } = props;

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar
        disableGutters
        sx={{
          height: 92,
          left: 0,
          px: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'space-between',
            display: 'contents',
          }}
        >
          <Box
            sx={{
              width: 72,
              marginRight: '24px',
              marginLeft: '-16px',
            }}
          >
            <Link href="/">
              <Image src={logo} />
            </Link>
          </Box>
          <Box>
            <h5
              style={{
                color: '#293343',
                fontWeight: 700,
                fontSize: '24px',
              }}
            >
              {pageTitle}
            </h5>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <AccountButton />
      </Toolbar>
    </DashboardNavbarRoot>
  );
};
