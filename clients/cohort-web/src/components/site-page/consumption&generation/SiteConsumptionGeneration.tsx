import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import {
  StaticTimeline,
  HistoryQuery,
  useSiteContext,
} from '@tymlez/frontend-libs';
import { getLastNDaysRange } from '@tymlez/common-libs';
import { useConsumptionSeries } from '../../../hooks/useConsumptionData';
import {
  makeConsumptionSeries,
  makeGenerationSeries,
} from './ConsumptionGenerationChartUtils';
import { useGenerationHistorySeries } from '../../../hooks/useGenerationHistory';

export const SiteConsumptionGeneration: FC = () => {
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

  const {
    data: consumptionData,
    isLoading,
    isError,
    error,
  } = useConsumptionSeries(from, to, 'auto');

  const { data: generationData } = useGenerationHistorySeries(from, to, 'auto');

  const consumptionSeriesData = makeConsumptionSeries(consumptionData || []);
  const generationSeriesData = makeGenerationSeries(generationData || []);

  if (isError) {
    return (
      <span>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </span>
    );
  }

  return (
    <StaticTimeline
      dataTestId="cohort-consumption-generation"
      isLoading={isLoading}
      series={[...consumptionSeriesData, ...generationSeriesData]}
      selectChartType
      yTitle="kWh"
      height="393"
      title="Consumption & Generation (simulated)"
      showFullScreen={false}
      fromDate={fromDate}
      toDate={toDate}
    />
  );
};
