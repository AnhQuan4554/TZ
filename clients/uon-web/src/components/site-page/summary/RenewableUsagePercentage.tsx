import { Card, Grid, Stack, Typography } from '@mui/material';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import { Loading } from '@tymlez/frontend-libs';
import { round } from 'lodash';
import type { FC } from 'react';
import { hydrogenFootPrintStyles } from '../../../styles/energy/hydrogenFootPrintStyles';
import type { IDashboardBlockSummary } from '../../../hooks/summary';

interface Props {
  data: any;
}
export const RenewableUsagePercentage: FC<Props> = ({ data }) => {
  const classes = hydrogenFootPrintStyles();
  const colors = ['#92D050', '#EDF0F2'];
  const labels = ['', ''];

  const fossilFuel: IDashboardBlockSummary = data.filter(
    (item: IDashboardBlockSummary) => item.title === 'Fossil Fuel Usage',
  )[0];
  const greenEnergy = data.filter(
    (item: IDashboardBlockSummary) => item.title === 'Green Energy Usage',
  )[0];

  return (
    <Stack direction="column" spacing={5} sx={{ height: '100%' }}>
      <Card elevation={12} style={{ padding: '24px', height: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.headingComponent}>
              Renewable Usage Percentage
            </Typography>
            <Grid
              sx={{
                marginTop: '32px',
                '& > div': {
                  display: 'flex',
                  justifyContent: 'center',
                },
              }}
            >
              {fossilFuel.value !== undefined && greenEnergy.value ? (
                <Grid sx={{ position: 'relative' }}>
                  <Chart
                    height="332"
                    width="424"
                    options={{
                      colors,
                      labels,
                      legend: {
                        show: false,
                        position: 'bottom',
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      plotOptions: {
                        pie: {
                          startAngle: -90,
                          endAngle: 90,
                          offsetY: 0,
                        },
                      },
                      grid: {
                        padding: {
                          bottom: -100,
                        },
                      },
                      tooltip: {
                        x: {
                          show: false,
                        },
                        y: {
                          formatter: (val) => {
                            return `${val} %`;
                          },
                        },
                      },
                    }}
                    series={[
                      round((+fossilFuel.value / +greenEnergy.value) * 100, 2),
                      100 -
                        round(
                          (+fossilFuel.value / +greenEnergy.value) * 100,
                          2,
                        ),
                    ]}
                    type="donut"
                  />
                  <Grid className={classes.percenValue}>
                    {round((+fossilFuel.value / +greenEnergy.value) * 100, 2)} %
                  </Grid>
                  <Grid className={classes.percenWrap}>
                    <Grid className={classes.percenLeft}>0%</Grid>
                    <Grid className={classes.percenRight}>100%</Grid>
                  </Grid>
                </Grid>
              ) : (
                <Loading />
              )}
            </Grid>

            <Typography
              sx={{
                fontSize: '16px',
                textAlign: 'center',
              }}
            >
              The total percentage of consumed energy that was produced from
              renewable sources
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
