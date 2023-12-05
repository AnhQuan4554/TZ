import type { FC } from 'react';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import { Grid } from '@mui/material';
import { stringToColor } from '@tymlez/frontend-libs';
import { circuitsColorMap } from '../common/circuit/utils';
import {
  StyledMarkerWrapGrid,
  StyledMarkerGrid,
  StyledMarkerTextGrid,
} from '../site-page/styled-components';

interface Props {
  data: { name: string; value: number }[];
}

export const SiteHistoricalCircuitPieChart: FC<Props> = ({ data }) => {
  const labels = data.map((i) => i.name);
  const values = data.map((i) => i.value);
  const colors = labels.map(
    (label) => circuitsColorMap[label] || stringToColor(label),
  );
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={10} xl={9}>
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
            <Chart
              height="332"
              width="424"
              options={{
                colors,
                labels,
                legend: {
                  show: false,
                  position: 'right',
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
                      return `${val} %`;
                    },
                  },
                },
              }}
              series={values}
              type="pie"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={2}
        xl={3}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid container spacing={2}>
          {labels.map((label: string, index: number) => {
            return (
              <Grid item sm={1} md={4} lg={12} xl={6}>
                <StyledMarkerWrapGrid>
                  <StyledMarkerGrid
                    sx={{
                      background: colors[index],
                    }}
                  />
                  <StyledMarkerTextGrid>{label}</StyledMarkerTextGrid>
                </StyledMarkerWrapGrid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};
