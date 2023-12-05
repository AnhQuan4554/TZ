import { FC, useEffect, useState } from 'react';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import {
  StaticTimeline,
  HistoryQuery,
  useSiteContext,
} from '@tymlez/frontend-libs';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { tenancySeriesToChart } from '../../common/energy/energy-utils';
import { circuitsColorMap } from '../../common/circuit/utils';
import { useTenancyData } from '../../../hooks/useTenancyData';

export const SiteTenancy: FC = () => {
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

  const { data, isLoading } = useTenancyData(from, to, 'auto');
  const chartSeries = data ? tenancySeriesToChart(data, circuitsColorMap) : [];

  return (
    <StaticTimeline
      dataTestId="cohort-tenancy"
      isLoading={isLoading}
      series={chartSeries}
      selectChartType
      yTitle="kilowatt-hours (kWh)"
      height="393"
      title="TENANCY"
      showFullScreen={false}
      fromDate={fromDate}
      toDate={toDate}
    />
  );
};
