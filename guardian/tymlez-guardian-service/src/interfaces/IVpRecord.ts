import type { IMrvSetting } from './IMrvSetting';

export interface IVpRecord {
  hash: string;
  vpId: string;
  mintedDate: string;
  tokenId: string;
  vcRecords: IMrvSetting[];
  timestamp: Date;
  energyType: string;
  energyValue: number;
  CO2Emissions?: number;
  CH4Emissions?: number;
  N2OEmissions?: number;
  CO2eqEmissionsReduction?: number;
  onChainUrl?: string;
  messageId: string;
  policy: string;
}

export interface IVpDocument {
  createDate: string;
  document: any;
  hash: string;
  id: string;
  owner: string;
  policyId: string;
  signature: string;
  status: string;
  tag: string;
  type: string;
  updateDate: string;
  messageId: string;
}

export interface IBlockData {
  data: IVpDocument[];
}

export interface ITrustchainReport {
  data: ITrustchainDocument;
}
export interface ITrustchainDocument {
  vpDocument: ITrustchainData;
}
export interface ITrustchainData {
  document: IVpDocument;
}

export interface IVerifiableCredential {
  id: string;
  issuanceDate: string;
  issuer: string;
  credentialSubject: any;
}
