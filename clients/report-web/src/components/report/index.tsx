import type { NextPage } from 'next';
import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
// import { useCookies } from 'react-cookie';
// import { getLastNDaysRange } from '@tymlez/common-libs';
import { Loading, AuthGuard } from '@tymlez/frontend-libs';
import Head from 'next/head';
import { DashboardSiteLayout } from '../../layout/DashboardSiteLayout';
// import { DATE_PICKER_PERSIST_KEY } from '../constants';
// import { useSiteContext } from '../../contexts/SiteContext';
import { ReportComponent } from './ReportComponent';

// const pickerPersistKey = DATE_PICKER_PERSIST_KEY;

export const ReportPage: NextPage = () => {
  const data = [
    {
      title: 'Audit & Compliance ',
      value: [
        {
          id: 0,
          title: 'dMRV Data Report',
          description:
            'Export a spreadsheet of digital Monitoring, Reporting, and Verification data based on a selected date range.',
          type: 'csv',
        },
        {
          id: 1,
          title: 'Project Report',
          description:
            'Export a PDF containing key project information for a selected date range.',
          type: 'pdf',
        },
      ],
    },
    {
      title: 'Operational & Performance',
      value: [
        {
          id: 3,
          title: 'IoT Device Report',
          description:
            'Export a list of all meters and devices, their installation and calibration dates and expiry.',
          type: 'pdf',
        },
        {
          id: 4,
          title: 'Site Report',
          description:
            'Export a list of all sites, their address, geographical locations, and timezones.',
          type: 'pdf',
        },
        {
          id: 5,
          title: 'Guardian Entities Report',
          description:
            'Export a list of all operational Hedera accounts used by the Guardian, including their role and HBAR balance.',
          type: 'csv',
        },
      ],
    },
    {
      title: 'Custom',
      value: [
        {
          id: 6,
          title: 'Custom Data Report',
          description:
            'Export data based on a custom query. Typically used for debugging or complex reporting.',
          type: 'csv',
        },
      ],
    },
  ];
  return (
    <Box sx={{ margin: 'auto', maxWidth: '1440px', flexGrow: 1 }}>
      <Head>
        <title>Report Dashboard</title>
      </Head>
      {data.map((report, reportIndex) => {
        return (
          <Box key={`report-${reportIndex}`} sx={{ marginTop: 3 }}>
            <Typography variant="h5">{report.title}</Typography>
            <Grid container spacing={3} style={{ marginTop: 0 }}>
              <Grid item xs={12} md={12}>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  spacing={2}
                  style={{ marginTop: '-10px' }}
                >
                  {report ? (
                    report.value.map((value, reportComponentIndex) => {
                      return (
                        <ReportComponent
                          dataTestId={`report-web-component-${value.id}`}
                          data={value}
                          key={`report-component-${reportComponentIndex}`}
                        />
                      );
                    })
                  ) : (
                    <Grid item xs={12} md={12}>
                      <Loading dataTestId="report-web-loading" />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

ReportPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
