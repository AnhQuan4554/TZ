import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';
export const Permissions = <T extends string>(...permissions: T[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
