import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Query,
  Req,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import type {
  IMutationResult,
  IDevice,
  IValidatedUser,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { DeviceService } from './device.service';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto';

@Controller('device')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<IDevice>> {
    return await this.deviceService.getAll(page, pageSize);
  }

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async addDevice(
    @Body() device: CreateDeviceDto,
    @Req() req: Request,
  ): Promise<IMutationResult> {
    const currentUser = req.user as IValidatedUser;
    return await this.deviceService.addDevice(device, currentUser.id);
  }

  @Get('/:id')
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getDeviceById(@Param('id') id: string): Promise<IDevice | null> {
    return await this.deviceService.getDeviceById(id);
  }

  @Put('/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async updateDevice(
    @Body() device: UpdateDeviceDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (device.id === undefined) {
      return {
        success: false,
        message: 'Cannot update device. Internal server error -  no device id',
      };
    }

    if (id !== device.id) {
      return {
        success: false,
        message: 'Device to be updated does not match. Please check!',
      };
    }
    return await this.deviceService.updateDevice(device);
  }

  @Post('/publish/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(@Param('id') id: string): Promise<IMutationResult> {
    return await this.deviceService.publishDevice(id);
  }

  @Get('/getDevicesMetersByInstaller/:id')
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getDevicesMetersByInstaller(
    @Param('id') id: string,
  ): Promise<IDevice[]> {
    return await this.deviceService.getDevicesMetersByInstaller(id);
  }

  @Get('/getDevicesWithoutMetersByInstaller/:id')
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getDevicesWithoutMetersByInstaller(
    @Param('id') id: string,
  ): Promise<IDevice[]> {
    return await this.deviceService.getDevicesWithoutMetersByInstaller(id);
  }

  @Get('/getDevicesMetersByGuardianSite/:id')
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getDevicesMetersByGuardianSite(
    @Param('id') id: string,
  ): Promise<IDevice[]> {
    return await this.deviceService.getDevicesMetersByGuardianSite(id);
  }

  @Get('/getDevicesWithoutMetersByGuardianSite/:id')
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getDevicesWithoutMetersByGuardianSite(
    @Param('id') id: string,
  ): Promise<IDevice[]> {
    return await this.deviceService.getDevicesWithoutMetersByGuardianSite(id);
  }
}
