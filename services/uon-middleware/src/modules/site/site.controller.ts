import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import type {
  ISite,
  IMultiValueHttpResponse,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
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
}
