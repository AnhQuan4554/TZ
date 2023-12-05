import { FC, useState } from 'react';

import {
  StaticTimeline,
  filterSeries,
  ChartSerie,
  HistoryQuery,
} from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useDailyCarbonData } from '../../hooks/useDailyCarbonData';

const series: ChartSerie[] = [
  {
    name: 'Carbon Produced',
    key: 'emission',
    multiplier: 1,
    color: '#92D050',
    type: 'column',
    data: [],
  },
  {
    name: 'CO2e Abated',
    key: 'abatement',
    color: '#D3ECB9',
    multiplier: -1,
    type: 'column',
    data: [],
  },
  {
    name: 'Net Carbon',
    key: 'net',
    multiplier: 1,
    color: '#3A5320',
    type: 'line',
    data: [],
  },
];

interface Props {
  historyQuery: HistoryQuery;
  dataTestId?: string;
}

export const CarbonEmissionsDaily: FC<Props> = ({
  historyQuery,
  dataTestId,
}) => {
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const { data: carbonEmissionsData, isLoading } = useDailyCarbonData(
    from,
    to,
    'auto',
  );

  const defaultSelectedSeries = series.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);

  const chartSeriesData = filterSeries(
    selectedSeries,
    carbonEmissionsData,
    series,
  );

  return (
    <StaticTimeline
      dataTestId={dataTestId}
      isLoading={isLoading}
      series={chartSeriesData}
      selectChartType={false}
      height="393"
      title="Carbon Emissions"
      chartType="bar"
      subTitle="Daily Updates"
      historyQuery={historyQuery}
      uom="kg"
      netCO2="Net Carbon"
    />
  );
};
