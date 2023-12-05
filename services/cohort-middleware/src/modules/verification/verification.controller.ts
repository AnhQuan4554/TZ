import {
  CacheTTL,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import { EnumPolicyNames, PERMISSIONS } from '@tymlez/common-libs';
import type {
  IIsoDate,
  IVerification,
  IVerificationQuery,
} from '@tymlez/platform-api-interfaces';
import { PlatformService } from '../platform/platform.service';

@Controller('verification')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class VerificationController {
  constructor(private platformService: PlatformService) {}

  @Get()
  @CacheTTL(3600) // 60min
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getVerification(
    @Query('from') from: IIsoDate,
    @Query('to') to: IIsoDate,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ): Promise<IVerification> {
    const query: IVerificationQuery = {
      from,
      to,
      page,
      pageSize,
      showVcRecords: true,
      policy: EnumPolicyNames.Tymlez_CET,
    };

    return await this.platformService.getDatabaseVerification(query);
  }
}
