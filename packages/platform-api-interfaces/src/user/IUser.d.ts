import type { UUID, ISafeDate, SafeNumber } from '../data-type';
import type { IClient } from '../client';
import { IRole } from '../auth';

export interface IUser {
  id: UUID;
  email: string;
  password: string;
  name: string;
  userRoles: IRole[];
  roles: string[]; //Deprecated
  client: IClient;
  timeout: SafeNumber;
  lastLogin?: ISafeDate;
  emailVerified?: boolean;
}
