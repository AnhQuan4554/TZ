import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  ISite,
  IMultiValueHttpResponse,
  ITrustChainSite,
} from '@tymlez/platform-api-interfaces';
import assert from 'assert';
import { PERMISSIONS, SettingKeys } from '@tymlez/common-libs';
import { PlatformService } from '../platform/platform.service';

@Controller('sites')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class SiteController {
  constructor(private platformService: PlatformService) {}

  @Get('/')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getSites(): Promise<IMultiValueHttpResponse<ISite>> {
    const sites = await this.platformService.getSites();
    return {
      success: true,
      count: sites.count,
      data: sites.data,
    };
  }

  @Get('/trust-chain')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async getTrustChainSite(): Promise<ITrustChainSite> {
    const [trustchainDefaultNetwork] =
      await this.platformService.getSettingByNames([
        SettingKeys.TRUSTCHAIN_DEFAULT_NETWORK,
      ]);

    assert(trustchainDefaultNetwork, 'Trust Chain default network not found');
    return {
      name: 'Solar Farm Facility',
      about:
        'The Solar Farm Facility is a ground-mounted solar project with a 6.5MW solar array, spread over an area of 65 acres. The project consists of 20,000 solar modules',
      profileImage: './images/solar-farm.jpg',
      bannerImage: './images/solar-farm-banner.jpeg',
      network: trustchainDefaultNetwork,
      dateDeployed: '01-01-2023',
    };
  }
}
