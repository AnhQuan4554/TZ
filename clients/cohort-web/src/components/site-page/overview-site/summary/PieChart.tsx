import type { FC } from 'react';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import { Card, Grid, Stack } from '@mui/material';
import type { IIsoDate, ISummaryItem } from '@tymlez/platform-api-interfaces';
import { HistoryQuery, HistoryQueryText, Loading } from '@tymlez/frontend-libs';
import { formatNumber } from '@tymlez/common-libs';
import {
  StyledMarkerGrid,
  StyledMarkerTextGrid,
  StyledMarkerWrapGrid,
  StyledTitleTypography,
} from '../../styled-components';

interface Props {
  data: ISummaryItem[] | undefined;
  historyQuery: HistoryQuery;
  isLoading: boolean;
  dataTestId?: string;
}

export const PieChart: FC<Props> = ({
  data,
  historyQuery,
  isLoading,
  dataTestId,
}) => {
  const labels = ['CO2e Abated (simulated)', 'CO2e Produced'];
  const colors = ['#92D050', '#FDC35C'];

  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const [carbonEmission, carbonAbatement] = data || [];

  return (
    <Stack direction="column" spacing={5} sx={{ height: '100%' }}>
      <Card elevation={12} sx={{ p: 3, height: '100%' }}>
        <Grid container data-test-id={dataTestId}>
          <Grid item xs={12}>
            <StyledTitleTypography data-test-id={`${dataTestId}-title`}>
              Carbon Output
            </StyledTitleTypography>
            <HistoryQueryText
              fromDate={fromDate}
              toDate={toDate}
              dataTestId={`${dataTestId}-date-range`}
            />
            {isLoading && (
              <Grid sx={{ height: 300 }}>
                <Loading dataTestId={`${dataTestId}-loading`} />
              </Grid>
            )}

            <Grid
              sx={{
                mt: 4,
                '& > div': {
                  display: 'flex',
                  justifyContent: 'center',
                },
              }}
            >
              <Chart
                data-test-id={`${dataTestId}-pie-chart`}
                options={{
                  colors,
                  labels,
                  legend: {
                    show: false,
                    position: 'bottom',
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
                        return `${formatNumber(val)} kg`;
                      },
                    },
                  },
                }}
                series={[
                  carbonAbatement?.value || 0,
                  carbonEmission?.value || 0,
                ]}
                type="pie"
              />
            </Grid>

            <Grid>
              {labels.map((label: string, index: number) => {
                return (
                  <StyledMarkerWrapGrid key={label}>
                    <StyledMarkerGrid
                      sx={{
                        background: colors[index],
                      }}
                    />
                    <StyledMarkerTextGrid
                      data-test-id={`${dataTestId}-label-${index}`}
                    >
                      {label}
                    </StyledMarkerTextGrid>
                  </StyledMarkerWrapGrid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};
