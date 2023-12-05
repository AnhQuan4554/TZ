import { FC, useState } from 'react';
import {
  StaticTimeline,
  filterSeries,
  ChartSerie,
  HistoryQuery,
  useSiteContext,
} from '@tymlez/frontend-libs';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import { useCarbonData } from '../../hooks/useCarbonData';

const series: ChartSerie[] = [
  {
    name: 'CO2e Abated',
    key: 'abatement',
    color: '#D3ECB9',
    multiplier: -1,
    type: 'column',
    data: [],
  },
  {
    name: 'Carbon Produced',
    key: 'emission',
    multiplier: 1,
    color: '#92D050',
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
  processName?: string;
  disabledList?: string[];
  dataTestId?: string;
}

export const CarbonEmissionsDaily: FC<Props> = ({
  historyQuery,
  processName,
  disabledList,
  dataTestId,
}) => {
  const { currentSite } = useSiteContext();
  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const { data: carbonEmissionsData } = useCarbonData(
    from,
    to,
    'auto',
    processName,
  );
  const defaultSelectedSeries = series.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);

  const chartSeriesData = filterSeries(
    selectedSeries,
    carbonEmissionsData,
    series,
    currentSite?.timezone,
  );

  return (
    <StaticTimeline
      dataTestId={dataTestId}
      series={chartSeriesData}
      selectChartType={false}
      yTitle="Co2eq (kg)"
      height="393"
      title="Carbon Emissions"
      chartType="bar"
      uom="kg"
      subTitle="Daily Updates"
      disabledList={disabledList}
      netCO2="Net Carbon"
    />
  );
};
