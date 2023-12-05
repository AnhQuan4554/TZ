import type { SafeNumber, SafeDate } from '../data-type';

export interface IValidatedUser {
  id: string;
  user_id?: string;
  email: string;
  roles: string[];
  permissions?: string[];
  clientName: string;
  timeout: SafeNumber;
  name: string;
  emailVerified: boolean;
  firebase?: {
    sign_in_provider: string;
    tenant: string;
  };
  lastLogin: SafeDate;
}

export interface IMicrosoftUser extends IValidatedUser {
  groups: string[];
}
