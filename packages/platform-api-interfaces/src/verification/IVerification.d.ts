import type { SafeNumber, ISafeDate } from '../data-type';

export type VerificationPeriod = 'all' | '24h';

export interface IVerification {
  date?: string;
  records: Array<IVpRecord>;
  num: SafeNumber;
  isRealtime?: boolean;
}

export interface IVcRecord {
  vcId?: string;
  readingId?: string;
  waterPumped?: SafeNumber;
  CO2eqEmissions: SafeNumber;
  CO2Emissions: SafeNumber;
  CH4Emissions: SafeNumber;
  N2OEmissions: SafeNumber;
  emissionsUOM: string;
  intervalEndDateTime: ISafeDate;
  intervalStartDateTime: ISafeDate;
  intervalDuration: SafeNumber;
  intervalDurationUOM: string;
  value: SafeNumber;
  valueUOM: string;
  otherMRVData: json;
  CO2eqEmissionsReduction: SafeNumber;
  emissionsReductionUOM: string;
}

export interface IVpRecord {
  hash: string;
  vpId: string;
  mintedDate: ISafeDate;
  tokenId: string;
  energyType: string;
  CO2eqEmissions: SafeNumber;
  CO2Emissions: SafeNumber;
  CH4Emissions: SafeNumber;
  N2OEmissions: SafeNumber;
  waterPumped?: SafeNumber;
  policy: string;
  onChainUrl?: string;
  messageId?: string;
  vcRecords: Array<IVcRecord>;
  timestamp: ISafeDate;
  value: SafeNumber;
  CO2eqEmissionsReduction: SafeNumber;
  energyValue?: SafeNumber;
  renewableEnergyValue?: SafeNumber;
  gridEnergyValue?: SafeNumber;
  otherMRVData?: json;
}
