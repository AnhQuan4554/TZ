import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Card, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { DashboardLayout } from '@tymlez/frontend-libs';
import { EnergyTab } from '../components/site-page/energy-tab/EnergyTab';
import { OverviewSite } from '../components/site-page/overview-site/OverviewSite';
import { CarbonPurchase } from '../components/site-page/dovu/CarbonPurchase';
import TrustChainIcon from '../components/common/side-bar/icons/TrustChainIcon';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardSiteLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (pathname !== '/') {
      const yOffset = -150;
      const element = document.getElementById('energyTab');
      if (element) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        setTimeout(() => {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 1);
      }
    }
  }, [pathname]);

  const energyTab = [
    {
      key: 'tenancy',
      label: 'Tenancy',
      value: '/tenancy',
    },

    {
      key: 'consumption',
      label: 'Consumption & Generation (simulated)',
      value: '/consumption-generation',
    },
    {
      key: 'carbon',
      label: 'Carbon Emission',
      value: '/carbon',
    },
    {
      key: 'verification',
      label: 'Verification',
      value: '/verification',
    },
  ];

  const currentEnergy: any =
    pathname && energyTab.filter((energy) => energy.value === pathname);
  const tabs = [
    {
      path: '/',
      tabName: 'Home',
      icon: (color: any) => <HomeIcon fontSize="small" style={{ color }} />,
    },
    {
      path: '/trustchain',
      tabName: 'Trust Chain',
      icon: (color: any) => <TrustChainIcon fontSize="small" style={{ color }} />,
    },
  ];

  return (
    <DashboardLayout
      dataTestId="cohort-dashboard-navbar"
      tabs={tabs}
      title="Dashboard"
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Head>
          <title>
            Cohort{' '}
            {currentEnergy.length > 0 ? ` - ${currentEnergy[0].label}` : ''}
          </title>
        </Head>

        <Box
          sx={{
            flexGrow: 1,
            py: 4,
            maxWidth: '1440px',
            margin: {
              xs: 'unset',
              sm: 'auto',
            },
          }}
        >
          <Grid container>
            <Grid item md={12} xs={12}>
              <OverviewSite />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} sx={{ mx: 3 }}>
            <Box
              sx={{
                mt: 3,
              }}
            >
              <Grid id="energyTab">
                <Grid container>
                  <Grid item md={12} sx={{ width: '100%' }}>
                    <Card elevation={12} sx={{ width: '100%' }}>
                      <EnergyTab data={energyTab} />
                    </Card>
                    <Box sx={{ py: 3 }}>{children}</Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} sx={{ mx: 3 }}>
            <CarbonPurchase />
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
};
