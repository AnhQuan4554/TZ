import type {
  ITimeSpanSec,
  ITimestampSec,
  SafeNumber,
} from '@tymlez/platform-api-interfaces';

interface IMagnumMetric {
  meter_type: string;
  uom: string;
  duration: ITimeSpanSec;
  meta: string;
  value: SafeNumber;
}
export enum MagnumProcessNameEnum {
  Dryer = 'Dryer',
  Grinder = 'Grinder',
  Pyrolyser = 'Pyrolyser',
  Crusher = 'Crusher',
  EVF = 'EVF',
  Mill = 'Mill',
  MortarPump = 'MortarPump',
  MagSep = 'MagSep',
  CharMill = 'CharMill',
  SRV = 'SRV',
  OGC = 'OGC',
  Boiler = 'Boiler',
  OreDryer = 'OreDryer',
  OxygenPlant = 'OxygenPlant',
  Compressor = 'Compressor',
  HotBlastStoves = 'HotBlastStoves',
  OtherUsers = 'OtherUsers',
  FGD = 'FGD',
}

export enum MagnumMetricNameEnum {
  biomass = 'biomass',
  biochar = 'biochar',
  electricity = 'electricity',
  dried_biomass = 'dried_biomass',
  emissions = 'emissions',
  ground_biomass = 'ground_biomass',
  iron_ore = 'iron_ore',
  crushed_ore = 'crushed_ore',
  fine_iron_ore = 'fine_iron_ore',
  iron_conc = 'iron_conc',
  srv_offgas = 'srv_offgas',
  char = 'char',
  dried_iron_ore = 'dried_iron_ore',
  lime = 'lime',
  pig_iron = 'pig_iron',
  slag = 'slag',
  ogc_offgas = 'ogc_offgas',
  oxygen = 'oxygen',
  cold_blast = 'cold_blast',
  combustion_air = 'combustion_air',
  hot_air_blast = 'hot_air_blast',
  gypsum = 'gypsum',
}

type MagnumProcessData = {
  [key in MagnumProcessNameEnum]?: {
    input: { [key1 in MagnumMetricNameEnum]?: IMagnumMetric };
    output: { [key2 in MagnumMetricNameEnum]?: IMagnumMetric };
  };
};

export interface IMagnumData extends MagnumProcessData {
  timestamp: ITimestampSec;
}
