import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IMutationResult,
  IDevice,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { deleteFileFromS3, storeFileToS3, logger } from '@tymlez/backend-libs';
import { format } from 'date-fns';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { Device } from '../entities/device.entity';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto';
import { FileService } from '../../file/file.service';
import { InstallerService } from '../installer/installer.service';
import { UserService } from '../../auth/user/user.service';
import { GuardianSiteService } from '../site/site.service';
import { MeterService } from '../../meter/meter.service';
import { GuardianService } from '../guardian.service';

@Injectable()
export class DeviceService {
  public storageS3BucketName: string;

  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: EntityRepository<Device>,

    private readonly em: EntityManager,
    private readonly fileService: FileService,
    private readonly installerService: InstallerService,
    private readonly siteService: GuardianSiteService,
    private readonly userService: UserService,
    private readonly meterService: MeterService,
    private readonly guardianService: GuardianService,
  ) {
    this.storageS3BucketName = process.env.ASSET_BUCKET_NAME || 'local';
  }

  public async addDevice(
    device: CreateDeviceDto,
    userId: string,
  ): Promise<IMutationResult> {
    const existingDeviceId = await this.getDeviceByDeviceId(device.deviceId);
    if (existingDeviceId !== null) {
      return {
        success: false,
        message: 'Device Id already exists. Please input another device id!',
      };
    }
    if (new Date(device.certificationExpiryDate).getTime() < Date.now()) {
      return {
        success: false,
        message: 'Certification Date is expired. Please check!',
      };
    }
    const site = await this.siteService.getSiteDetail(device.siteId);
    if (site === null) {
      return {
        success: false,
        message: 'Site does not exist',
      };
    }
    const installer = await this.installerService.getInstallerById(
      device.installerId,
    );
    if (installer === null) {
      return {
        success: false,
        message: 'Installer does not exist',
      };
    }

    const createdBy = await this.userService.getUserById(userId);
    const newDevice = this.em.create(Device, {
      deviceId: device.deviceId,
      site,
      installer,
      deviceType: device.deviceType,
      deviceName: device.deviceName,
      deviceDescription: device.deviceDescription,
      make: device.make,
      model: device.model,
      serialNumber: device.serialNumber,
      certificationExpiryDate: device.certificationExpiryDate,
      otherDeviceData: device.otherDeviceData,
      createdBy,
      tags: ['initial'],

      certification: await this.storeFile(
        device.deviceId,
        device.certification.name,
        device.certification.content as string,
      ),

      isPublished: false,
    } as any);
    try {
      await this.em.persistAndFlush(newDevice);
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

  public async getAll(
    page: number,
    pageSize: number,
  ): Promise<IFindResult<IDevice>> {
    try {
      const [devices, count] = await this.deviceRepository.findAndCount(
        {},
        {
          orderBy: { deviceName: 'ASC' },
          limit: pageSize,
          offset: page * pageSize,
          populate: true,
        },
      );
      return {
        count,
        data: devices,
      };
    } catch (err: any) {
      logger.error(err, 'Get all devices failed!');
      return { count: 0, data: [] };
    }
  }

  public async getDeviceById(id: string): Promise<IDevice | null> {
    try {
      return await this.deviceRepository.findOne(
        {
          id,
        },
        { populate: true },
      );
    } catch (err: any) {
      logger.error(err, 'Get device by Id failed!');
      return null;
    }
  }

  public async updateDevice(device: UpdateDeviceDto): Promise<IMutationResult> {
    const existingDevice = await this.getDeviceById(device.id);
    if (existingDevice === null) {
      return {
        success: false,
        message: 'Device does not exist. No device to update',
      };
    }
    if (existingDevice.deviceId !== device.deviceId) {
      const existingDeviceId = await this.getDeviceByDeviceId(device.deviceId);
      if (existingDeviceId !== null) {
        return {
          success: false,
          message: 'Device Id already exists. Please input another device id!',
        };
      }
    }
    const site = await this.siteService.getSiteDetail(device.siteId);

    if (site === null) {
      return {
        success: false,
        message: 'Site does not exist',
      };
    }

    const installer = await this.installerService.getInstallerById(
      device.installerId,
    );
    if (installer === null) {
      return {
        success: false,
        message: 'Installer does not exist',
      };
    }

    //if certification is updated, remove the old one in S3 and update the new one
    if (existingDevice.certification.name !== device.certification.name) {
      await this.deleteFile(device.deviceId, device.certification.name);

      // eslint-disable-next-line no-param-reassign
      device.certification = await this.storeFile(
        device.deviceId,
        device.certification.name,
        device.certification.content as string,
      );
    }

    try {
      Object.assign(existingDevice, device);
      try {
        existingDevice.site = site;
      } catch (err: any) {
        return {
          success: false,
          message: err.message,
        };
      }
      existingDevice.installer = installer;

      await this.em.persistAndFlush(existingDevice);
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

  public async publishDevice(id: string): Promise<IMutationResult> {
    const device = await this.getDeviceById(id);
    if (device === null) {
      return {
        success: false,
        message: `No device to be published`,
      };
    }

    const isSitePublished = await this.siteService.isSitePublished(
      device.site.id,
    );
    if (!isSitePublished) {
      return {
        success: false,
        message: `The site is not published. Please check!`,
      };
    }

    const installer = await this.installerService.getPublishedInstaller(
      device.installer.installerId,
    );
    if (installer === null) {
      return {
        success: false,
        message: `The installer is not published. Please check!`,
      };
    }

    device.certificationExpiryDate = format(
      device.certificationExpiryDate,
      'yyyy-MM-dd',
    );

    const certification = (
      await this.fileService.getFile(device.certification.url)
    ).content?.toString('base64');
    try {
      await this.guardianService.makeGuardianRequest(
        'installer/device',
        'post',
        {
          installerId: installer.installerId,
          siteId: device.site.id,
          certification,
          deviceId: device.deviceId,
          deviceType: device.deviceType,
          deviceName: device.deviceName,
          make: device.make,
          model: device.model,
          serialNumber: device.serialNumber,
          certificationExpiryDate: device.certificationExpiryDate,
        },
      );
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data.message,
      };
    }
    //update isPublished to true
    await this.updatePublishedSuccess(device);

    return {
      success: true,
      message: `Device published!`,
    };
  }

  private async updatePublishedSuccess(
    device: IDevice,
  ): Promise<IMutationResult> {
    const qb = (this.em as SqlEntityManager)
      .createQueryBuilder(Device)
      .update({ isPublished: true })
      .where({
        device_id: device.deviceId,
      });

    try {
      await qb.execute();
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

  public async getPublishedDevice(deviceId: string): Promise<IDevice | null> {
    const device = await this.getDeviceById(deviceId);
    if (device === null) {
      return null;
    }

    let publishedDevices: IDevice[] = [];
    try {
      publishedDevices = await this.guardianService.makeGuardianRequest(
        `installer/${device.installer.installerId}/devices`,
        'get',
      );
    } catch (err: any) {
      return null;
    }
    if (publishedDevices.length === 0) {
      return null;
    }
    const publishedDevice = publishedDevices.find(
      (x) => x.deviceId === deviceId,
    );
    return publishedDevice === undefined ? null : publishedDevice;
  }

  public async getDeviceByDeviceId(deviceId: string): Promise<IDevice | null> {
    try {
      return await this.deviceRepository.findOne(
        {
          deviceId,
        },
        { populate: true },
      );
    } catch (err: any) {
      logger.error(err, 'Get device by Device Id failed!');
      return null;
    }
  }

  public async export(): Promise<Device[]> {
    try {
      const data = await this.deviceRepository.find(
        {},
        {
          orderBy: { deviceId: 'ASC' },
        },
      );
      data.map((x) => {
        // eslint-disable-next-line no-param-reassign
        x.isPublished = false;
        return x;
      });
      return data;
    } catch (err: any) {
      logger.error(err, 'Export devices failed');
      return [];
    }
  }

  private async storeFile(deviceId: string, filename: string, content: string) {
    return await storeFileToS3(
      this.storageS3BucketName,
      `device/${deviceId}/${filename}`,
      Buffer.from(content, 'base64'),
    );
  }

  private async deleteFile(deviceId: string, filename: string) {
    return await deleteFileFromS3(
      this.storageS3BucketName,
      `device/${deviceId}/${filename}`,
    );
  }

  public async getDevicesWithoutMetersByInstaller(
    id: string,
  ): Promise<IDevice[]> {
    const devices = await this.deviceRepository.find({
      installer: id,
    });
    return await this.getDevicesWithoutMeters(devices);
  }

  public async getDevicesWithoutMetersByGuardianSite(
    id: string,
  ): Promise<IDevice[]> {
    const devices = await this.deviceRepository.find({
      site: id,
    });
    return await this.getDevicesWithoutMeters(devices);
  }

  private async getDevicesWithoutMeters(
    devices: IDevice[],
  ): Promise<IDevice[]> {
    const data: IDevice[] = [];
    await Promise.all(
      devices.map(async (device) => {
        const meters = await this.meterService.getMetersByDevice(device.id);
        if (meters.length === 0) {
          data.push(device);
        }
      }),
    );

    return data;
  }

  public async getDevicesMetersByInstaller(id: string): Promise<IDevice[]> {
    const devices = await this.deviceRepository.find({
      installer: id,
    });
    return await this.getDevicesWithMeters(devices);
  }

  public async getDevicesMetersByGuardianSite(id: string): Promise<IDevice[]> {
    const devices = await this.deviceRepository.find({
      site: id,
    });
    return await this.getDevicesWithMeters(devices);
  }

  private async getDevicesWithMeters(devices: IDevice[]): Promise<IDevice[]> {
    const data: IDevice[] = [];
    await Promise.all(
      devices.map(async (device) => {
        const meters = await this.meterService.getMetersByDevice(device.id);
        if (meters.length > 0) {
          data.push(device);
        }
      }),
    );

    return data;
  }
}
