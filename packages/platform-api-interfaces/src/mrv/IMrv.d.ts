export interface IMrv {
  id: number;
  deviceId: string;
  readingId: string;
  readingDate: string;
  intervalStartDateTime: string;
  intervalEndDateTime: string;
  intervalDuration: number;
  intervalDurationUOM: string;
  value: number;
  valueUOM: string;
  quality: string;
  greenhouseGasEmissionsScope: string;
  greenhouseGasEmissionsSource: string;
  CO2Emissions: number;
  CH4Emissions?: number;
  N2OEmissions?: number;
  CO2eqEmissions: number;
  CO2eqEmissionsTYMLEZ: number;
  emissionsUOM: string;
  emissionsFactorsLink?: string;
  CO2eqFormula: string;
  CO2eqFormulaLink?: string;
  CO2eqEmissionsReduction?: number;
  emissionsReductionUOM?: string;
  sourceData: any;
  otherMRVData?: string;
  validated?: boolean;
  validationError?: string;
  sent?: boolean;
  sendError?: string;
  dataSourceType?: string;
  documentProof?: any;
  isApproved?: boolean;
  policyTag?: string;
}
