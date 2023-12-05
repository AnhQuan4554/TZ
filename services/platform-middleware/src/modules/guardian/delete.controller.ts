import { EntityManager } from '@mikro-orm/core';
import { Body, Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { IDevice, IMutationResult } from '@tymlez/platform-api-interfaces';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { DeviceService } from './device/device.service';
import { DeleteDeviceDto } from './dto/device.dto';
import { DeleteInstallerDto } from './dto/installer.dto';
import { DeleteGuardianSiteDto } from './dto/site.dto';
import { InstallerService } from './installer/installer.service';
import { GuardianSiteService } from './site/site.service';

@Controller('delete')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class DeleteService {
  constructor(
    private readonly em: EntityManager,
    private installerService: InstallerService,
    private deviceService: DeviceService,
    private siteService: GuardianSiteService,
  ) {}

  @Delete('/installer/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async deleteInstaller(
    @Body() installer: DeleteInstallerDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (id !== installer.id) {
      return {
        success: false,
        message: 'Installer to be deleted does not match. Please check!',
      };
    }
    const existingInstaller = await this.installerService.getInstallerById(
      installer.id,
    );

    if (existingInstaller === null) {
      return {
        success: false,
        message: 'Installer does not exist. No installer to delete',
      };
    }

    const res = await this.deleteDevicesByInstaller(installer.id);
    if (!res.success) {
      return {
        success: false,
        message: `Unable to delete Installer. ${res.message}`,
      };
    }

    try {
      await this.em.removeAndFlush(existingInstaller);
    } catch (err: any) {
      return {
        success: false,
        message: `Unable to delete Installer. ${err.message}`,
      };
    }
    return {
      success: true,
    };
  }

  private async deleteDevicesByInstaller(id: string): Promise<IMutationResult> {
    const devices = await this.deviceService.getDevicesWithoutMetersByInstaller(
      id,
    );

    return await this.deleteDevices(devices);
  }

  private async deleteDevices(devices: IDevice[]): Promise<IMutationResult> {
    if (devices.length === 0) {
      return { success: true };
    }

    const messages: string[] = [];

    await Promise.all(
      devices.map(async (x) => {
        if (x.isPublished) {
          messages.push(`Device ${x.deviceId} is already published.`);
        } else {
          try {
            await this.em.removeAndFlush(x);
          } catch (err: any) {
            messages.push(`Device ${x.deviceId}: ${err.message}`);
          }
        }
      }),
    );

    return messages.length === 0
      ? { success: true }
      : { success: false, message: messages.join(', ') };
  }

  @Delete('/device/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async deleteDevice(
    @Body() device: DeleteDeviceDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (id !== device.id) {
      return {
        success: false,
        message: 'Device to be deleted does not match. Please check!',
      };
    }

    const existingDevice = await this.deviceService.getDeviceById(device.id);

    if (existingDevice === null) {
      return {
        success: false,
        message: 'Device does not exist. No device to delete',
      };
    }

    try {
      await this.em.removeAndFlush(existingDevice);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  @Delete('/guardian-site/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async deleteGuardianSite(
    @Body() site: DeleteGuardianSiteDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (site.id === undefined) {
      return {
        success: false,
        message: 'Cannot delete site. Internal server error -  no site id',
      };
    }

    if (id !== site.id) {
      return {
        success: false,
        message: 'Site to be deleted does not match. Please check!',
      };
    }

    const existingSite = await this.siteService.getSiteDetail(site.id);
    if (existingSite === null) {
      return {
        success: false,
        message: 'Site does not exist. No site to delete',
      };
    }

    const res = await this.deleteDevicesByGuardianSite(site.id);
    if (!res.success) {
      return {
        success: false,
        message: `Unable to delete site. ${res.message}`,
      };
    }

    try {
      await this.em.removeAndFlush(existingSite);
    } catch (err: any) {
      return {
        success: false,
        message: `Unable to delete site. ${err.message}`,
      };
    }
    return {
      success: true,
    };
  }

  private async deleteDevicesByGuardianSite(
    id: string,
  ): Promise<IMutationResult> {
    const devices =
      await this.deviceService.getDevicesWithoutMetersByGuardianSite(id);
    return await this.deleteDevices(devices);
  }
}
