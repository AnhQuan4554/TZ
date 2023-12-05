import { convertTimezone } from '@tymlez/common-libs';
import type { ICarbonSeries, ISeriesItem, ISolarSeries } from '@tymlez/platform-api-interfaces';
import type { ChartSerie, ChartValue } from '../repository/ChartSerie';

export const filterSeries = (
  serieNames: string[],
  seriesData?: ICarbonSeries,
  series?: ChartSerie[],
  timezone?: string | 'UTC'
): ChartSerie[] => {
  if (seriesData && series) {
    const visibleSeries = series.filter((s) => serieNames.includes(s.name));

    const transformSeries = visibleSeries.map((serie) => {
      const serieKey: string = serie.key || '';
      const multiplier: number = serie.multiplier || 1;
      const rawData = seriesData[serieKey] || [];
      const transformedData = rawData.map((data: ISeriesItem): ChartValue => {
        return {
          x: convertTimezone(new Date(data.isoDateTime), timezone),
          y: data.value * multiplier,
        };
      });

      return { ...serie, data: transformedData };
    });

    return transformSeries;
  }
  return [];
};

export const filterSolarSeries = (
  serieNames: string[],
  seriesData?: ISolarSeries,
  series?: ChartSerie[],
  timezone?: string | 'UTC'
): ChartSerie[] => {
  if (seriesData && series) {
    const visibleSeries = series.filter((s) => serieNames.includes(s.name));

    const transformSeries = visibleSeries.map((serie) => {
      const serieKey: string = serie.key || '';
      const multiplier: number = serie.multiplier || 1;
      const rawData = seriesData[serieKey] || [];
      const transformedData = rawData.map((data: ISeriesItem): ChartValue => {
        return {
          x: convertTimezone(new Date(data.isoDateTime), timezone),
          y: data.value * multiplier,
        };
      });

      return { ...serie, data: transformedData };
    });

    return transformSeries;
  }
  return [];
};
