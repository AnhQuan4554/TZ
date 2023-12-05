import type { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Chart } from '@tymlez/devias-material-kit/dist/components/chart';
import type { ApexOptions } from 'apexcharts';

interface Props {
  data: { data: any }[];
  color: string;
  width?: number;
  height?: number;
  dataTestId?: string;
}

export const LineChart: FC<Props> = ({ data, color, width, height, dataTestId }) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [color],
    fill: {
      gradient: {
        opacityFrom: 0.8,
        opacityTo: 0.1,
        shadeIntensity: 0.1,
        stops: [0, 100],
        type: 'vertical',
      },
      type: 'gradient',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <Chart
      data-test-id={dataTestId}
      options={chartOptions}
      series={data}
      type="area"
      width={width}
      height={height}
    />
  );
};
