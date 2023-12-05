import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';

const biocharIcon: Record<string, string> = {
  Quantity: '/icon/ironore/wood.svg',
  Biomass: '/icon/biochar/factory.svg',
  Drying: '/icon/biochar/drying.svg',
  Grinding: '/icon/biochar/grinding.svg',
  Pyrolysis: '/icon/pyrolysis.svg',
  'Energy consumption': '/icon/electricity.svg',
  'Carbon emission': '/icon/footprint.svg',
  'Gas emission': '/icon/pigiron/fuel_gas_out.svg',
};

const ironOreIcon: Record<string, string> = {
  'Run of Mine Stockpile': '/icon/ironore/stockpile.svg',
  Quantity: '/icon/ironore/coal.svg',
  'Magnetic Separator': '/icon/ironore/separator.svg',
  Crusher: '/icon/ironore/crusher.svg',
  'Electromagnetic Vibration Feeder': '/icon/ironore/feeder.svg',
  Mill: '/icon/ironore/mill.svg',
  'Energy consumption': '/icon/electricity.svg',
  'Carbon emission': '/icon/footprint.svg',
};

const hismeltIcon: Record<string, string> = {
  'Oxygen Plant': '/icon/pigiron/oxygen_plant.svg',
  Compressor: '/icon/pigiron/compressor_oxygen.svg',
  'Char Mill': '/icon/pigiron/char_mill.svg',
  'Ore Dryer': '/icon/pigiron/ore_dryer.svg',
  SRV: '/icon/pigiron/srv.svg',
  'Hot Blast Stoves': '/icon/pigiron/hot-blast-stoves.svg',
  FGD: '/icon/pigiron/fgd.svg',
  'Energy consumption': '/icon/electricity.svg',
  'Carbon emission': '/icon/footprint.svg',
  'SRV Offgas In': '/icon/pigiron/flame.svg',
  'OGC Offgas In': '/icon/pigiron/flame.svg',
  'Pig Iron produced': '/icon/pigiron/pig_iron_produced.svg',
  'Slag produced': '/icon/pigiron/pig_iron_produced.svg',
  'Fuel gas out': '/icon/pigiron/fuel_gas_out.svg',
  'Energy Production': '/icon/pigiron/flame.svg',
  OGC: '/icon/pigiron/ogc.svg',
  Boiler: '/icon/pigiron/boiler.svg',
  'Gas emission': '/icon/pigiron/fuel_gas_out.svg',
};

const masterIconSet: any = {
  biochar: biocharIcon,
  ironore: ironOreIcon,
  hismelt: hismeltIcon,
};
export function useProcessData(
  processName: string,
  from: IIsoDate | null,
  to: IIsoDate | null,
): UseQueryResult<any[]> {
  const params = { from, to };
  return useQuery(
    ['process-carbon', params, processName],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/${processName}/processes`,
        { params },
      );

      const iconMap = masterIconSet[processName];

      return data.data.map((item: any) => ({
        title: item.name,
        icon: iconMap[item.name],
        lines: item.metrics.map((x: any) => ({
          ...x,
          icon: iconMap[x.label],
          value: Math.round(x.value),
          uom: x.uom,
        })),
        group: item.group,
      }));
    },
    { staleTime: Infinity, refetchInterval: 30000 },
  );
}
