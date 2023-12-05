import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import { PERMISSIONS, SettingKeys } from '@tymlez/common-libs';
import { IDovu, IFindResult } from '@tymlez/platform-api-interfaces';
import { SettingService } from '../settings/setting.service';
import { DovuService } from './dovu.service';

@Controller('dovu')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class DovuController {
  constructor(
    private dovuService: DovuService,
    private settingService: SettingService,
  ) {}

  @Get()
  @Permissions(PERMISSIONS.DOVU_READ, PERMISSIONS.ALL_RESOURCE_WRITE)
  async getAll(): Promise<IFindResult<IDovu>> {
    return this.dovuService.getAll();
  }

  @Get('purchased')
  @Permissions(PERMISSIONS.DOVU_READ, PERMISSIONS.ALL_RESOURCE_WRITE)
  async getCarbonOffsetPurchased(): Promise<number> {
    return this.dovuService.getCarbonOffsetPurchased();
  }

  @Get('path')
  @Permissions(PERMISSIONS.DOVU_READ, PERMISSIONS.ALL_RESOURCE_WRITE)
  async getLinkPath(): Promise<string | undefined> {
    const existingPathSetting = await this.settingService.getDetailByName(
      SettingKeys.DOVU_LINK,
    );
    return existingPathSetting?.value;
  }
}
