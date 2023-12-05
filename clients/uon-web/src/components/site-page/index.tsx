import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  HistoryQuery,
  HistoryQueryForm,
  AuthGuard,
  useSiteContext,
  RolesGuard,
} from '@tymlez/frontend-libs';
import {
  DEFAULT_ROLE_PERMISSIONS,
  getLastNDaysRange,
} from '@tymlez/common-libs';
import Head from 'next/head';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { EnergyMixChart } from './charts/EnergyMixChart';
import { CarbonEmissionChart } from './charts/CarbonEmissionChart';
import { VerificationTable } from './verification/VerificationTable';
import { sitePageSite } from '../../styles/site-page/SitePageStyle';
import { SiteSelectedPopOver } from './SiteSelectedPopOver';
import { Summary } from './summary/Summary';

const SelectSite = styled('u')(({ theme }) => ({
  fontSize: '32px !important',
  lineHeight: '32px',
  color: '#75A640',
  fontWeight: 700,
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    fontSize: '25px !important',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(426)]: {
    fontSize: '18px !important',
    lineHeight: '50px',
  },
}));

const HeadingTop = styled(Typography)(({ theme }) => ({
  fontSize: '32px !important',
  lineHeight: '32px',
  color: '#42526E',
  fontWeight: 400,
  marginRight: '12px',
  [theme.breakpoints.down('md')]: {
    fontSize: '25px !important',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(426)]: {
    fontSize: '18px !important',
    lineHeight: '50px',
  },
}));

const StickyTitleHeader = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  // position: 'fixed',
  height: '90px',
  maxWidth: '100%',
  backgroundColor: '#f9fafc',
  zIndex: 99,
  padding: '24px',
  position: 'sticky',
  top: '91px',
  [theme.breakpoints.down(426)]: {
    display: 'block',
    flexDirection: 'row',
    position: 'fixed',
    height: '135px',
    maxWidth: '100%',
    backgroundColor: '#f9fafc',
    zIndex: 99,
    paddingTop: '30px',
  },
}));

const pickerPersistKey = 'uonDateRange';

export const SitePage: NextPage = () => {
  const classes = sitePageSite();
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [cookies] = useCookies([pickerPersistKey]);

  const { currentSite } = useSiteContext();
  const timezone = currentSite?.timezone;
  const [from, to] = cookies[pickerPersistKey] || [];

  const days = getLastNDaysRange(timezone || '', 7);

  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });

  const handleOpenPopover = (status: boolean) => {
    setOpenPopover(status);
  };

  return (
    <Grid>
      <Head>
        <title>TYMLEZ Carbon Footprint for Uon</title>
      </Head>
      <StickyTitleHeader container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
          }}
        >
          <HeadingTop variant="h1">Summary from</HeadingTop>
          <SelectSite
            onClick={() => {
              handleOpenPopover(true);
            }}
          >
            All sites
          </SelectSite>
          {openPopover ? (
            <ArrowDropUpIcon className={classes.arrowDropUpIconStyle} />
          ) : (
            <ArrowDropDownIcon className={classes.arrowDropUpIconStyle} />
          )}
          <SiteSelectedPopOver
            anchorEl={anchorRef.current}
            onClose={() => {
              handleOpenPopover(false);
            }}
            open={openPopover}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <HistoryQueryForm
            persistKey={pickerPersistKey}
            query={historyQuery}
            onUpdateQuery={setHistoryQuery}
            backgroundColor="#FCFCFC"
            alignItems="end"
          />
        </Grid>
      </StickyTitleHeader>
      <Box
        component="main"
        sx={{
          display: 'flex',
          padding: '24px',
          marginTop: '24px',
        }}
        flexDirection="column"
      >
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          <Grid item xs={12}>
            <Summary historyQuery={historyQuery} />
          </Grid>
          <Grid item xs={12}>
            <EnergyMixChart historyQuery={historyQuery} timezone={timezone} />
          </Grid>
          <Grid item xs={12}>
            <CarbonEmissionChart
              historyQuery={historyQuery}
              timezone={timezone}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <VerificationTable timezone={timezone} />
        </Box>
      </Box>
    </Grid>
  );
};

SitePage.getLayout = (page) => (
  <AuthGuard>
    <RolesGuard
      permissions={[
        ...DEFAULT_ROLE_PERMISSIONS.client,
        ...DEFAULT_ROLE_PERMISSIONS.admin,
      ]}
    >
      <DashboardLayout>{page}</DashboardLayout>
    </RolesGuard>
  </AuthGuard>
);
