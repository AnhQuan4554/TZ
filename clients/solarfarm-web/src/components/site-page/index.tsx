import type { NextPage } from 'next';
import React from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import {
  Loading,
  AuthGuard,
  RolesGuard,
  TitleHeader,
} from '@tymlez/frontend-libs';
import type { ISummaryItem } from '@tymlez/platform-api-interfaces';
import { DEFAULT_ROLE_PERMISSIONS } from '@tymlez/common-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { StyledBodyBox, Item } from '../common/styles/commonStyles';
import { SolarPanelGroup } from './PanelGroup';
import { PerformanceRatio } from './summary/PerformanceRatio';
import { useSummaryData } from '../../hooks/useSummaryRealtimeData';
import { RECComponent } from './summary/RECComponent';
import { EnergyComponent } from './summary/EnergyComponent';
import { siteHeader } from '../constants';

const iconMap: Record<string, string> = {
  rec: '/logo/license.svg',
  panel: '/logo/panel.svg',
  generated: '/logo/sunny.svg',
};

export const SitePage: NextPage = () => {
  const { data } = useSummaryData();

  return (
    <>
      <Head>
        <title>Solar Farm Dashboard</title>
      </Head>

      <TitleHeader
        header="Real Time Updates for"
        selectSiteHeader={siteHeader.selectSiteHeader}
        siteName={siteHeader.siteName}
        siteAddress={siteHeader.siteAddress}
        dataTestId="solarfarm-realtime-header"
      />

      <StyledBodyBox component="main" flexDirection="column">
        <Grid container spacing={3}>
          <RECComponent dataTestId="solarfarm-realtime-rec" />

          <Grid
            data-test-id="solarfarm-realtime-energy-components"
            container
            item
            xs={12}
            md={4}
            spacing={3}
          >
            {data ? (
              data.map((energy: ISummaryItem) => {
                return (
                  <EnergyComponent
                    dataTestId={`solarfarm-realtime-energy-component-${energy.name}`}
                    key={energy.name}
                    src={iconMap[energy.name]}
                    data={energy}
                  />
                );
              })
            ) : (
              <Grid item xs={12} md={12}>
                <Item>
                  <Loading dataTestId="solarfarm-realtime-energy-components-loading" />
                </Item>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <PerformanceRatio dataTestId="solarfarm-realtime-performance-ratio" />
          </Grid>

          <Grid item xs={12}>
            <SolarPanelGroup dataTestId="solarfarm-realtime-solar-panel-group" />
          </Grid>
        </Grid>
      </StyledBodyBox>
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
