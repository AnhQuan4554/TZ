import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  CacheInterceptor,
  CacheTTL,
  Param,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  IIsoDate,
  IVcRecord,
  IVerification,
  IVerificationDetailQuery,
  IVerificationQuery,
  IVpRecord,
} from '@tymlez/platform-api-interfaces';
import { EnumPolicyNames, PERMISSIONS } from '@tymlez/common-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Controller('verification')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
export class VerificationController {
  constructor(private platformService: PlatformService) {}

  @Get()
  @CacheTTL(3600) //60min
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
      accumulativeFields: ClientSettings.accumulativeFields,
      showVcRecords: false,
      policy: EnumPolicyNames.Tymlez_REC,
    };

    const data = await this.platformService.getDatabaseVerification(query);

    return {
      isRealtime: data.isRealtime,
      num: data.num,
      records: data.records.map((r: IVpRecord, id) => {
        return {
          id,
          ...r,
        };
      }),
    };
  }

  @Get(':hash')
  @CacheTTL(86400)
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getVcRecords(@Param('hash') hash: string): Promise<IVpRecord> {
    const query: IVerificationDetailQuery = {
      policy: EnumPolicyNames.Tymlez_REC,
      hash,
      accumulativeFields: ClientSettings.accumulativeFields,
    };

    const vp = await this.platformService.getDatabaseVpRecord(query);
    vp.vcRecords = vp.vcRecords.map((v: IVcRecord) => {
      return {
        ...v,
      };
    });
    return vp;
  }
}
