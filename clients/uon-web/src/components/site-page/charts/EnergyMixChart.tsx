import { FC, useEffect, useState } from 'react';
import {
  HistoryQuery,
  StaticTimeline,
  filterSeries,
  ChartSerie,
} from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useEnergyData } from '../../../hooks/carbon';

interface Props {
  historyQuery: HistoryQuery;
  timezone?: string;
}

const initialSeries: ChartSerie[] = [
  {
    name: 'Solar Array',
    color: '#6cc261',
    data: [],
    type: 'line',
    multiplier: 1,
    key: 'inverter',
  },
  {
    name: 'Genset',
    color: '#FF9800',
    data: [],
    multiplier: 1,
    type: 'line',
    key: 'genset',
  },
];

export const EnergyMixChart: FC<Props> = ({ historyQuery, timezone }) => {
  const [isLoading, setIsLoading] = useState(true);
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const energyMix = useEnergyData(from, to, timezone);

  useEffect(() => {
    if (energyMix.data) {
      setIsLoading(false);
    }else{
      setIsLoading(true);
    }
  }, [energyMix.data]);

  const chartSeriesData = filterSeries(
    ['Solar Array', 'Genset'],
    energyMix.data,
    initialSeries,
    timezone,
  );

  return (
    <StaticTimeline
      isLoading={isLoading}
      series={chartSeriesData}
      selectChartType={false}
      yTitle="kilowatt-hours (kWh)"
      height="393"
      title={energyMix.title}
      chartType="line"
      uom="kWh"
      historyQuery={historyQuery}
    />
  );
};
