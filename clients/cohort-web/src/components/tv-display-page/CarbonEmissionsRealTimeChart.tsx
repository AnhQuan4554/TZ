import React, { useState } from 'react';
import type { FC } from 'react';
import type { ICarbonSeries } from '@tymlez/platform-api-interfaces';
import {
  filterSeries,
  ChartSerie,
  StaticTimeline,
} from '@tymlez/frontend-libs';

const series: ChartSerie[] = [
  {
    name: 'CO2e Emission (Grid Consumption)',
    key: 'emission',
    color: '#D3ECB9',
    multiplier: 1,
    type: 'line',
    data: [],
  },
];

interface Props {
  data: ICarbonSeries;
  isLoading: boolean;
  dataTestId?: string;
}

export const CarbonEmissionsRealTimeChart: FC<Props> = ({
  data,
  isLoading,
  dataTestId,
}) => {
  const dataEmission3Hour = {
    ...data,
    emission: data.emission && data.emission.slice(-36),
  };

  const defaultSelectedSeries = series.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);
  const chartSeriesData = filterSeries(
    selectedSeries,
    dataEmission3Hour,
    series,
  );
  return (
    <StaticTimeline
      dataTestId={dataTestId}
      isLoading={isLoading}
      series={chartSeriesData}
      selectChartType={false}
      yTitle="kg CO2e"
      height="200"
      title="Real Time Carbon Emissions"
      showFullScreen={false}
      chartType="bar"
      customStyle={{
        '> .MuiCardHeader-root': {
          padding: '16px',
        },
      }}
      netCO2="Net CO2e"
      uom="CO2e kg"
    />
  );
};
