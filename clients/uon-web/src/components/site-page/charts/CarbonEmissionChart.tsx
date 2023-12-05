import { useEffect, useState } from 'react';
import type { FC } from 'react';
import {
  StaticTimeline,
  HistoryQuery,
  filterSeries,
  ChartSerie,
} from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useCarbonEmission } from '../../../hooks/carbon';

interface Props {
  historyQuery: HistoryQuery;
  timezone?: string;
}

const initialSeries: ChartSerie[] = [
  {
    name: 'Carbon Produced',
    color: '#33cc33',
    data: [],
    type: 'column',
    multiplier: 1,
    key: 'emission',
  },
  {
    name: 'Carbon Abated',
    color: '#00ff99',
    data: [],
    multiplier: -1,
    type: 'column',
    key: 'abatement',
  },
  {
    name: 'Net Carbon',
    color: '#006600',
    data: [],
    type: 'line',
    multiplier: 1,
    key: 'net',
  },
];

export const CarbonEmissionChart: FC<Props> = ({ historyQuery, timezone }) => {
  const [isLoading, setIsLoading] = useState(true);
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const carbonEmissions = useCarbonEmission(from, to, timezone);

  const defaultSelectedSeries = initialSeries.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);

  useEffect(() => {
    if (carbonEmissions.data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [carbonEmissions.data]);

  const chartSeriesData = filterSeries(
    selectedSeries,
    carbonEmissions.data,
    initialSeries,
    timezone,
  );
  return (
    <StaticTimeline
      isLoading={isLoading}
      series={chartSeriesData}
      selectChartType={false}
      yTitle="kg CO2e"
      height="393"
      title={carbonEmissions.title}
      chartType="bar"
      uom="kg"
      historyQuery={historyQuery}
      netCO2="Net Carbon"
    />
  );
};
