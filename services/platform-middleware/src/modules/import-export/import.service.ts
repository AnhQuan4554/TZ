/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import JSZip from 'jszip';
import {
  IDevice,
  IGuardianSite,
  IImport,
  IInstaller,
  IMeter,
  IMeterJob,
  IMutationResult,
  IPolicy,
  IProject,
  IRootAuthority,
  ISite,
  ITenancy,
  ITokenOwner,
} from '@tymlez/platform-api-interfaces';
import { EntityManager } from '@mikro-orm/core';
import { ExportEntityTypes, logger, storeFileToS3 } from '@tymlez/backend-libs';
import { runAllSettled } from '@tymlez/common-libs';
import { DeviceService } from '../guardian/device/device.service';
import { InstallerService } from '../guardian/installer/installer.service';
import { ProjectService } from '../guardian/project/project.service';
import { RootAuthorityService } from '../guardian/root-authority/root-authority.service';
import { MeterJobService } from '../meter-job/meter-job.service';
import { MeterService } from '../meter/meter.service';
import { UserService } from '../auth/user/user.service';
import { SiteService } from '../dashboard-site/site.service';
import { User } from '../auth/entities/user.entity';
import { GuardianSiteService } from '../guardian/site/site.service';
import { AuthService } from '../auth/auth.service';
import { MeterJob } from '../meter-job/entities/meter-job.entity';
import { Meter } from '../meter/entities/meter.entity';
import { Device } from '../guardian/entities/device.entity';
import { Installer } from '../guardian/entities/installer.entity';
import { TokenOwnerService } from '../guardian/token-owner/token-owner.service';
import { Tenancy } from '../tenancy/entities/tenancy.entity';
import { TenancyService } from '../tenancy/tenancy.service';
import { GuardianPolicyService } from '../guardian/policy/policy.service';

// enum fileList {
//   user = 'user.json',
//   root = 'root-authority.json',
//   owner = 'token-owner.json',
//   policy = 'policy.json',
//   project = 'project.json',
//   guardianSite = 'guardianSite.json',
//   installer = 'installer.json',
//   device = 'device.json',
//   site = 'site.json',
//   meter = 'meter.json',
//   tenancy = 'tenancy.json',
//   meterJob = 'meter-job.json',
// }

enum folderList {
  installer = 'installerImages',
  device = 'deviceImages',
}
@Injectable()
export class ImportService {
  private fileContent: Buffer;
  private fileData: IImport[];

  constructor(
    private deviceService: DeviceService,
    private meterService: MeterService,
    private siteService: SiteService,
    private rootService: RootAuthorityService,
    private ownerService: TokenOwnerService,
    private projectService: ProjectService,
    private installerService: InstallerService,
    private meterJobService: MeterJobService,
    private userService: UserService,
    private guardianSiteService: GuardianSiteService,
    private readonly em: EntityManager,
    private authService: AuthService,
    private tenancyService: TenancyService,
    private policyService: GuardianPolicyService,
  ) {}

