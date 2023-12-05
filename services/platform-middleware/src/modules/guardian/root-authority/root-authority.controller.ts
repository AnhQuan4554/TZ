import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import {
  IMutationResult,
  IRootAuthority,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import {
  CreateRootAuthorityDto,
  UpdateRootAuthorityDto,
} from '../dto/root-authority.dto';
import { RootAuthorityService } from './root-authority.service';

@Controller('root-authority')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class RootAuthorityController {
  constructor(private rootAuthorityService: RootAuthorityService) {}

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async addRootAuthority(
    @Body() root: CreateRootAuthorityDto,
  ): Promise<IMutationResult> {
    if (root.rootAuthorityId === undefined) {
      return {
        success: false,
        message:
          'Cannot add root authority. Internal server error -  no root authority id',
      };
    }
    return await this.rootAuthorityService.addRootAuthority(root);
  }

  @Put()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async updateRootAuthority(
    @Body() root: UpdateRootAuthorityDto,
  ): Promise<IMutationResult> {
    if (root.rootAuthorityId === undefined) {
      return {
        success: false,
        message:
          'Cannot update root authority. Internal server error -  no root authority id',
      };
    }
    return await this.rootAuthorityService.updateRootAuthority(root);
  }

  @Post('/publish')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(): Promise<IMutationResult<boolean>> {
    return await this.rootAuthorityService.publishRootAuthority();
  }

  @Get()
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getRootAuthority(): Promise<IRootAuthority | null> {
    return await this.rootAuthorityService.getRootAuthority();
  }
}
