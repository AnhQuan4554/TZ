import type { SafeNumber } from '../data-type/SafeNumber';

export type IGuardianSummary = {
  installers: SafeNumber;
  devices: SafeNumber;
  policies: SafeNumber;
  status: string;
  rootAuthorityBalance: string;
  rootAuthorityAccountId?: string;
  entities: IGuardianEntity[];
  env: string;
};

export type IGuardianBootstrapStatus = {
  totalTimes: SafeNumber;
  clientName?: string;
  startedAt: string;
  status: string[];
  inProgress: boolean;
};

export type IGuardianEntity = {
  username: string;
  role: string;
  accountId: string;
  did: string;
  balance: string;
};
