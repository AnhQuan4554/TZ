import assert from 'assert';
import { CacheTTL, Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  getProxy,
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  UUID,
  ISite,
  IWeatherData,
  IMultiValueHttpResponse,
  ITrustChainSite,
} from '@tymlez/platform-api-interfaces';
import { ApiParam } from '@nestjs/swagger';
import { PERMISSIONS, SettingKeys } from '@tymlez/common-libs';
import { PlatformService } from '../platform/platform.service';

const OPEN_WEATHER_MAP_API_KEY = '908ad75f36452c11ff4306cd53162218';

@Controller('sites')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class SiteController {
  constructor(private platformService: PlatformService) {}

  @ApiParam({ name: 'siteId' })
  @Get(':siteId/weather')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(3600)
  async weather(@Param('siteId') siteId: UUID): Promise<IWeatherData> {
    const site = await this.platformService.getSite(siteId);

    let url = 'https://api.openweathermap.org/data/2.5/weather';

    url += `?lat=${site?.lat}&lon=${site?.lng}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`;

    return getProxy<IWeatherData>(url, '', '');
  }

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
      name: 'Cohort Innovation Space',
      about:
        'Cohort Innovation Space, located at 16 Nexus Way Southport QLD,  comprises of 3 buildings and over 2500m2 NLA. Energy is monitored across all buildings which tracks the usage of 46 coworking desks, 21 private offices with a further 76 desks, an AI lab with 8 desks, 3 PC1 and PC3 scientific labs with 18 desks, 4 meeting rooms, 2 boardrooms, a 150 person event space, podcast and live streaming studio, an elevator, bike racks, showers and end of trip facilities.',
      profileImage: './images/cohort_project.png',
      bannerImage: './images/cohort_banner.png',
      network: trustchainDefaultNetwork,
      dateDeployed: currentDate,
    };
  }
}
