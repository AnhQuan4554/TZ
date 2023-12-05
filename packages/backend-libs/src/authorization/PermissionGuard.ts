import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './PermissionDecorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user.emailVerified) {
      throw new HttpException(
        `User have not verified their email address`,
        HttpStatus.FORBIDDEN,
      );
    }
    const hasPermission = requiredPermissions.some((permissionScope) =>
      user.permissions?.includes(permissionScope),
    );

    if (!hasPermission) {
      throw new HttpException(
        `Missing required permission: ${requiredPermissions.join(',')}`,
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
