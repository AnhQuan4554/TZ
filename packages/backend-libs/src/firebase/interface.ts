import type { DecodedIdToken } from 'firebase-admin/auth';

export interface IAuthService {
  getProfile(token: DecodedIdToken): Promise<any>;
  validateToken(token: string): Promise<boolean>;
}
