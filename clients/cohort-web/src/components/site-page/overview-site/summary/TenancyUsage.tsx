import type { FC } from 'react';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import { Card, Grid, Stack } from '@mui/material';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { HistoryQuery, HistoryQueryText, Loading } from '@tymlez/frontend-libs';
import { formatNumber } from '@tymlez/common-libs';
import {
  StyledMarkerGrid,
  StyledMarkerTextGrid,
  StyledMarkerWrapGrid,
  StyledTitleTypography,
} from '../../styled-components';
import { useTenancyData } from '../../../../hooks/useTenancyData';
import { tenancySeriesToChart } from '../../../common/energy/energy-utils';
import { circuitsColorMap } from '../../../common/circuit/utils';

interface Props {
  historyQuery: HistoryQuery;
  dataTestId?: string;
}
export const TenancyUsage: FC<Props> = ({ historyQuery, dataTestId }) => {
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const { data: tenacyData, isLoading } = useTenancyData(from, to, 'auto');
  const chartSeries = tenacyData
    ? tenancySeriesToChart(tenacyData, circuitsColorMap)
    : [];
  const chartSeriesCommunal = chartSeries.slice(0, 2);
  const chartSeriesNoCommunal = chartSeries.slice(2, 10);
  const labels = chartSeries.map((i) => i.name);
  const values = chartSeries.map((item) => {
    return item.data.reduce((accumulator, object) => {
      return accumulator + +object.y;
    }, 0);
  });
  const colors = chartSeries.map((i) => i.color);
  return (
    <Stack
      direction="column"
      spacing={5}
      style={{ height: '100%' }}
      data-test-id={dataTestId}
    >
      <Card elevation={12} sx={{ p: 3, height: '100%' }}>
        <StyledTitleTypography data-test-id={`${dataTestId}-title`}>
          Tenancy Usage
        </StyledTitleTypography>
        <HistoryQueryText
          fromDate={fromDate}
          toDate={toDate}
          dataTestId={`${dataTestId}-date-range`}
        />

        <Grid container>
          <Grid
            item
            sm={12}
            md={12}
            lg={4}
            xl={3}
            sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
          >
            <Grid>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                {chartSeriesCommunal.map((chart) => {
                  return (
                    <Grid
                      key={chart.name}
                      item
                      sm={3}
                      md={6}
                      lg={12}
                      xl={12}
                      data-test-id={`${dataTestId}-label-${chart.name}`}
                    >
                      <StyledMarkerWrapGrid>
                        <StyledMarkerGrid
                          sx={{
                            background: chart.color,
                          }}
                        />
                        <StyledMarkerTextGrid
                          data-test-id={`${dataTestId}-label-${chart.name}`}
                        >
                          {chart.name}
                        </StyledMarkerTextGrid>
                      </StyledMarkerWrapGrid>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container spacing={2}>
                {chartSeriesNoCommunal.map((chart) => {
                  return (
                    <Grid
                      key={chart.name}
                      item
                      sm={3}
                      md={3}
                      lg={6}
                      xl={6}
                      data-test-id={`${dataTestId}-label-${chart.name}`}
                    >
                      <StyledMarkerWrapGrid>
                        <StyledMarkerGrid
                          sx={{
                            background: chart.color,
                          }}
                        />
                        <StyledMarkerTextGrid
                          data-test-id={`${dataTestId}-label-${chart.name}`}
                        >
                          {chart.name}
                        </StyledMarkerTextGrid>
                      </StyledMarkerWrapGrid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={12} lg={8} xl={9}>
            <Grid
              sx={{
                mt: 4,
                '& > div': {
                  display: 'flex',
                  justifyContent: 'center',
                },
              }}
            >
              <Grid>
                {isLoading ? (
                  <Loading dataTestId={`${dataTestId}-chart-loading`} />
                ) : (
                  <Chart
                    data-test-id={`${dataTestId}-pie-chart`}
                    options={{
                      colors,
                      labels,
                      legend: {
                        show: false,
                        position: 'left',
                        markers: {
                          radius: 1,
                        },
                      },
                      dataLabels: {
                        enabled: true,
                      },
                      tooltip: {
                        x: {
                          show: false,
                        },
                        y: {
                          formatter: (val) => {
                            return `${formatNumber(val)} kWh`;
                          },
                        },
                      },
                    }}
                    series={values}
                    type="pie"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
