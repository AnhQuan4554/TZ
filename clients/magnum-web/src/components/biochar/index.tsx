import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import {
  ProcessSteps,
  MultiMetricBlocks,
  AuthGuard,
  HistoryQuery,
  useSiteContext,
  TitleHeader,
} from '@tymlez/frontend-libs';
import { useCookies } from 'react-cookie';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { BoxStyle, WrapBoxStyle } from '../styles';
import { useProcessData } from '../../hooks/useProcessesData';
import { useMetricsData } from '../../hooks/useMetricsData';
import { CarbonEmissionsDaily } from '../site-page/CarbonEmissionsDaily';
import { TextBlock } from '../common/TextBlock';
import { siteHeader, pickerPersistKey } from '../constants';

export const BioCharPage: NextPage = () => {
  const { currentSite } = useSiteContext();
  const [cookies] = useCookies([pickerPersistKey]);
  const [from, to] = cookies[pickerPersistKey] || [];
  const days = getLastNDaysRange(currentSite?.timezone || '', 1);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });
  const [filterFrom, filterTo] = historyQuery.dateRange;

  const { data: metrics } = useMetricsData('biochar', filterFrom, filterTo);
  const { data: steps } = useProcessData('biochar', filterFrom, filterTo);

  return (
    <>
      <Head>
        <title>Magnum - Biochar</title>
      </Head>
      <TitleHeader
        dataTestId="magnum-biochar-header"
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
            dataTestId="magnum-biochar-multi-metric-blocks"
            title="Key Metrics"
            data={metrics || []}
          />

          <ProcessSteps
            dataTestId="magnum-biochar-process-steps"
            title="Production Process"
            steps={steps || []}
          />
        </WrapBoxStyle>
      </BoxStyle>
      <Grid container>
        <Grid item xs={12}>
          <CarbonEmissionsDaily
            dataTestId="magnum-biochar-carbon-emissions"
            historyQuery={historyQuery}
            processName="biochar"
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <TextBlock dataTestId="magnum-biochar-text-block" />
        </Grid>
      </Grid>
    </>
  );
};

BioCharPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout title="Biochar Dashboard">{page}</DashboardSiteLayout>
  </AuthGuard>
);
