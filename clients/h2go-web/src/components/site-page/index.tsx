import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import {
  ProcessSteps,
  HistoryQuery,
  MultiMetricBlocks,
  AuthGuard,
  useSiteContext,
  RolesGuard,
} from '@tymlez/frontend-libs';
import { useCookies } from 'react-cookie';
import {
  DEFAULT_ROLE_PERMISSIONS,
  getLastNDaysRange,
} from '@tymlez/common-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { Summary } from './summary/Summary';
import { CarbonEmissionsDaily } from './CarbonEmissionsDaily';
import { VerifiedGuarantee } from './verify/VerifiedGuarantee';
import { pickerPersistKey } from '../constants';
import { useMetricsData } from '../../hooks/useMetricsData';
import { useProcessData } from '../../hooks/useProcessesData';

export const SitePage: NextPage = () => {
  const { currentSite } = useSiteContext();
  const [cookies] = useCookies([pickerPersistKey]);
  const [from, to] = cookies[pickerPersistKey] || [];
  const days = getLastNDaysRange(currentSite?.timezone || '', 1);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });

  const [filterFrom, filterTo] = historyQuery.dateRange;
  const { data: metrics } = useMetricsData(filterFrom, filterTo);
  const { data: steps } = useProcessData(filterFrom, filterTo);
  return (
    <>
      <Head>
        <title>Dashboard for Green Hydrogen</title>
      </Head>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'stretch', width: ' calc(100% + 24px)' }}
      >
        <Grid item xs={12}>
          <Summary
            dataTestId="h2go-summary"
            persistKey={pickerPersistKey}
            historyQuery={historyQuery}
            setHistoryQuery={setHistoryQuery}
          />
        </Grid>

        <Grid item xs={12}>
          <CarbonEmissionsDaily
            historyQuery={historyQuery}
            dataTestId="h2go-carbon-emissions"
          />
        </Grid>

        <Grid item xs={12}>
          <VerifiedGuarantee dataTestId="h2go-verified-guarantee" />
        </Grid>

        <Grid item xs={12}>
          <Box
            bgcolor="white"
            sx={{
              p: 3,
              borderRadius: '8px',
              boxShadow: '0px 6px 15px rgb(100 116 139 / 12%)',
              pb: '121px',
            }}
          >
            <MultiMetricBlocks
              title="Key Metrics"
              data={metrics || []}
              dataTestId="h2go-multi-metric-blocks"
            />

            <ProcessSteps
              title="Production Process"
              steps={steps || []}
              dataTestId="h2go-process-steps"
            />
          </Box>
        </Grid>
      </Grid>
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
      <DashboardSiteLayout>{page}</DashboardSiteLayout>
    </RolesGuard>
  </AuthGuard>
);
