import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  IVerification,
  IVerificationDetailQuery,
  IVerificationQuery,
  IVpRecord,
} from '@tymlez/platform-api-interfaces';
import { EnumPolicyNames, PERMISSIONS } from '@tymlez/common-libs';
import _ from 'lodash';
import { PlatformService } from '../platform/platform.service';

@Controller('verification')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
export class VerificationController {
  constructor(private platformService: PlatformService) {}

  @Get('/')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(3600) //60min
  async getVerification(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('mocked', ParseBoolPipe) mocked: boolean,
  ): Promise<IVerification> {
    const query: IVerificationQuery = {
      page,
      pageSize,
      mocked,
    };

    return await this.platformService.getDatabaseVerification(query);
  }

  @Get(':hash')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(86400) //24h
  async getVcRecords(
    @Param('hash') hash: string,
    @Query('mocked', ParseBoolPipe) mocked: boolean,
  ): Promise<IVpRecord> {
    const query: IVerificationDetailQuery = {
      policy: EnumPolicyNames.Tymlez_GOO,
      hash,
      mocked,
    };

    return await this.platformService.getDatabaseVpRecord(query);
  }
}
