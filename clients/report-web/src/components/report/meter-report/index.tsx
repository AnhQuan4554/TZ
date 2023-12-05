import {
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputBase,
  Chip,
} from '@mui/material';
import {
  HistoryQueryForm,
  HistoryQuery,
  useSiteContext,
  CommonTable,
  CustomPagination,
  AuthGuard,
} from '@tymlez/frontend-libs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { getLastNDaysRange } from '@tymlez/common-libs';
import type { GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Checkbox from '@mui/material/Checkbox';
import { DashboardSiteLayout } from 'src/layout/DashboardSiteLayout';
import { ReportStyle } from 'src/components/report/styled-components';
import { PreviewReport } from './PreviewReport';

const StyledChip = styled(Chip)(() => ({
  '&.MuiChip-filledDefault': {
    backgroundColor: '#EFF4EA',
    color: '#75A640',
  },
}));
export const MeterReportPage: NextPage = () => {
  const pickerPersistKey = 'trustChainDateRange';
  const { currentSite } = useSiteContext();
  const days = getLastNDaysRange(currentSite?.timezone || '', 1);
  const [cookies] = useCookies([pickerPersistKey]);
  const [from, to] = cookies[pickerPersistKey] || [];
  const classes = ReportStyle();
  const [historyQuery, setHistoryQuery] = React.useState<HistoryQuery>({
    dateRange: [from || days.from, to || days.to],
  });
  const columns: GridColDef[] = [
    {
      field: 'tokenId',
      headerName: 'Token ID',
      headerAlign: 'left',
      flex: 129,
      align: 'left',
    },
    {
      field: 'timeStamp',
      headerName: 'Timestamp',
      headerAlign: 'center',
      flex: 200,
      align: 'center',
    },
    {
      field: 'metricName',
      headerName: 'METRIC NAME',
      headerAlign: 'center',
      type: 'number',
      flex: 260,
      align: 'center',
    },
    {
      field: 'metricValue',
      headerName: 'METRIC VALUE',
      headerAlign: 'center',
      type: 'number',
      flex: 300,
      align: 'center',
    },
    {
      field: 'meter',
      headerName: 'METER',
      headerAlign: 'center',
      type: 'number',
      flex: 167,
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'Action ',
      headerAlign: 'center',
      type: 'number',
      flex: 167,
      align: 'center',
    },
  ];
  const data = [
    {
      tokenId: 'Data',
      timeStamp: 'Data',
      metricName: 'Data',
      metricValue: 'Data',
      meter: 'Data',
      action: 'Data',
    },
    {
      tokenId: 'Data',
      timeStamp: 'Data',
      metricName: 'Data',
      metricValue: 'Data',
      meter: 'Data',
      action: 'Data',
    },
    {
      tokenId: 'Data',
      timeStamp: 'Data',
      metricName: 'Data',
      metricValue: 'Data',
      meter: 'Data',
      action: 'Data',
    },
    {
      tokenId: 'Data',
      timeStamp: 'Data',
      metricName: 'Data',
      metricValue: 'Data',
      meter: 'Data',
      action: 'Data',
    },
    {
      tokenId: 'Data',
      timeStamp: 'Data',
      metricName: 'Data',
      metricValue: 'Data',
      meter: 'Data',
      action: 'Data',
    },
    {
      tokenId: 'Data',
      timeStamp: 'Data',
      metricName: 'Data',
      metricValue: 'Data',
      meter: 'Data',
      action: 'Data',
    },
  ];
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openPreview, setOpenPreview] = React.useState(false);
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };
  const handleOpenPreview = () => {
    setOpenPreview(true);
  };
  const handClosePreview = () => {
    setOpenPreview(false);
  };

  const [loading, setLoading] = React.useState(false);
  const generatePDF = () => {
    setLoading(true);
    const input: any = document.getElementById('pdf');
    html2canvas(input, {
      logging: true,
      scale: 2,
      windowWidth: 1440,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('p', 'mm');
      let position = 0;
      doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      if (doc) {
        setLoading(false);
      }
      doc.save('report.pdf');
    });
  };
  const handleExportPdf = () => {
    generatePDF();
  };

  return (
    <Box sx={{ margin: 'auto', maxWidth: '1440px', flexGrow: 1 }}>
      <Head>
        <title>Report detail</title>
      </Head>
      <Link
        href={{
          pathname: '/report',
          query: {
            // ...params,
          }, // the data
        }}
        passHref
      >
        <Grid className={classes.backTo}>
          <img src="../icons/other/returnArrow.svg" alt="Arow return" />
          <p className={classes.titleBackTo}>Back to Report</p>
        </Grid>
      </Link>
      {window.location.href.includes('csv') ? (
        <Box
          // component="main"
          className={classes.bodyBoxStyle}
          flexDirection="column"
        >
          <Grid sx={{ mb: 3 }}>
            <Grid>
              <Typography className={classes.titleReport}>
                dMRV Data Report
              </Typography>
            </Grid>
            <Typography className={classes.descriptionReport}>
              Export a spreadsheet of digital Monitoring, Reporting, and
              Verification data based on a selected date range.
            </Typography>
          </Grid>
          <Grid className={classes.filterReport}>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                  <Grid item xs={12}>
                    <p className={classes.filterDate}>Date Selected</p>
                    <HistoryQueryForm
                      dataTestId="trustchain-history-query"
                      persistKey="trustChainDateRange"
                      query={historyQuery}
                      onUpdateQuery={setHistoryQuery}
                      backgroundColor="#FCFCFC"
                      alignItems="start"
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={9}
                  sx={{
                    '@media (max-width: 1440px)': {
                      marginTop: '0px',
                    },
                    '@media (max-width: 1024px)': {
                      marginTop: '50px',
                    },
                    '@media (max-width: 320px)': {
                      marginTop: '0px',
                    },
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      md={3}
                      lg={3}
                      className={classes.gridFormGroup}
                    >
                      <Grid>
                        <p className={classes.filterDate}>Site</p>
                      </Grid>
                      <FormControl variant="standard">
                        <Select
                          defaultValue="null"
                          input={
                            <InputBase className={classes.BootstrapInput} />
                          }
                        >
                          <MenuItem value="null">
                            <em>Choose Site</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={3}
                      lg={3}
                      sx={{
                        display: ' flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Grid>
                        <p className={classes.filterDate}>Device</p>
                      </Grid>
                      <FormControl variant="standard">
                        <Select
                          defaultValue="null"
                          input={
                            <InputBase className={classes.BootstrapInput} />
                          }
                        >
                          <MenuItem value="null">
                            <em>Choose Device</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={3}
                      lg={3}
                      sx={{ display: ' flex', flexDirection: 'column' }}
                    >
                      <p className={classes.filterDate}>Token Type</p>
                      <FormControl variant="standard">
                        <Select
                          defaultValue="null"
                          input={
                            <InputBase className={classes.BootstrapInput} />
                          }
                        >
                          <MenuItem value="null">
                            <em>Choose Token Type</em>
                          </MenuItem>
                          <MenuItem value="Renewable Energy Certificate">
                            <em>Renewable Energy Certificate</em>
                          </MenuItem>
                          <MenuItem value="Guarantee of Origin Certificate">
                            <em>Guarantee of Origin Certificate</em>
                          </MenuItem>
                          <MenuItem value="Carbon Abatement Token">
                            <em>Carbon Abatement Token</em>
                          </MenuItem>
                          <MenuItem value="Carbon Emissions Token">
                            <em>Carbon Emissions Token</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Button className={classes.btnReport}>
                        View by filter
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ mt: 4 }}>
            <Grid container spacing={1}>
              <Grid item>
                <StyledChip
                  label="01 July 2021 -> 30 June 2022"
                  onDelete={() => {
                    console.log(1);
                  }}
                />
              </Grid>
              <Grid item>
                <StyledChip
                  label="Uon MQTT"
                  onDelete={() => {
                    console.log(1);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              width: {
                xs: window.innerWidth - 60,
                sm: window.innerWidth - 150,
                md: '100%',
              },
            }}
          >
            <CommonTable
              columns={columns}
              data={data || []}
              hideFooter
              customHeadStyle={{
                border: 'none',
                background: '#A8D973',
              }}
              customCellStyle={{
                border: 'none',
              }}
            />
          </Grid>
          <Box sx={{ mt: 4 }}>
            <CustomPagination
              page={page}
              pageSize={pageSize}
              handleChangePage={handleChangePage}
              handleChangePageSize={handleChangeRowsPerPage}
            />
          </Box>
          <Grid
            container
            sx={{
              marginLeft: 'auto',
              marginRight: 0,
              justifyContent: 'flex-end',
            }}
            spacing={2}
          >
            <Grid item>
              <Grid
                container
                sx={{
                  '@media (min-width: 769px)': {
                    justifyContent: 'flex-end',
                  },
                }}
              >
                <Checkbox
                  sx={{
                    color: '#92D050',
                    '&.Mui-checked': {
                      color: '#92D050',
                    },
                  }}
                  defaultChecked
                />
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#5C6A82',
                  }}
                >
                  Generate from Trust Chain
                </Typography>
              </Grid>
              <Typography
                sx={{ fontSize: '13px', fontWeight: 400, fontStyle: 'Italic' }}
              >
                Expected to be completed after 3 hours. When selected, report
                will be delivered via your account email address.
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={2}
              lg={1.5}
              xl={1.5}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Button
                sx={{
                  background: '#92D050',
                  color: '#FCFCFC',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '13px',
                  maxHeight: '56px',
                  '@media (max-width: 768px)': {
                    width: '100%',
                  },
                  '&:hover': {
                    color: '#92D050',
                    border: '1px solid #92D050',
                  },
                }}
                onClick={handleExportPdf}
              >
                Export to CSV
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          component="main"
          className={classes.bodyBoxStyle}
          flexDirection="column"
        >
          <Grid sx={{ mb: 3 }}>
            <Grid>
              <Typography className={classes.titleReport}>
                Project Report
              </Typography>
            </Grid>
            <Typography className={classes.descriptionReport}>
              Export a PDF containing key project information for a selected
              date range.
            </Typography>
          </Grid>
          <Grid className={classes.filterReport}>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                  <Grid item xs={12}>
                    <p className={classes.filterDate}>Date Selected</p>
                    <HistoryQueryForm
                      dataTestId="trustchain-history-query"
                      persistKey="trustChainDateRange"
                      query={historyQuery}
                      onUpdateQuery={setHistoryQuery}
                      backgroundColor="#FCFCFC"
                      alignItems="start"
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={9}
                  sx={{
                    '@media (max-width: 1024px)': {
                      marginTop: '50px',
                    },
                    '@media (max-width: 767px)': {
                      marginTop: '0px',
                    },
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.gridFormGroup}>
                      <Grid>
                        <p className={classes.filterDate}>Site</p>
                      </Grid>
                      <FormControl variant="standard">
                        <Select
                          defaultValue="null"
                          input={
                            <InputBase className={classes.BootstrapInput} />
                          }
                        >
                          <MenuItem value="null">
                            <em>Choose Site</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  marginLeft: 'auto',
                  marginRight: 0,
                  justifyContent: 'flex-end',
                  marginTop: 2,
                }}
              >
                <Button
                  sx={{
                    background: '#92D050',
                    color: '#FCFCFC',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '13px',
                    '@media (max-width: 768px)': {
                      width: '100%',
                      marginTop: 2,
                    },
                    '&:hover': {
                      color: '#92D050',
                      border: '1px solid #92D050',
                    },
                  }}
                  onClick={handleOpenPreview}
                >
                  Export to PDF
                </Button>
                <PreviewReport
                  openPreview={openPreview}
                  closePreview={handClosePreview}
                  handleExportPdf={handleExportPdf}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

MeterReportPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardSiteLayout>{page}</DashboardSiteLayout>
  </AuthGuard>
);
