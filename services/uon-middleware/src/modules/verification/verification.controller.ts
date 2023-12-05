import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  CacheTTL,
  Param,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import { EnumPolicyTags, PERMISSIONS } from '@tymlez/common-libs';
import type {
  IVcRecord,
  IVerification,
  IVerificationDetailQuery,
  IVerificationQuery,
  IVpRecord,
} from '@tymlez/platform-api-interfaces';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Controller('verification')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class VerificationController {
  constructor(private platformService: PlatformService) {}

  @Get()
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
      accumulativeFields: ClientSettings.accumulativeFields,
      policy: EnumPolicyTags.Tymlez_CET,
      showVcRecords: false,
    };

    const data = await this.platformService.getDatabaseVerification(query);
    return {
      num: data.num,
      records: data.records.map((r: IVpRecord, id) => ({
        id,
        ...r,
        waterPumped: r.otherMRVData[ClientSettings.metricWaterPumped],
      })),
    };
  }

  @Get(':hash')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(86400)
  async getVcRecords(
    @Param('hash') hash: string,
    @Query('mocked', ParseBoolPipe) mocked: boolean,
  ): Promise<IVpRecord> {
    const query: IVerificationDetailQuery = {
      policy: EnumPolicyTags.Tymlez_CET,
      hash,
      mocked,
      accumulativeFields: ClientSettings.accumulativeFields,
    };

    const vp = await this.platformService.getDatabaseVpRecord(query);
    vp.vcRecords = vp.vcRecords.map((v: IVcRecord) => {
      const mrvData = JSON.parse(v.otherMRVData);

      return {
        ...v,
        waterPumped: mrvData[ClientSettings.metricWaterPumped],
      };
    });
    return vp;
  }
}
