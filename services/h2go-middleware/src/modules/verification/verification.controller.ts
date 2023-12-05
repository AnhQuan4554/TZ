import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
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
  IVcRecord,
  IVerification,
  IVerificationDetailQuery,
  IVerificationQuery,
  IVpRecord,
} from '@tymlez/platform-api-interfaces';
import { EnumPolicyNames, PERMISSIONS } from '@tymlez/common-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';
import { MetricNames } from '../worker/constants';

@Controller('verification')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
@UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
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
  ): Promise<IVerification> {
    const query: IVerificationQuery = {
      page,
      pageSize,
      accumulativeFields: ClientSettings.accumulativeFields,
      showVcRecords: false,
    };
    const data = await this.platformService.getDatabaseVerification(query);

    return {
      num: data.num,
      records: data.records.map((r: IVpRecord, id) => {
        const gridEnergyValue = this.getEnergyValue(r.otherMRVData);
        const greenEnergyValue = this.getSolarEnergyValue(r.otherMRVData);
        return {
          id,
          ...r,
          gridEnergyValue,
          greenEnergyValue,
          energyValue: gridEnergyValue + greenEnergyValue,
        };
      }),
    };
  }

  @Get(':hash')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(86400)
  async getVcRecords(@Param('hash') hash: string): Promise<IVpRecord> {
    const query: IVerificationDetailQuery = {
      policy: EnumPolicyNames.Tymlez_GOO,
      hash,
      accumulativeFields: ClientSettings.accumulativeFields,
    };

    const vp = await this.platformService.getDatabaseVpRecord(query);
    vp.vcRecords = vp.vcRecords.map((v: IVcRecord) => {
      const mrvData =
        typeof v.otherMRVData === 'object'
          ? v.otherMRVData
          : JSON.parse(v.otherMRVData);
      const gridEnergyValue = this.getEnergyValue(mrvData);
      const greenEnergyValue = this.getSolarEnergyValue(mrvData);
      return {
        ...v,
        gridEnergyValue,
        greenEnergyValue,
        energyValue: gridEnergyValue + gridEnergyValue,
      };
    });
    return vp;
  }

  private getEnergyValue(data: any): number {
    return (
      (+data[MetricNames.ELECTOLYSER_ELECTRICITY_INPUT] || 0) +
      (+data[MetricNames.GAS_PURIFICATION_ELECTRICITY_INPUT] || 0) +
      (+data[MetricNames.WATER_TREATMENT_ELECTRICITY_INPUT] || 0) +
      (+data[MetricNames.COMPRESSION_ELECTRICITY_INPUT] || 0)
    );
  }

  private getSolarEnergyValue(data: any): number {
    return (
      (+data[MetricNames.ELECTOLYSER_SOLAR_INPUT] || 0) +
      (+data[MetricNames.GAS_PURIFICATION_SOLAR_INPUT] || 0) +
      (+data[MetricNames.WATER_TREATMENT_SOLAR_INPUT] || 0) +
      (+data[MetricNames.COMPRESSION_SOLAR_INPUT] || 0)
    );
  }
}
