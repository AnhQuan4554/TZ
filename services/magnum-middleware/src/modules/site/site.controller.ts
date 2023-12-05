import assert from 'assert';
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
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const currentDate = `${dd}-${mm}-${yyyy}`;

    assert(trustchainDefaultNetwork, 'Trust Chain default network not found');
    return {
      name: 'Magnum Buena Vista Magnetite - Digital Twin',
      about:
        'The Buena Vista Magnetite Iron Ore and HIsmelt Pig Iron Project is in the US State of Nevada. Using 100% sustainably sourced and manufactured biochar and fine iron ore, the facility produces green pig iron using the HIsmelt technology.',
      profileImage: './images/magnum-profile.png',
      bannerImage: './images/magnum-banner.png',
      network: trustchainDefaultNetwork,
      dateDeployed: currentDate,
    };
  }
}
