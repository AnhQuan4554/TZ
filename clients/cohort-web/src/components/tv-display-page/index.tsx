import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import {
  Loading,
  AuthGuard,
  RolesGuard,
  useSites,
} from '@tymlez/frontend-libs';
import { DEFAULT_ROLE_PERMISSIONS } from '@tymlez/common-libs';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
import { DisplaySite } from '../tv-display-page/DisplaySite';

export const DisplayPage: NextPage = () => {
  const { currentSite } = useSites();

  if (!currentSite) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Cohort Display</title>
        <meta httpEquiv="refresh" content="450" />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
          px: '24px',
          pb: 1,
          maxWidth: '1440px',
          margin: 'auto',
        }}
      >
        <Grid container>
          <Grid item md={12} xs={12}>
            <DisplaySite />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

DisplayPage.getLayout = (page) => (
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
