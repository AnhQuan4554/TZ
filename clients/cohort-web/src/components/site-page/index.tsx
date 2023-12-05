import type { NextPage } from 'next';
import React from 'react';
import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import { AuthGuard, RolesGuard } from '@tymlez/frontend-libs';
import { DEFAULT_ROLE_PERMISSIONS } from '@tymlez/common-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { OverviewSite } from './overview-site/OverviewSite';

export const SitePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cohort</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Grid>
          <Grid container>
            <Grid item md={12} xs={12}>
              <OverviewSite />
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
