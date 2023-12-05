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
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currentDate = `${dd}-${mm}-${yyyy}`;

    assert(trustchainDefaultNetwork, 'Trust Chain default network not found');
    return {
      name: 'Green Hydrogen Production Facility',
      about:
        'The Green Hydrogen Production Facility includes a 10MW electrolysis system with a target production of 4 tonnes of hydrogen per day. To support hydrogen production, this facility also includes water treatment, hydrogen purification and hydrogen compression systems. The site is powered by a 15MW solar array, and supplemented by grid energy to enable 24/7 production.',
      profileImage: './images/h2go-profile.png',
      bannerImage: './images/h2go-banner.png',
      network: trustchainDefaultNetwork,
      dateDeployed: currentDate,
    };
  }
}
