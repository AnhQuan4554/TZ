import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import {
  HistoryQuery,
  AuthGuard,
  useSiteContext,
  RolesGuard,
  TitleHeader,
} from '@tymlez/frontend-libs';
import {
  DEFAULT_ROLE_PERMISSIONS,
  getLastNDaysRange,
} from '@tymlez/common-libs';
import { useCookies } from 'react-cookie';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { Summary } from './Summary';
import { CarbonEmissionsDaily } from './CarbonEmissionsDaily';
import { AverageNetCO2eq } from './AverageNetCO2eq';
import { VerifiedGuarantee } from './verify/VerifiedGuarantee';
import { siteHeader, pickerPersistKey } from '../constants';
import { TextBlock } from '../common/TextBlock';
import { BoxStyle } from '../styles';

export const SitePage: NextPage = () => {
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
        <title>Magnum</title>
      </Head>

      <TitleHeader
        dataTestId="magnum-summary-header"
        header={siteHeader.header}
        selectSiteHeader={siteHeader.selectSiteHeader}
        siteName={siteHeader.siteName}
        siteAddress={siteHeader.siteAddress}
        historyQuery={historyQuery}
        setHistoryQuery={setHistoryQuery}
        pickerPersistKey={pickerPersistKey}
      />

      <BoxStyle component="main" flexDirection="column">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Summary historyQuery={historyQuery} dataTestId="magnum-summary" />
          </Grid>
          <Grid item xs={12} md={8}>
            <CarbonEmissionsDaily
              historyQuery={historyQuery}
              dataTestId="magnum-summary-carbon-emission"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AverageNetCO2eq
              historyQuery={historyQuery}
              dataTestId="magnum-summary-average-net-CO2eq"
            />
          </Grid>
          <Grid item xs={12}>
            <VerifiedGuarantee dataTestId="magnum-summary-verified-guarantee" />
          </Grid>
          <Grid item xs={12}>
            <TextBlock dataTestId="magnum-site-page-text-block" />
          </Grid>
        </Grid>
      </BoxStyle>
    </>
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
      <DashboardSiteLayout title="Summary Pages">{page}</DashboardSiteLayout>
    </RolesGuard>
  </AuthGuard>
);
