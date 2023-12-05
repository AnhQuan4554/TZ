import type { ISafeDate, SafeNumber, UUID } from '../data-type';

export interface IDovu {
  id: UUID;
  signature: string;
  partnerIdentifier: string;
  customerReference: string;
  retirementTx: string;
  retiredKgs: SafeNumber;
  reserveRemainingKg: SafeNumber;
  createdAt: ISafeDate;
  stateProof: string;
}
