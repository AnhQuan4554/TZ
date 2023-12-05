import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import {
  HistoryQuery,
  ProcessSteps,
  MultiMetricBlocks,
  AuthGuard,
  useSiteContext,
  TitleHeader,
} from '@tymlez/frontend-libs';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { useCookies } from 'react-cookie';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { siteHeader, pickerPersistKey } from '../constants';
import { useProcessData } from '../../hooks/useProcessesData';
import { CarbonEmissionsDaily } from '../site-page/CarbonEmissionsDaily';
import { useMetricsData } from '../../hooks/useMetricsData';
import { VerifiedGuarantee } from '../site-page/verify/VerifiedGuarantee';
import { BoxStyle, WrapBoxStyle } from '../styles';
import { TextBlock } from '../common/TextBlock';

export const PigIronPage: NextPage = () => {
  const { currentSite } = useSiteContext();
  const [cookies] = useCookies([pickerPersistKey]);
  const [from, to] = cookies[pickerPersistKey] || [];
  const days = getLastNDaysRange(currentSite?.timezone || '', 1);

  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });

  const [filterFrom, filterTo] = historyQuery.dateRange;

  const { data: hismelt } = useProcessData('hismelt', filterFrom, filterTo);
  const { data: hismeltMetric } = useMetricsData(
    'hismelt',
    filterFrom,
    filterTo,
  );

  const pigIron = hismelt?.filter(
    (item) => item.group === 'Pig Iron Production',
  );

  const offGas = hismelt?.filter((item) => item.group === 'Off-gas Processing');

  return (
    <>
      <Head>
        <title>Magnum - PigIron</title>
      </Head>

      <TitleHeader
        dataTestId="magnum-pigiron-header"
        header={siteHeader.header}
        selectSiteHeader={siteHeader.selectSiteHeader}
        siteName={siteHeader.siteName}
        siteAddress={siteHeader.siteAddress}
        historyQuery={historyQuery}
        setHistoryQuery={setHistoryQuery}
        pickerPersistKey={pickerPersistKey}
      />

      <BoxStyle component="main" flexDirection="column">
        <WrapBoxStyle>
          <MultiMetricBlocks
            title="Key Metrics"
            data={hismeltMetric || []}
            dataTestId="magnum-pigiron-multi-metric-blocks"
          />

          <ProcessSteps
            title="Pig Iron Production"
            steps={pigIron || []}
            dataTestId="magnum-pigiron-process-steps"
          />
          <Box mt={3} />
          <ProcessSteps
            title="Off-Gas Cleaning"
            steps={offGas || []}
            dataTestId="magnum-pigiron-cleaning-process-steps"
          />
        </WrapBoxStyle>
      </BoxStyle>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CarbonEmissionsDaily
            dataTestId="magnum-pigiron-carbon-emissions"
            historyQuery={historyQuery}
            processName="hismelt"
          />
        </Grid>
        <Grid item xs={12}>
          <VerifiedGuarantee dataTestId="magnum-pigiron-verified-guarantee" />
        </Grid>
        <Grid item xs={12}>
          <TextBlock dataTestId="magnum-pig-iron-text-block" />
        </Grid>
      </Grid>
    </>
  );
};

PigIronPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout title="Pig Iron Dashboard">{page}</DashboardSiteLayout>
  </AuthGuard>
);
