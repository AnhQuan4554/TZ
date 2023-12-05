import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import {
  HistoryQuery,
  ProcessSteps,
  MultiMetricBlocks,
  AuthGuard,
  useSiteContext,
  TitleHeader,
} from '@tymlez/frontend-libs';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { siteHeader, pickerPersistKey } from '../constants';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { useProcessData } from '../../hooks/useProcessesData';
import { useMetricsData } from '../../hooks/useMetricsData';
import { CarbonEmissionsDaily } from '../site-page/CarbonEmissionsDaily';
import { BoxStyle, WrapBoxStyle } from '../styles';
import { TextBlock } from '../common/TextBlock';

export const IronOrePage: NextPage = () => {
  const { currentSite } = useSiteContext();
  const [cookies] = useCookies([pickerPersistKey]);
  const [from, to] = cookies[pickerPersistKey] || [];
  const days = getLastNDaysRange(currentSite?.timezone || '', 1);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });

  const [filterFrom, filterTo] = historyQuery.dateRange;

  const { data: metrics } = useMetricsData('ironore', filterFrom, filterTo);
  const { data: steps } = useProcessData('ironore', filterFrom, filterTo);

  return (
    <>
      <Head>
        <title>Magnum - IronOre</title>
      </Head>

      <TitleHeader
        dataTestId="magnum-ironore-header"
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
            dataTestId="magnum-ironore-multi-metric-blocks"
            title="Key Metrics"
            data={metrics || []}
          />

          <ProcessSteps
            dataTestId="magnum-ironore-process-steps"
            title="Production Process"
            steps={steps || []}
          />
        </WrapBoxStyle>
      </BoxStyle>
      <Grid container>
        <Grid item xs={12}>
          <CarbonEmissionsDaily
            dataTestId="magnum-ironore-carbon-emissions"
            historyQuery={historyQuery}
            processName="ironore"
            disabledList={['CO2e Abated', 'Net Carbon']}
          />
        </Grid>
        <Grid item xs={12} sx={{ pt: 3 }}>
          <TextBlock dataTestId="magnum-ironore-text-block" />
        </Grid>
      </Grid>
    </>
  );
};

IronOrePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout title="Iron Ore Dashboard">{page}</DashboardSiteLayout>
  </AuthGuard>
);
