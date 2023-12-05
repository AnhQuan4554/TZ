import { Card, Grid, Stack } from '@mui/material';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import type { FC } from 'react';
import { Loading } from '@tymlez/frontend-libs';
import { usePerformanceRatio } from '../../../hooks/useSummaryRealtimeData';
import {
  StyledMarkerGrid,
  StyledMarkerTextGrid,
  StyledMarkerWrapGrid,
  StyledPercenLeftGrid,
  StyledPercenRightGrid,
  StyledPercenValueGrid,
  StyledPercenWrapGrid,
  StyledTitleRecTypography,
} from '../styles/summaryStyle';

interface Props {
  dataTestId?: string;
}
export const PerformanceRatio: FC<Props> = ({ dataTestId }) => {
  const colors = ['#92D050', '#989898'];
  const labels = ['', ''];
  const { data, isLoading } = usePerformanceRatio();

  return (
    <Stack direction="column" spacing={5}>
      <Card elevation={12} sx={{ p: 3, minHeight: 400 }}>
        <Grid container data-test-id={dataTestId}>
          <Grid item xs={12}>
            <StyledTitleRecTypography data-test-id={`${dataTestId}-header`}>
              Performance Ratio
            </StyledTitleRecTypography>
            <Grid
              sx={{
                marginTop: '32px',
                '& > div': {
                  display: 'flex',
                  justifyContent: 'center',
                },
              }}
            >
              {isLoading ? (
                <Loading dataTestId={`${dataTestId}-loading`} />
              ) : (
                <Grid sx={{ position: 'relative' }}>
                  <Chart
                    data-test-id={`${dataTestId}-chart`}
                    height="290px"
                    width="250px"
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
                            return `${val.toFixed(2)}%`;
                          },
                        },
                      },
                    }}
                    series={[data || 0, data ? 100 - data : 0]}
                    type="donut"
                  />
                  <StyledPercenValueGrid data-test-id={`${dataTestId}-value`}>
                    {data?.toFixed(2)} %
                  </StyledPercenValueGrid>
                  <StyledPercenWrapGrid>
                    <StyledPercenLeftGrid>0%</StyledPercenLeftGrid>
                    <StyledPercenRightGrid>100%</StyledPercenRightGrid>
                  </StyledPercenWrapGrid>
                </Grid>
              )}
            </Grid>

            <StyledMarkerWrapGrid
              sx={{ mt: 5 }}
              data-test-id={`${dataTestId}-label-marker`}
            >
              <StyledMarkerGrid
                sx={{
                  background: '#92D050',
                }}
              />
              <StyledMarkerTextGrid>
                Current generation against forecast
              </StyledMarkerTextGrid>
            </StyledMarkerWrapGrid>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
