import type { NextPage } from 'next';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import HomeIcon from '@mui/icons-material/Home';
import { formatDate } from '@tymlez/common-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { AuthGuard, Image } from '@tymlez/frontend-libs';
import { DashboardLayout } from '../../layout/DashboardLayout';
import tymlezLogo from '../../../public/tymlezlogolime.png';
import saiGlobalLogo from '../../../public/SAI-Global.png';
import { CarbonReportChartContainer } from '../report-page/CarbonReportChart';
import { CarbonAuditTable } from '../report-page/CarbonAuditTable';
import { SummaryWidget } from '../site-page/TotalWidget';
import mapImageHover from '../../../public/static/uon_map.png';
import verifiedWhite from '../../../public/static/report/verified-white.png';
import { useCarbonReport, useCarbonAudit } from '../../hooks/report';

export const ReportGroupPage: NextPage = () => {
  const startDate: IIsoDate = formatDate(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
  ); //last week
  const endDate: IIsoDate = formatDate(new Date()); //today

  const carbonReportData = useCarbonReport(startDate, endDate);
  const carbonAuditData = useCarbonAudit();
  return (
    <>
      <Head>
        <title>UON Group Report</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1400 }}>
          <Grid container spacing={3}>
            <Grid
              item
              container
              xs={12}
              sx={{ my: 6 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sx={{ mb: 4 }} className="pageDisplayNone">
                <Button href="/" variant="outlined" startIcon={<HomeIcon />}>
                  Back to Home
                </Button>
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <Image src={tymlezLogo} />
              </Grid>
              <Grid item xs={5} sm={3} md={2}>
                <Image src={verifiedWhite} />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Box>
                <Typography color="textPrimary" variant="h6" sx={{ mb: 1 }}>
                  Group Performance reporting for period {startDate} - {endDate}
                </Typography>

                <Typography color="textPrimary" variant="h6" sx={{ mb: 1 }}>
                  Site: 1-10 (Uon Pilbara Group #1)
                </Typography>
              </Box>
            </Grid>
            <Grid item container xs={12}>
              <Typography
                color="textPrimary"
                sx={{ mb: 1 }}
                className="pageDisplayNone"
              >
                To print correctly, please use the latest version of Google
                Chrome browser and press Ctrl + P.
              </Typography>
            </Grid>
            <Grid
              item
              container
              md={12}
              xs={12}
              columnSpacing={6}
              rowSpacing={3}
            >
              <Grid item container xs={12} md={4} lg={4} spacing={3}>
                <Grid item xs={12}>
                  <SummaryWidget source="carbon-emission" />
                </Grid>
                <Grid item xs={12}>
                  <SummaryWidget
                    source="water-pumped"
                    icon="/static/icons/waterdrop.svg"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={4} lg={4} spacing={3}>
                <Grid item xs={12} className="mt160">
                  <SummaryWidget source="inverter-generation" />
                </Grid>
                <Grid item xs={12}>
                  <SummaryWidget
                    source="trucked-diesel"
                    icon="/static/icons/truck.svg"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Card
                  elevation={12}
                  sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  <CardContent>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{ mb: 1 }}
                    >
                      Sites
                    </Typography>
                    <Image src={mapImageHover} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }} className="pageBreak">
            <CarbonReportChartContainer hookReturn={carbonReportData} />
          </Box>
          <Box sx={{ mt: 3 }} className="pageBreak">
            <CarbonAuditTable hookReturn={carbonAuditData} />
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item xs={5} sm={5} md={5}>
                <Image src={saiGlobalLogo} layout="responsive" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

ReportGroupPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);
