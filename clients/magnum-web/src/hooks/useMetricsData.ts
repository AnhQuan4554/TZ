import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';
import type { ISummaryItem } from './useSummaryData';

const biocharIcon: Record<string, string> = {
  'Biomass In': '/icon/biochar/factory.svg',
  'Energy consumption': '/icon/energy.svg',
  'Biochar Produced': '/icon/biochar/biocharproduced.svg',
  'CO2eq Emissions': '/logo/carbon.svg',
  'Net CO2eq': '/icon/net-co2.svg',
  'CO2eq Abated': '/icon/abated-co2.svg',
};

const ironOreIcon: Record<string, string> = {
  'Iron Ore In': '/icon/ironore/ironorein.svg',
  'Iron Ore Produced': '/icon/ironore/ironorepowerproduced.svg',
  'Energy consumption': '/icon/energy.svg',
  'CO2eq Emissions': '/logo/carbon.svg',
  'Net CO2eq': '/icon/net-co2.svg',
  'CO2eq Abated': '/icon/abated-co2.svg',
};
const pigIronIcon: Record<string, string> = {
  'Iron Ore In': '/icon/ironore/ironorein.svg',
  'Pig Iron Produced': '/icon/pigironproduced60x60.svg',
  'Energy consumption': '/icon/energy.svg',
  'Energy production': '/icon/pigiron/boiler-electricity-production.svg',
  'CO2eq Emissions': '/logo/carbon.svg',
  'Biochar In': '/icon/biochar/biocharproduced.svg',
  'Net CO2eq': '/icon/net-co2.svg',
  'CO2eq Abated': '/icon/abated-co2.svg',
};

const masterIconSet: any = {
  biochar: biocharIcon,
  ironore: ironOreIcon,
  hismelt: pigIronIcon,
};
export function useMetricsData(
  processName: string,
  from: IIsoDate | null,
  to: IIsoDate | null,
): UseQueryResult<any[]> {
  const params = { from, to };
  return useQuery(
    ['metric-carbon', params, processName],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/${processName}/summary`,
        { params },
      );

      const iconMap = masterIconSet[processName];

      return data.data.summary.map((item: ISummaryItem) => ({
        title: item.label,
        icon: iconMap[item.label],
        ...item,
      }));
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
