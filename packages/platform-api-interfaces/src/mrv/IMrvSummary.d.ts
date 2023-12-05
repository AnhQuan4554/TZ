import type { SafeNumber } from '../data-type';

export type IMrvSummary = {
  policyTag: string;
  totalCO2Emission: SafeNumber;
  totalCO2Reduction: SafeNumber;
  readingValue: SafeNumber;
  mrvAggregation: SafeNumber;
};

export type IPendingMrv = {
  id: string;
  tag: string;
  count: number;
};
