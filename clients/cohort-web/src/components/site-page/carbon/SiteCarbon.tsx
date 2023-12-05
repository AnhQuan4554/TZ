import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import {
  filterSeries,
  HistoryQuery,
  ChartSerie,
  StaticTimeline,
  useSiteContext,
} from '@tymlez/frontend-libs';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { useCarbonSeriesData } from '../../../hooks/useCarbonData';

const series: ChartSerie[] = [
  {
    name: 'CO2e Emission (Grid Consumption)',
    key: 'emission',
    color: '#D3ECB9',
    multiplier: 1,
    type: 'column',
    data: [],
  },
  {
    name: 'Estimated CO2e Abated (Solar Generation)',
    key: 'abatement',
    multiplier: -1,
    color: '#92D050',
    type: 'column',
    data: [],
  },
  {
    name: 'Net CO2e',
    key: 'net',
    multiplier: 1,
    color: '#006600',
    type: 'line',
    data: [],
  },
];

export const SiteCarbon: FC = () => {
  const { currentSite } = useSiteContext();

  const days = getLastNDaysRange(currentSite?.timezone || '', 7);

  const urlParams = new URLSearchParams(window.location.search || '');
  const fromURL = urlParams.get('from');
  const toURL = urlParams.get('to');

  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    dateRange: [days.from, days.to],
  });

  useEffect(() => {
    if (fromURL && toURL) {
      setHistoryQuery({ dateRange: [fromURL, toURL] });
    }
  }, [fromURL, toURL]);

  const from: IIsoDate = historyQuery.dateRange[0] || '';
  const to: IIsoDate = historyQuery.dateRange[1] || '';

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const defaultSelectedSeries = series.map((i) => i.name);
  const [selectedSeries] = useState<Array<string>>(defaultSelectedSeries);

  const { data: seriesData, isLoading } = useCarbonSeriesData(from, to, 'hour');
  const chartSeriesData = filterSeries(selectedSeries, seriesData, series);

  return (
    <StaticTimeline
      dataTestId="cohort-carbon-emissions"
      isLoading={isLoading}
      series={chartSeriesData}
      selectChartType={false}
      height="393"
      title="Carbon Emissions"
      chartType="bar"
      showFullScreen={false}
      fromDate={fromDate}
      toDate={toDate}
      netCO2="Net CO2e"
      uom="CO2e kg"
    />
  );
};
