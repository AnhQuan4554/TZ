import type { FC } from 'react';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Loading } from '@tymlez/frontend-libs';
import type { ITenancyDataResult } from '@tymlez/platform-api-interfaces';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { formatNumber } from '@tymlez/common-libs';
import { sumBy } from 'lodash';
import {
  StyledMarkerGrid,
  StyledMarkerTextGrid,
  StyledMarkerWrapGrid,
  StyledTitleTypography,
} from '../../site-page/styled-components';
import { circuitsColorMap } from '../../common/circuit/utils';
import { tenancySeriesToChart } from '../../common/energy/energy-utils';
import { SiteHistoricalCircuitTable } from './SiteHistoricalCircuitTable';

interface Props {
  data: ITenancyDataResult[];
  isLoading: boolean;
  dataTestId?: string;
}

const aggregateFunc = (tenancy: ITenancyDataResult) => {
  const value = sumBy(tenancy.data, (i) => +i.value) as number;
  return { name: tenancy.name, value };
};
export const TenancyUsagePieChart: FC<Props> = ({
  data,
  isLoading,
  dataTestId,
}) => {
  const chartSeries = data ? tenancySeriesToChart(data, circuitsColorMap) : [];
  const labels = chartSeries.map((i) => i.name);
  const values = chartSeries.map((item) => {
    return item.data.reduce((accumulator, object) => {
      return accumulator + +object.y;
    }, 0);
  });
  const colors = chartSeries.map((i) => i.color);

  const tenancyTableData = data ? data.map(aggregateFunc) : [];

  const tenancyTableDataT0T4 = tenancyTableData.splice(0, 5);
  const tenancyTableDataT4T8 = tenancyTableData.splice(-5);

  const chartSeriesCommunal = chartSeries.slice(0, 2);
  const chartSeriesNoCommunal = chartSeries.slice(2, 10);

  return (
    <Stack
      direction="column"
      spacing={5}
      style={{ height: '100%' }}
      data-test-id={dataTestId}
    >
      <Card elevation={12} sx={{ p: 2, height: '100%' }}>
        <StyledTitleTypography data-test-id={`${dataTestId}-title`}>
          Tenancy Usage
        </StyledTitleTypography>
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <DateRangeIcon sx={{ color: '#5C6A82' }} />
          <Typography sx={{ ml: 1, color: '#5C6A82' }}>
            Last 24 hours
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
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
                  <Loading dataTestId={`${dataTestId}-loading`} />
                ) : (
                  <Chart
                    dataTestId={`${dataTestId}-chart`}
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
                    series={values || []}
                    type="pie"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Grid>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                {chartSeriesCommunal.map((chart) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={12}
                      md={12}
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
              <Grid container spacing={1}>
                {chartSeriesNoCommunal.map((chart) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={12}
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
        </Grid>
        <Grid sx={{ mt: 2 }}>
          {isLoading ? (
            <Loading dataTestId={`${dataTestId}-table-loading`} />
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
                <SiteHistoricalCircuitTable
                  data={tenancyTableDataT0T4}
                  dataTestId={`${dataTestId}-table-T0T4`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
                <SiteHistoricalCircuitTable
                  data={tenancyTableDataT4T8}
                  dataTestId={`${dataTestId}-table-T4T8`}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Card>
    </Stack>
  );
};
