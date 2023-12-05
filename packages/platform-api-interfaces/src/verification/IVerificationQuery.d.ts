import type { IIsoDate, SafeNumber } from '../data-type';
import type { VerificationPeriod } from './IVerification';

export interface IVerificationQuery {
  siteId?: string;
  policy?: string;
  page?: SafeNumber;
  pageSize?: SafeNumber;
  mocked?: boolean;
  period?: VerificationPeriod;
  accumulativeFields?: string[];
  showVcRecords?: boolean;
  from?: IIsoDate;
  to?: IIsoDate;
}

export interface IVerificationDetailQuery {
  policy: string;
  hash: string;
  accumulativeFields?: string[];
  mocked?: boolean;
}
