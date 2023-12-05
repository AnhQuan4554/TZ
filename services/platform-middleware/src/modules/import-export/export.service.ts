/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import JSZip from 'jszip';
import { ExportEntityTypes, logger } from '@tymlez/backend-libs';
import { DeviceService } from '../guardian/device/device.service';
import { InstallerService } from '../guardian/installer/installer.service';
import { ProjectService } from '../guardian/project/project.service';
import { RootAuthorityService } from '../guardian/root-authority/root-authority.service';
import { MeterJobService } from '../meter-job/meter-job.service';
import { MeterService } from '../meter/meter.service';
import { UserService } from '../auth/user/user.service';
import { SiteService } from '../dashboard-site/site.service';
import { FileService } from '../file/file.service';
import { GuardianSiteService } from '../guardian/site/site.service';
import { TokenOwnerService } from '../guardian/token-owner/token-owner.service';
import { TenancyService } from '../tenancy/tenancy.service';
import { GuardianPolicyService } from '../guardian/policy/policy.service';

enum fileList {
  user = 'user.json',
  root = 'root-authority.json',
  owner = 'token-owner.json',
  policy = 'policy.json',
  project = 'project.json',
  guardianSite = 'guardianSite.json',
  installer = 'installer.json',
  device = 'device.json',
  site = 'site.json',
  meter = 'meter.json',
  tenancy = 'tenancy.json',
  meterJob = 'meter-job.json',
}

enum folderList {
  installer = 'installerImages',
  device = 'deviceImages',
}

@Injectable()
export class ExportService {
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
    private fileService: FileService,
    private guardianSiteService: GuardianSiteService,
    private tenancyService: TenancyService,
    private policyService: GuardianPolicyService,
  ) {}

  public async getExport(dataList: string[]) {
    let zip = new JSZip();
    try {
      await Promise.all(
        dataList.map(async (item) => {
          switch (item) {
            case ExportEntityTypes.user: {
              const data = await this.userService.export();
              zip.file(fileList.user, JSON.stringify(data));
              break;
            }
            case ExportEntityTypes.root: {
              const data = await this.rootService.export();
              zip.file(fileList.root, JSON.stringify(data));
              break;
            }
            case ExportEntityTypes.owner: {
              const data = await this.ownerService.export();
              zip.file(fileList.owner, JSON.stringify(data));
              break;
            }
            case ExportEntityTypes.policy: {
              const data = await this.policyService.export();
              zip.file(fileList.policy, JSON.stringify(data));
              break;
            }
            case ExportEntityTypes.project: {
              const data = await this.projectService.export();
              zip.file(fileList.project, JSON.stringify(data));
              break;
            }
            case ExportEntityTypes.guardianSite: {
              zip = await this.exportGuardianSite(zip);
              break;
            }
            case ExportEntityTypes.installer: {
              zip = await this.exportInstaller(zip);
              break;
            }
            case ExportEntityTypes.device: {
              zip = await this.exportDevice(zip);
              break;
            }
            case ExportEntityTypes.site: {
              zip = await this.exportSite(zip);
              break;
            }
            case ExportEntityTypes.meter: {
              zip = await this.exportMeter(zip);
              break;
            }
            case ExportEntityTypes.tenancy: {
              const data = await this.tenancyService.export();
              zip.file(fileList.tenancy, JSON.stringify(data));
              break;
            }
            case ExportEntityTypes.meterJob: {
              const data = await this.meterJobService.export();
              zip.file(fileList.meterJob, JSON.stringify(data));
              break;
            }
          }
        }),
      );
      zip = await this.checkExport(dataList, zip);
      return await zip.generateAsync({ type: 'nodebuffer' });
    } catch (err: any) {
      logger.error(err, 'Export file failed!');
      return null;
    }
  }

  private async checkExport(dataList: string[], zip: any) {
    /* having device exported but not have guardian site or installer exported => export guardian site and installer */
    const bHasDevice = dataList.includes(ExportEntityTypes.device);
    if (bHasDevice) {
      zip = await this.checkExportDevice(zip);
    }

    /* having meter exported but not have site or device exported => export site and device */
    let bHasMeter = dataList.includes(ExportEntityTypes.meter);
    if (bHasMeter) {
      zip = await this.checkExportMeter(bHasDevice, zip);
    }

    /* having tenancy exported but not have meter exported => export meter */
    if (dataList.includes(ExportEntityTypes.tenancy)) {
      if (!bHasMeter) {
        zip = await this.exportMeter(zip);
        zip = await this.checkExportMeter(bHasDevice, zip);
        bHasMeter = true;
      }
    }

    /* having meterJob exported but not have meter exported => export meter */
    if (dataList.includes(ExportEntityTypes.meterJob)) {
      if (!bHasMeter) {
        zip = await this.exportMeter(zip);
        zip = await this.checkExportMeter(bHasDevice, zip);
      }
    }

    return zip;
  }

  private async checkExportDevice(zip: any) {
    if (!(await this.isGuardianSiteExported(zip))) {
      zip = await this.exportGuardianSite(zip);
    }
    if (!(await this.isInstallerExported(zip))) {
      zip = await this.exportInstaller(zip);
    }
    return zip;
  }

  private async checkExportMeter(bHasDevice: boolean, zip: any) {
    if (!bHasDevice) {
      zip = await this.exportDevice(zip);
      zip = await this.checkExportDevice(zip);
    }
    if (!(await this.isSiteExported(zip))) {
      zip = await this.exportSite(zip);
    }
    return zip;
  }

  private async exportGuardianSite(zip: any) {
    const data = await this.guardianSiteService.export();
    zip.file(fileList.guardianSite, JSON.stringify(data));
    return zip;
  }

  private async exportInstaller(zip: any) {
    const data = await this.installerService.export();
    await Promise.all(
      data.map(async (x) => {
        const img = await this.fileService.getFile(x.certification.url);
        x.certification.name = `${x.installerId}_${x.certification.name}`;
        zip.file(
          `${folderList.installer}/${x.certification.name}`,
          img.content as Buffer,
        );
      }),
    );
    zip.file(fileList.installer, JSON.stringify(data));
    return zip;
  }

  private async exportSite(zip: any) {
    const data = await this.siteService.export();
    zip.file(fileList.site, JSON.stringify(data));
    return zip;
  }

  private async exportDevice(zip: any) {
    const data = await this.deviceService.export();
    await Promise.all(
      data.map(async (x) => {
        const img = await this.fileService.getFile(x.certification.url);
        x.certification.name = `${x.deviceId}_${x.certification.name}`;
        zip.file(
          `${folderList.device}/${x.certification.name}`,
          img.content as Buffer,
        );
      }),
    );
    zip.file(fileList.device, JSON.stringify(data));
    return zip;
  }

  private async exportMeter(zip: any) {
    const data = await this.meterService.export();
    zip.file(fileList.meter, JSON.stringify(data));
    return zip;
  }

  private async isGuardianSiteExported(zip: any): Promise<boolean> {
    const json = await zip.file(fileList.guardianSite);
    return json !== null;
  }

  private async isInstallerExported(zip: any): Promise<boolean> {
    const json = await zip.file(fileList.installer);
    return json !== null;
  }

  private async isSiteExported(zip: any): Promise<boolean> {
    const json = await zip.file(fileList.site);
    return json !== null;
  }

  // private async isMeterExported(zip: any): Promise<boolean> {
  //   const json = await zip.file(fileList.meter);
  //   return json !== null;
  // }
}
