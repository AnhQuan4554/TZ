import axios from 'axios';
import { useQuery } from 'react-query';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import type { ISummaryItem } from './useSummaryData';

const metricsInputIcons: Record<string, string> = {
  Water: '/icons/metrics-input/water.svg',
  'Green Energy': '/icons/metrics-input/greenEnergy.svg',
  'Fossil Energy': '/icons/metrics-input/fossilEnergy.svg',
  'Hydrogen Produced': '/icons/metrics-input/hydrogenProduced.svg',
};

const metricsInputBackgrounds: Record<string, string> = {
  Water: 'rgba(174, 208, 255, 0.1)',
  'Green Energy': 'rgba(251, 186, 88, 0.1)',
  'Fossil Energy': 'rgba(99, 101, 108, 0.1)',
  'Hydrogen Produced': '#75A640',
};

export function useMetricsData(from: IIsoDate | null, to: IIsoDate | null) {
  const params = { from, to };
  return useQuery(
    ['metric-carbon', params],
    async () => {
      const { data } = await axios.get<ISummaryItem[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/metrics-input`,
        { params },
      );

      return data.map((item: ISummaryItem) => ({
        title: item.label,
        icon: metricsInputIcons[item.label],
        background: metricsInputBackgrounds[item.label],
        ...item,
      }));
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
