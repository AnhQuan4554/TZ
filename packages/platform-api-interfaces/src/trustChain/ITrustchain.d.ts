import type {
  IGuardianTokenMintInfo,
  IGuardianPolicyInfo,
  IGuardianSite,
  IGuardianProject,
  IGuardianDevice,
  IGuardianInstaller,
  IGuardianMRVSummary,
  IGuardianVPInfo,
} from '@tymlez/trustchain-sdk';
import { IIsoDate } from '../data-type';

export interface ITrustChainTokenRecord {
  transactionId: string;
  transactionHash: string;
  name: string;
  entityId: string;
  memo: string;
  consensusTimestamp: string;
  symbol: string;
  tokenId: string;
  type: string;
  rootAuthority: string;
  adminKey: any;
  vpDocument: string;
  mintedToken: any;
  cachedTimestamp: IIsoDate;
  topicId: string;
  cachingMethod: string;
}

export interface ITrustChainTokenRecordHashed extends ITrustChainTokenRecord {
  vpDocument: any;
  hashId: any;
  topicMessages: any;
  filteredTopicMessages: any;
  dragonGlassLink: string;
  ledgerWorksLink: string;
}

export interface ITrustChainTopicRecord {
  topicId: string;
  messages: string;
  cachedTimestamp: IIsoDate;
}

export interface ITrustChainTopicExpandedRecord {
  topicId: string;
  messages: any[];
  cachedTimestamp: IIsoDate | null | undefined;
}

// New Interfaces

export interface ITrustchainToken {
  id: string;
  tokenClassId: string;
  tokenSymbol: string;
  value: number;
  valueUOM: string;
  accountId: string;
  transactionDatetime: string;
  consensusDatetime: string;
  consensusTimestamp: string;
  messageId: string;
  transactionId: string;
  tokenMintInfo: IGuardianTokenMintInfo;
  policyInfo: IGuardianPolicyInfo | undefined;
  site: IGuardianSite | undefined;
  project: IGuardianProject | undefined;
  devices: { count: number; items: IGuardianDevice[] };
  installers: { count: number; items: IGuardianInstaller[] };
  mrvSummary: IGuardianMRVSummary;
  vpInfo: IGuardianVPInfo;
  createdBy: string;
}

export interface ITrustchainMRV {
  id: string;
  category: string;
  name: string;
  datetime: string;
  deviceId: string;
  deviceDid: string;
  readingHashes: string;
  intervalStartDatetime: string;
  intervalEndDatetime: string;
  intervalDuration: number;
  intervalDurationUOM: string;
  value: number;
  valueUOM: string;
  emission: number;
  emissionUOM: string;
  otherMRVData: { [key: string]: number };
  rawData: { [key: string]: number };
  siteId: string;
  tokenClassId: string;
  accountId: string;
  transactionId: string;
}
