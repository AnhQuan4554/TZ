import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import type { Request } from 'express';
import { GuardianService } from './guardian.service';

@Controller('guardian-proxy')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class ProxyController {
  constructor(private readonly guardianService: GuardianService) {}

  @Get('*')
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async proxyGetRequest(@Req() req: Request): Promise<any> {
    const target = req.path.slice(req.path.lastIndexOf('CLIENT_NAME') + 12);
    return await this.guardianService.makeGuardianRequest(target, 'GET');
  }
}
