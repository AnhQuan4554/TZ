import { IIsoDate } from '@tymlez/platform-api-interfaces';

// TODO: Promote these to platform interface
export interface ITrustchainTokensQuery {
  hederaAccountId: string;
  startDatetime?: IIsoDate;
  endDatetime?: IIsoDate;
  tokenClassIds?: string[];
  sortOrder: 'asc' | 'desc';
}

export interface ITrustchainMRVsQuery {
  hederaAccountId: string;
  siteId?: IIsoDate;
  deviceId?: string;
  transactionId?: string;
  tokenClassIds?: string[];
  startDatetime?: IIsoDate;
  endDatetime?: IIsoDate;
}
