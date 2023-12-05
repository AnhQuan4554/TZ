import type { FC } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HistoryQuery, HistoryQueryText, Loading } from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { getSummaryInfo, useSummaryData } from '../../../hooks/summary';
import { summaryStyle } from '../../../styles/summary/summaryStyle';
import { EnergyComponent } from './EnergyComponent';
import { HydrogenFootprint } from './HydrogenFootprint';
import { RenewableUsagePercentage } from './RenewableUsagePercentage';

const GridSummary = styled('div')(({ theme }) => ({
  marginBottom: '16px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'inline-block',
  },
}));

interface Props {
  historyQuery: HistoryQuery;
}

export const Summary: FC<Props> = ({ historyQuery }) => {
  const classes = summaryStyle();
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const metricsInfo = getSummaryInfo();
  const { data: carbonEmissionData } = useSummaryData(
    'carbon-emission',
    from,
    to,
  );
  const { data: carbonAbatementData } = useSummaryData(
    'carbon-abatement',
    from,
    to,
  );
  const { data: netCarbonEmissionsData } = useSummaryData(
    'net-carbon-emissions',
    from,
    to,
  );
  const { data: fossilFuelUsageData } = useSummaryData(
    'fossil-fuel-usage',
    from,
    to,
  );
  const { data: greenEnergyUsageData } = useSummaryData(
    'green-energy-usage',
    from,
    to,
  );
  const { data: waterpumpedData } = useSummaryData('water-pumped', from, to);

  const metricsData = [
    {
      ...metricsInfo[0],
      ...carbonEmissionData,
    },
    {
      ...metricsInfo[1],
      ...carbonAbatementData,
    },
    {
      ...metricsInfo[2],
      ...netCarbonEmissionsData,
    },
    {
      ...metricsInfo[3],
      ...fossilFuelUsageData,
    },
    {
      ...metricsInfo[4],
      ...greenEnergyUsageData,
    },
    {
      ...metricsInfo[5],
      ...waterpumpedData,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
      <Grid item md={8} xs={12}>
        <Card elevation={12} sx={{ height: '100%', padding: '32px' }}>
          <GridSummary
            sx={{
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            <Grid item xs={12} md={12} style={{ marginBottom: '10px' }}>
              <Typography className={classes.maintTitleComponent}>
                Key Metrics
              </Typography>
              <HistoryQueryText
                fromDate={fromDate}
                toDate={toDate}
                dataTestId="uon-web-date-range-title"
              />
            </Grid>
          </GridSummary>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {metricsInfo ? (
                metricsInfo.map((energy) => {
                  return (
                    <EnergyComponent
                      key={energy.metricKey}
                      metricInfo={energy}
                      metricsData={metricsData}
                    />
                  );
                })
              ) : (
                <Loading />
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item container spacing={2} xs={12} md={4}>
        <Grid item md={12} xs={12} container spacing={3}>
          <Grid item xs={12}>
            <HydrogenFootprint data={metricsData} />
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} container spacing={3}>
          <Grid item xs={12}>
            <RenewableUsagePercentage data={metricsData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
