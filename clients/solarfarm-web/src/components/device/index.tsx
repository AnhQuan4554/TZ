import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import { getLastNDaysRange } from '@tymlez/common-libs';
import {
  HistoryQuery,
  AuthGuard,
  useSiteContext,
  TitleHeader,
} from '@tymlez/frontend-libs';
import Head from 'next/head';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { VerifiedGuarantee } from './verify/VerifiedGuarantee';
import { EnergyGeneration } from './EnergyGeneration';
import { pickerPersistKey, siteHeader } from '../constants';
import { Summary } from './Summary';

export const DevicePage: NextPage = () => {
  const { currentSite } = useSiteContext();
  const [cookies] = useCookies([pickerPersistKey]);
  const [from, to] = cookies[pickerPersistKey] || [];
  const days = getLastNDaysRange(currentSite?.timezone || '', 1);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });

  return (
    <>
      <Head>
        <title>Solar Farm Dashboard</title>
      </Head>
      <TitleHeader
        header="Analytics for"
        selectSiteHeader={siteHeader.selectSiteHeader}
        siteName={siteHeader.siteName}
        siteAddress={siteHeader.siteAddress}
        historyQuery={historyQuery}
        setHistoryQuery={setHistoryQuery}
        pickerPersistKey={pickerPersistKey}
        dataTestId="solarfarm-analytics-header"
      />

      <Grid container spacing={3} style={{ marginTop: 0 }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            pt: 0,
            mt: {
              xs: 0,
              sm: '70px',
              md: 0,
            },
          }}
        >
          <Summary historyQuery={historyQuery} />
        </Grid>
        <Grid item xs={12}>
          <EnergyGeneration
            dataTestId="solarfarm-analytics-energy-generation"
            historyQuery={historyQuery}
          />
        </Grid>
        <Grid item xs={12}>
          <VerifiedGuarantee
            historyQuery={historyQuery}
            dataTestId="solarfarm-analytics-verified-guarantee"
          />
        </Grid>
      </Grid>
    </>
  );
};

DevicePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