  public async getFileImport(
    content: Buffer,
    returnRef = false,
  ): Promise<IImport[]> {
    const fileReaders = {
      'user.json': async (input: string) => {
        const dbUsers = !returnRef ? await this.userService.export() : [];
        const users: User[] = JSON.parse(input);
        return users.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.email,
          type: ExportEntityTypes.user,
          status:
            dbUsers.find((x: any) => x.email === item.email) === undefined,
          isPublished: false,
        }));
      },
      'root-authority.json': async (input: string) => {
        const dbRoot = !returnRef ? await this.rootService.export() : null;
        const root: IRootAuthority = JSON.parse(input);
        return [
          {
            item: returnRef ? root : undefined,
            id: root.rootAuthorityId,
            ref: root.rootAuthorityName,
            type: ExportEntityTypes.root,
            status: dbRoot === null,
            isPublished: dbRoot?.isPublished,
          },
        ];
      },
      'token-owner.json': async (input: string) => {
        const dbOwner = !returnRef ? await this.ownerService.export() : null;
        const owner: ITokenOwner = JSON.parse(input);
        return [
          {
            item: returnRef ? owner : undefined,
            id: owner.tokenOwnerId,
            ref: owner.tokenOwnerName,
            type: ExportEntityTypes.owner,
            status: dbOwner === null,
            isPublished: dbOwner?.isPublished,
          },
        ];
      },
      'policy.json': async (input: string) => {
        const dbPolicies = !returnRef ? await this.policyService.export() : [];
        const policies: IPolicy[] = JSON.parse(input);
        return policies.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: `${item.name} ${item.version}`,
          type: ExportEntityTypes.policy,
          status:
            dbPolicies.find((x: IPolicy) => x.name === item.name) === undefined,
          isPublished: dbPolicies.find((x: IPolicy) => x.name === item.name)
            ?.isPublished,
        }));
      },
      'project.json': async (input: string) => {
        const dbProject = !returnRef
          ? await this.projectService.export()
          : null;
        const project: IProject = JSON.parse(input);
        return [
          {
            item: returnRef ? project : undefined,
            id: project.projectId,
            ref: project.projectName,
            type: ExportEntityTypes.project,
            status: dbProject === null,
            isPublished: dbProject?.isPublished,
          },
        ];
      },
      'guardianSite.json': async (input: string) => {
        const dbSites = !returnRef
          ? await this.guardianSiteService.export()
          : [];
        const sites: IGuardianSite[] = JSON.parse(input);
        return sites.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.name,
          type: ExportEntityTypes.guardianSite,
          status:
            dbSites.find((x: IGuardianSite) => x.name === item.name) ===
            undefined,
          isPublished: dbSites.find((x: IGuardianSite) => x.name === item.name)
            ?.isPublished,
        }));
      },
      'installer.json': async (input: string) => {
        const dbInstallers = !returnRef
          ? await this.installerService.export()
          : [];
        const installers: IInstaller[] = JSON.parse(input);
        return installers.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.installerId,
          type: ExportEntityTypes.installer,
          status:
            dbInstallers.find(
              (x: IInstaller) => x.installerId === item.installerId,
            ) === undefined,
          isPublished: dbInstallers.find(
            (x: IInstaller) => x.installerId === item.installerId,
          )?.isPublished,
        }));
      },
      'device.json': async (input: string) => {
        const dbDevices = !returnRef ? await this.deviceService.export() : [];
        const devices: IDevice[] = JSON.parse(input);
        return devices.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.deviceId,
          type: ExportEntityTypes.device,
          status:
            dbDevices.find((x: IDevice) => x.deviceId === item.deviceId) ===
            undefined,
          isPublished: dbDevices.find(
            (x: IDevice) => x.deviceId === item.deviceId,
          )?.isPublished,
        }));
      },
      'site.json': async (input: string) => {
        const dbSites = !returnRef ? await this.siteService.export() : [];
        const sites: ISite[] = JSON.parse(input);
        return sites.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.name,
          type: ExportEntityTypes.site,
          status:
            dbSites.find((x: ISite) => x.name === item.name) === undefined,
          isPublished: false,
        }));
      },
      'meter.json': async (input: string) => {
        const dbMeters = !returnRef ? await this.meterService.export() : [];
        const meters: IMeter[] = JSON.parse(input);
        return meters.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.name,
          type: ExportEntityTypes.meter,
          status: dbMeters.find((x: any) => x.name === item.name) === undefined,
          isPublished: false,
        }));
      },
      'tenancy.json': async (input: string) => {
        const dbTenancy = !returnRef ? await this.tenancyService.export() : [];
        const tenancy: ITenancy[] = JSON.parse(input);
        return tenancy.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.name,
          type: ExportEntityTypes.tenancy,
          status:
            dbTenancy.find((x: any) => x.name === item.name) === undefined,
          isPublished: false,
        }));
      },
      'meter-job.json': async (input: string) => {
        const dbMeterJobs = !returnRef
          ? await this.meterJobService.export()
          : [];
        const meterJobs: IMeterJob[] = JSON.parse(input);
        return meterJobs.map((item) => ({
          item: returnRef ? item : undefined,
          id: item.id,
          ref: item.name,
          type: ExportEntityTypes.meterJob,
          status:
            dbMeterJobs.find((x: any) => x.name === item.name) === undefined,
          isPublished: false,
        }));
      },
    };

    const zip = await JSZip.loadAsync(content);
    let data: IImport[] = [];
    for await (const [filename, reader] of Object.entries(fileReaders)) {
      const json = await zip.file(filename)?.async('string');
      if (json) {
        data = [...data, ...(await reader(json))];
      }
    }
    return data;
  }

  private async getImage(folder: string, filename: string) {
    const zip = await JSZip.loadAsync(this.fileContent);
    return (await zip
      .file(`${folder}/${filename}`)
      ?.async('nodebuffer')) as Buffer;
  }

  public async getImport(
    content: Buffer,
    importData: IImport[],
  ): Promise<IMutationResult> {
    this.fileData = await this.getFileImport(content, true);
    this.fileContent = content;

    const messages: string[] = [];

    const insertOrSkip = async (iData: IImport) => {
      const data = this.fileData.find((x) => x.id === iData.id);

      switch (iData.type) {
        case ExportEntityTypes.user: {
          const result = await this.userService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.root: {
          const result = await this.rootService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.owner: {
          const result = await this.ownerService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.policy: {
          const result = await this.policyService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.project: {
          const result = await this.projectService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.guardianSite: {
          const result = await this.guardianSiteService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.installer: {
          const result = await this.importInstaller(data?.item, iData.status);
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.device: {
          const result = await this.importDevice(data?.item, iData.status);
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.site: {
          const result = await this.siteService.import(
            data?.item,
            iData.status,
          );
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.meter: {
          const result = await this.importMeter(data?.item, iData.status);
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.tenancy: {
          const result = await this.importTenancy(data?.item, iData.status);
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
        case ExportEntityTypes.meterJob: {
          const result = await this.importMeterJob(data?.item, iData.status);
          if (!result.success) {
            messages.push(result.message as string);
          }
          break;
        }
      }
    };
    await runAllSettled(importData, insertOrSkip, 1);

    if (messages.length > 0) {
      return {
        success: false,
        message: messages.join('\r\n'),
      };
    }
    return {
      success: true,
    };
  }

  private async importInstaller(
    installer: IInstaller,
    isNew: boolean,
  ): Promise<IMutationResult> {
    try {
      installer.certification = await storeFileToS3(
        this.installerService.storageS3BucketName,
        `installer/${installer.installerId}/${installer.certification.name}`,
        await this.getImage(folderList.installer, installer.certification.name),
      );

      if (isNew) {
        const newInstaller = this.em.create(Installer, { ...installer } as any);
        await this.em.persistAndFlush(newInstaller);
      } else {
        const existingInstaller =
          (await this.installerService.getInstallerByInstallerId(
            installer.installerId,
          )) as IInstaller;
        installer.id = existingInstaller.id;
        Object.assign(existingInstaller, installer);
        await this.em.persistAndFlush(existingInstaller);
      }
    } catch (err: any) {
      logger.error(err, 'Import installer failed!');
      return {
        success: false,
        message: `Import installer ${installer.installerId} failed!`,
      };
    }
    return { success: true };
  }

  private async importDevice(
    device: IDevice,
    isNew: boolean,
  ): Promise<IMutationResult> {
    //*** if installer not in database, import installer ***//
    const installer = this.fileData.find((x) => x.id === device.installer)
      ?.item as IInstaller;
    if (installer === undefined) {
      return {
        success: false,
        message: `Cannot create installer ${device.installer} for device ${device.deviceId}; not in the import file.`,
      };
    }
    const existingInstaller =
      await this.installerService.getInstallerByInstallerId(
        installer.installerId,
      );
    if (existingInstaller === null) {
      const res = await this.importInstaller(installer, true);
      if (!res.success) {
        return {
          success: false,
          message: `Cannot create installer ${installer.installerId} for device ${device.deviceId}.`,
        };
      }
    }
    /* update installer in device */
    device.installer =
      existingInstaller === null
        ? ((await this.installerService.getInstallerByInstallerId(
            installer.installerId,
          )) as IInstaller)
        : existingInstaller;

    //*** if guardian site not in database, import guardian site ***//
    const site = this.fileData.find((x) => x.id === device.site)
      ?.item as IGuardianSite;
    if (site === undefined) {
      return {
        success: false,
        message: `Cannot create guardian site ${device.site.name} for device ${device.deviceId}; not in the import file.`,
      };
    }
    const existingSite = await this.guardianSiteService.getSiteByName(
      site.name,
    );
    if (existingSite === null) {
      const res = await this.guardianSiteService.import(site, true);
      if (!res.success) {
        return {
          success: false,
          message: `Cannot create guardian site ${site.name} for device ${device.deviceId}.`,
        };
      }
    }
    /* update guardian site in device */
    device.site =
      existingSite === null
        ? ((await this.guardianSiteService.getSiteByName(
            site.name,
          )) as IGuardianSite)
        : existingSite;
    try {
      device.certification = await storeFileToS3(
        this.deviceService.storageS3BucketName,
        `device/${device.deviceId}/${device.certification.name}`,
        await this.getImage(folderList.device, device.certification.name),
      );

      if (isNew) {
        const newDevice = this.em.create(Device, { ...device } as any);
        await this.em.persistAndFlush(newDevice);
      } else {
        const existingDevice = (await this.deviceService.getDeviceByDeviceId(
          device.deviceId,
        )) as IDevice;
        device.id = existingDevice.id;
        Object.assign(existingDevice, device);
        await this.em.persistAndFlush(existingDevice);
      }
    } catch (err: any) {
      logger.error(err, 'Import device failed!');
      return {
        success: false,
        message: `Import device ${device.deviceId} failed!`,
      };
    }
    return { success: true };
  }

  private async importMeter(
    meter: IMeter,
    isNew: boolean,
  ): Promise<IMutationResult> {
    delete (meter as any).timezone;

    /*** if client is not the same as in database, update client ***/
    const client = await this.authService.getClients();
    if (client !== meter.client) {
      meter.client = client;
    }

    /*** if device not in database, import device ***/
    if (meter.device) {
      const device = this.fileData.find((x) => x.id === meter.device)
        ?.item as IDevice;
      if (device === undefined) {
        return {
          success: false,
          message: `Cannot create device ${meter.device} for meter ${meter.name}; not in the import file`,
        };
      }
      const existingDevice = await this.deviceService.getDeviceByDeviceId(
        device.deviceId,
      );
      if (existingDevice === null) {
        const res = await this.importDevice(device, true);
        if (!res.success) {
          return {
            success: false,
            message: `Cannot create device ${device.deviceId} for meter ${meter.name}.`,
          };
        }
      }

      /*  update device in meter ***/
      meter.device =
        existingDevice === null
          ? ((await this.deviceService.getDeviceByDeviceId(
              device.deviceId,
            )) as IDevice)
          : existingDevice;
    }

    //*** if site not in database, import site  ***//
    const site = this.fileData.find((x) => x.id === meter.site.id)
      ?.item as ISite;
    if (site === undefined) {
      return {
        success: false,
        message: `Cannot create  site ${meter.site.name} for meter ${meter.name}; not in the import file`,
      };
    }
    const existingSite = await this.siteService.getSiteByName(site.name);
    if (existingSite === null) {
      const res = await this.siteService.import(site, true);
      if (!res.success) {
        return {
          success: false,
          message: `Cannot create site ${site.name} for meter ${meter.name}.`,
        };
      }
    }
    /* update site in meter */
    meter.site =
      existingSite === null
        ? ((await this.siteService.getSiteByName(site.name)) as ISite)
        : existingSite;

    try {
      if (isNew) {
        const newMeter = this.em.create(Meter, { ...meter } as any);
        await this.em.persistAndFlush(newMeter);
      } else {
        const existingMeter = (await this.meterService.getMeterByName(
          meter.name,
        )) as IMeter;
        meter.id = existingMeter.id;
        Object.assign(existingMeter, meter);
        await this.em.persistAndFlush(existingMeter);
      }
    } catch (err: any) {
      logger.error(err, 'Import meter failed!');
      return {
        success: false,
        message: `Import meter ${meter.name} failed! ${err.message}`,
      };
    }
    return { success: true };
  }

  private async importMeterJob(
    meterJob: IMeterJob,
    isNew: boolean,
  ): Promise<IMutationResult> {
    //*** if meter not in database, import meter ***//
    const meter = this.fileData.find((x) => x.id === meterJob.meter)
      ?.item as IMeter;
    if (meter === undefined) {
      return {
        success: false,
        message: `Cannot create meter ${meterJob.meter} for meter job ${meterJob.name}; not in the import file`,
      };
    }
    const existingMeter = await this.meterService.getMeterByName(meter.name);
    if (existingMeter === null) {
      const res = await this.importMeter(meter, true);
      if (!res.success) {
        return {
          success: false,
          message: `Cannot create meter ${meter.name} for meter job ${meterJob.name}.`,
        };
      }
    }

    /* update meter in meter job */
    meterJob.meter =
      existingMeter === null
        ? ((await this.meterService.getMeterByName(meter.name)) as IMeter)
        : existingMeter;

    try {
      if (isNew) {
        meterJob.currentTask = undefined;
        const newMeterJob = this.em.create(MeterJob, { ...meterJob } as any);
        await this.em.persistAndFlush(newMeterJob);
      } else {
        const existingMeterJob = (await this.meterJobService.getMeterJobByName(
          meterJob.name,
        )) as IMeterJob;
        meterJob.id = existingMeterJob.id;
        Object.assign(existingMeterJob, meterJob);
        await this.em.persistAndFlush(existingMeterJob);
      }
    } catch (err: any) {
      logger.error(err, 'Import meter job failed!');
      return {
        success: false,
        message: `Import meter job ${meterJob.name} failed!`,
      };
    }
    return { success: true };
  }

  private async importTenancy(
    tenancy: ITenancy,
    isNew: boolean,
  ): Promise<IMutationResult> {
    //*** if meter not in database, import meter ***//

    const meter = this.fileData.find((x) => x.id === tenancy.meter.id)
      ?.item as IMeter;
    if (meter === undefined) {
      return {
        success: false,
        message: `Cannot create meter ${tenancy.meter.name} for tenancy ${tenancy.name}; not in the import file`,
      };
    }
    const existingMeter = await this.meterService.getMeterByName(meter.name);
    if (existingMeter === null) {
      const res = await this.importMeter(meter, true);
      if (!res.success) {
        return {
          success: false,
          message: `Cannot create meter ${meter.name} for tenancy ${tenancy.name}.`,
        };
      }
    }

    /* update meter in tenancy */
    tenancy.meter =
      existingMeter === null
        ? ((await this.meterService.getMeterByName(meter.name)) as IMeter)
        : existingMeter;

    try {
      if (isNew) {
        const newTenancy = this.em.create(Tenancy, { ...tenancy } as any);
        await this.em.persistAndFlush(newTenancy);
      } else {
        const existingTenancy = (await this.tenancyService.getTenancyByName(
          tenancy.name,
        )) as ITenancy;
        tenancy.id = existingTenancy.id;
        Object.assign(existingTenancy, tenancy);
        await this.em.persistAndFlush(existingTenancy);
      }
    } catch (err: any) {
      logger.error(err, 'Import tenancy failed!');
      return {
        success: false,
        message: `Import tenancy ${tenancy.name} failed!`,
      };
    }
    return { success: true };
  }
}
