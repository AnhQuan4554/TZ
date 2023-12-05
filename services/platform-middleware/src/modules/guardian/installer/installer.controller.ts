import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import type {
  IMutationResult,
  IInstaller,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { InstallerService } from './installer.service';
import { CreateInstallerDto, UpdateInstallerDto } from '../dto/installer.dto';

@Controller('installer')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class InstallerController {
  constructor(private installerService: InstallerService) {}

  @Get()
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async getAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<IInstaller>> {
    return await this.installerService.getAll(page, pageSize);
  }

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async addInstaller(
    @Body() installer: CreateInstallerDto,
  ): Promise<IMutationResult> {
    return await this.installerService.addInstaller(installer);
  }

  @Get('/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async getInstallerById(@Param('id') id: string): Promise<IInstaller | null> {
    return await this.installerService.getInstallerById(id);
  }

  @Put('/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async updateInstaller(
    @Body() installer: UpdateInstallerDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (installer.id === undefined) {
      return {
        success: false,
        message:
          'Cannot update installer. Internal server error -  no installer id',
      };
    }

    if (id !== installer.id) {
      return {
        success: false,
        message: 'Installer to be updated does not match. Please check!',
      };
    }

    return await this.installerService.updateInstaller(installer);
  }

  @Post('/publish/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(@Param('id') id: string): Promise<IMutationResult> {
    return await this.installerService.publishInstaller(id);
  }
}
