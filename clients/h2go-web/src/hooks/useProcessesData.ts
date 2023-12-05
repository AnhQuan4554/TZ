import axios from 'axios';
import { useQuery } from 'react-query';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';

const processIcons: Record<string, string> = {
  'Water & Alkaline Treatment':
    '/icons/production-process/water-alkaline-treatment.svg',
  Electrolysis: '/icons/production-process/electrolysis.svg',
  'Gas Purification': '/icons/production-process/gas-purification.svg',
  Compression: '/icons/production-process/compression.svg',
  'Energy consumption': '/icons/production-process/energy-consumption.svg',
  'Carbon emission': '/icons/production-process/carbon-emission.svg',
};

export interface IProcess {
  name: string;
  group: string;
  step: number;
  metrics: IProcessMetric[];
}

export interface IProcessMetric {
  label: string;
  keys: string[];
  uom: string;
  value: number;
}

export function useProcessData(from: IIsoDate | null, to: IIsoDate | null) {
  const params = { from, to };
  return useQuery(
    ['process-carbon', params],
    async () => {
      const { data } = await axios.get<IProcess[]>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/metric/processes`,
        { params },
      );

      return data.map((item) => ({
        title: item.name,
        step: item.step,
        icon: processIcons[item.name],
        lines: item.metrics.map((x) => ({
          ...x,
          icon: processIcons[x.label],
          value: Math.round(x.value),
          uom: x.uom,
        })),
        group: item.group,
      }));
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
