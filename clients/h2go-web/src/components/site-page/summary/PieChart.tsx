import type { FC } from 'react';
import { Chart } from '@tymlez/devias-material-kit/src/components/chart';
import { round } from 'lodash';
import { Card, Stack } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import type { ISummaryItem } from '../../../hooks/useSummaryData';

interface Props {
  data: ISummaryItem[];
  dataTestId?: string;
}

export const PieChart: FC<Props> = ({ data, dataTestId }) => {
  const otherSource = data.find(
    (x) => x.name === 'electricitySupplied',
  ) as ISummaryItem;

  const renewable = data.find(
    (x) => x.name === 'solarSupplied',
  ) as ISummaryItem;

  const labels = ['Renewable energy', 'Other resources'];
  const values = [renewable.value, otherSource.value];
  const colors = ['#92D050', '#FDC35C'];

  const chartOptions: ApexOptions = {
    colors,
    labels,
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      fontSize: '16px',
      fontWeight: 500,
      markers: {
        radius: 1,
      },
      width: 500,
      offsetY: 10,
      formatter(seriesName: string, opts: any) {
        const percent =
          opts.w.config.series[0] + opts.w.config.series[1] !== 0
            ? (opts.w.config.series[opts.seriesIndex] /
                (opts.w.config.series[0] + opts.w.config.series[1])) *
              100
            : 0;

        return ` From ${seriesName} ${round(percent, 2)} % `;
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val) => {
          return `${round(val, 2)} kWh`;
        },
      },
    },
  };
  return (
    <Stack direction="column" spacing={5}>
      <Card elevation={12} sx={{ p: 3, minHeight: 400 }}>
        <Chart
          data-test-id={dataTestId}
          height="100%"
          width="100%"
          options={chartOptions}
          series={values}
          type="pie"
        />
      </Card>
    </Stack>
  );
};
