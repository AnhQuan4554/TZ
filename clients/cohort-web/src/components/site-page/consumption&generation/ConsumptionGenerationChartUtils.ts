import { round } from 'lodash';
import type { ApexOptions } from 'apexcharts';
import { formatDateTimeTooltip, formatTime } from '@tymlez/common-libs';
import type { ISeriesItem } from '@tymlez/platform-api-interfaces';
import type { Theme } from '@mui/material';

export const makeConsumptionSeries = (consumptionData: ISeriesItem[]) => {
  const data = consumptionData.map((record: ISeriesItem) => {
    return {
      x: new Date(new Date(record.isoDateTime).toUTCString()),
      y: round(record.value, 4),
    };
  });

  return [
    {
      name: 'Consumption',
      color: '#92D050',
      data,
    },
  ];
};

export const makeGenerationSeries = (generationData: ISeriesItem[]) => {
  const data = generationData.map((record: ISeriesItem) => {
    return {
      x: new Date(new Date(record.isoDateTime).toUTCString()),
      y: round(record.value, 4),
    };
  });

  return [
    {
      name: 'Generation (simulated)',
      color: '#FDC35C',
      data,
    },
  ];
};

export const getLineChartOptions = (theme: Theme): ApexOptions => ({
  tooltip: {
    enabled: true,
    x: {
      show: true,
      formatter: (val: string | number | Date) => {
        return formatDateTimeTooltip(new Date(val));
      },
    },
    y: {
      formatter: (val) => {
        return `${val} kWh`;
      },
    },
  },
  chart: {
    background: 'transparent',
    stacked: false,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 1000,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: theme.palette.divider,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    show: false,
  },
  markers: {
    hover: {
      size: undefined,
      sizeOffset: 2,
    },
    radius: 2,
    shape: 'circle',
    size: 4,
    strokeWidth: 0,
  },
  stroke: {
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
  },
  theme: {
    mode: theme.palette.mode,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.palette.divider,
    },
    axisTicks: {
      color: theme.palette.divider,
      show: true,
    },
    labels: {
      style: {
        colors: theme.palette.text.secondary,
      },
      formatter: (val: string | number | Date) => formatTime(new Date(val)),
    },
  },
  yaxis: [
    {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      title: { text: 'kWh' },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  ],
});

export const getAreaChartOptions = (theme: Theme): ApexOptions => ({
  tooltip: {
    enabled: true,
    x: {
      show: true,
      formatter: (val: string | number | Date) => {
        return formatDateTimeTooltip(new Date(val));
      },
    },
    y: {
      formatter: (val) => {
        return `${val} kWh`;
      },
    },
  },
  chart: {
    background: 'transparent',
    stacked: true,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 1000,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: theme.palette.divider,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    show: false,
  },
  markers: {
    hover: {
      size: undefined,
      sizeOffset: 2,
    },
    radius: 2,
    shape: 'circle',
    size: 4,
    strokeWidth: 0,
  },
  stroke: {
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
  },
  theme: {
    mode: theme.palette.mode,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.palette.divider,
    },
    axisTicks: {
      color: theme.palette.divider,
      show: true,
    },
    labels: {
      style: {
        colors: theme.palette.text.secondary,
      },
      formatter: (val: string | number | Date) => formatTime(new Date(val)),
    },
  },
  yaxis: [
    {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      title: { text: 'kilowatt-hours (kWh)' },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  ],
});
