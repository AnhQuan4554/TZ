import { FC, useState } from 'react';
import {
  StaticTimeline,
  filterSolarSeries,
  ChartSerie,
  HistoryQuery,
  HistoryQueryText,
} from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useEnergyGenerationData } from '../../hooks/useEnergyGenerationData';

const series: ChartSerie[] = [
  {
    name: 'Solar Array (kWh)',
    key: 'generation',
    multiplier: 1,
    color: '#92D050',
    type: 'line',
    data: [],
  },
  {
    name: 'Forecast',
    key: 'forecast',
    color: '#989898',
    multiplier: 1,
    type: 'line',
    data: [],
  },
];

interface Props {
  historyQuery: HistoryQuery;
  dataTestId: string;
}

export const EnergyGeneration: FC<Props> = ({ historyQuery, dataTestId }) => {
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const { data: energyGenerationData, isLoading } = useEnergyGenerationData(
    from,
    to,
    'auto',
  );
  const defaultSelectedSeries = series.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);

  const chartSeriesData = filterSolarSeries(
    selectedSeries,
    energyGenerationData,
    series,
  );

  return (
    <StaticTimeline
      dataTestId={dataTestId}
      isLoading={isLoading}
      series={chartSeriesData}
      selectChartType={false}
      height="393"
      title="Energy Generation Chart"
      subTitle={
        <HistoryQueryText fromDate={new Date(from)} toDate={new Date(to)} />
      }
      historyQuery={historyQuery}
      showFullScreen={false}
    />
  );
};
