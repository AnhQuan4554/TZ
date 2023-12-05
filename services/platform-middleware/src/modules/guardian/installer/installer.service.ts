/* eslint-disable no-param-reassign */
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IMutationResult,
  IInstaller,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { deleteFileFromS3, logger, storeFileToS3 } from '@tymlez/backend-libs';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { Installer } from '../entities/installer.entity';
import { CreateInstallerDto, UpdateInstallerDto } from '../dto/installer.dto';
import { RootAuthorityService } from '../root-authority/root-authority.service';
import { FileService } from '../../file/file.service';
import { GuardianService } from '../guardian.service';

@Injectable()
export class InstallerService {
  public storageS3BucketName: string;
  constructor(
    @InjectRepository(Installer)
    private readonly installerRepository: EntityRepository<Installer>,
    private readonly em: EntityManager,
    private readonly rootAuthorityService: RootAuthorityService,
    private readonly fileService: FileService,
    private readonly guardianService: GuardianService,
  ) {
    this.storageS3BucketName = process.env.ASSET_BUCKET_NAME || 'local';
  }

  public async addInstaller(
    installer: CreateInstallerDto,
  ): Promise<IMutationResult> {
    const existingInstallerId = await this.getInstallerByInstallerId(
      installer.installerId,
    );
    if (existingInstallerId !== null) {
      return {
        success: false,
        message:
          'Installer Id already exists. Please input another installer id!',
      };
    }

    if (new Date(installer.businessRegistrationDate).getTime() > Date.now()) {
      return {
        success: false,
        message: 'Business Registration Date is in the future. Please check!',
      };
    }
    if (new Date(installer.certificationExpiryDate).getTime() < Date.now()) {
      return {
        success: false,
        message: 'Certification Date is expired. Please check!',
      };
    }

    installer.registeredOfficeAddress.addressId = uuidv4();

    installer.businessLead.personId = uuidv4();
    if (installer.operationalContact) {
      installer.operationalContact.personId = uuidv4();
    }

    if (installer.leadUserContact) {
      installer.leadUserContact.personId = uuidv4();
    }
    if (installer.financePersonContact) {
      installer.financePersonContact.personId = uuidv4();
    }
    const newInstaller = this.em.create(Installer, {
      installerId: installer.installerId,
      installerName: installer.installerName,
      registrationCountry: installer.registrationCountry,
      businessRegistrationNumber: installer.businessRegistrationNumber,
      businessRegistrationNumberType: installer.businessRegistrationNumberType,
      businessRegistrationDate: installer.businessRegistrationDate,
      registeredOfficeAddress: installer.registeredOfficeAddress,
      businessType: installer.businessType,
      primaryBusinessFunction: installer.primaryBusinessFunction,
      businessLead: installer.businessLead,
      websiteLink: installer.websiteLink,
      numberOfEmployees: installer.numberOfEmployees,
      otherCountriesOfOperation: installer.otherCountriesOfOperation,
      otherRelatedEntities: installer.otherRelatedEntities,
      shareholders: installer.shareholders,
      balanceSheetTotal: installer.balanceSheetTotal,
      operationalContact: installer.operationalContact,
      leadUserContact: installer.leadUserContact,
      financePersonContact: installer.financePersonContact,
      certificationExpiryDate: installer.certificationExpiryDate,
      isPublished: false,
      //store to S3
      certification: await this.storeFile(
        installer.installerId,
        installer.certification.name,
        installer.certification.content as string,
      ),
    } as any);
    try {
      await this.em.persistAndFlush(newInstaller);
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
  ): Promise<IFindResult<IInstaller>> {
    try {
      const [installers, count] = await this.installerRepository.findAndCount(
        {},
        {
          orderBy: { installerName: 'ASC' },
          limit: pageSize,
          offset: page * pageSize,
          populate: true,
        },
      );
      return {
        count,
        data: installers,
      };
    } catch (err: any) {
      logger.error(err, 'Get all installers failed!');
      return { count: 0, data: [] };
    }
  }

  public async getInstallerById(id: string): Promise<IInstaller | null> {
    return await this.installerRepository.findOne(
      {
        id,
      },
      { populate: true },
    );
  }

  public async updateInstaller(
    installer: UpdateInstallerDto,
  ): Promise<IMutationResult> {
    const existingInstaller = await this.getInstallerById(installer.id);
    if (existingInstaller === null) {
      return {
        success: false,
        message: 'Installer does not exist. No installer to update',
      };
    }

    if (existingInstaller.installerId !== installer.installerId) {
      const existingInstallerId = await this.getInstallerByInstallerId(
        installer.installerId,
      );
      if (existingInstallerId !== null) {
        return {
          success: false,
          message:
            'Installer Id already exists. Please input another installer id!',
        };
      }
    }

    if (installer.operationalContact) {
      installer.operationalContact.personId =
        existingInstaller.operationalContact &&
        existingInstaller.operationalContact.personId !== ''
          ? existingInstaller.operationalContact.personId
          : uuidv4();
    }

    if (installer.leadUserContact) {
      installer.leadUserContact.personId =
        existingInstaller.leadUserContact &&
        existingInstaller.leadUserContact.personId !== ''
          ? existingInstaller.leadUserContact.personId
          : uuidv4();
    }
    if (installer.financePersonContact) {
      installer.financePersonContact.personId =
        existingInstaller.financePersonContact &&
        existingInstaller.financePersonContact.personId !== ''
          ? existingInstaller.financePersonContact.personId
          : uuidv4();
    }

    //if certification is updated, remove the old one in S3 and update the new one
    if (existingInstaller.certification.name !== installer.certification.name) {
      await this.deleteFile(
        installer.installerId,
        installer.certification.name,
      );

      installer.certification = await this.storeFile(
        installer.installerId,
        installer.certification.name,
        installer.certification.content as string,
      );
    }
    try {
      Object.assign(existingInstaller, installer);
      await this.em.persistAndFlush(existingInstaller);
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

  public async publishInstaller(id: string): Promise<IMutationResult> {
    const { rootAuthority, error } =
      await this.rootAuthorityService.getPublishedRootAuthority();

    if (rootAuthority === undefined || error !== undefined) {
      return {
        success: false,
        message: `Root Authority is not published. (${error})`,
      };
    }
    const installer = await this.getInstallerById(id);
    if (installer === null) {
      return {
        success: false,
        message: `No installer to be published`,
      };
    }

    if (installer.operationalContact === null) {
      delete (installer as any).operationalContact;
    }
    if (installer.leadUserContact === null) {
      delete (installer as any).leadUserContact;
    }
    if (installer.financePersonContact === null) {
      delete (installer as any).financePersonContact;
    }
    installer.businessRegistrationDate = format(
      installer.businessRegistrationDate,
      'yyyy-MM-dd',
    );
    installer.certificationExpiryDate = format(
      installer.certificationExpiryDate,
      'yyyy-MM-dd',
    );

    if (!installer.certification?.url) {
      return {
        success: false,
        message: 'Installer certificate not found',
      };
    }

    const certification = (
      await this.fileService.getFile(installer.certification.url)
    ).content?.toString('base64');

    delete (installer as any).isPublished;
    delete (installer as any).id;

    try {
      await this.guardianService.makeGuardianRequest('installer', 'post', {
        ...installer,
        numberOfEmployees: installer.numberOfEmployees || 0,
        certification,
      });
    } catch (err: any) {
      logger.error(err, `Publish installer failed! ${err.message}`);
      return {
        success: false,
        message: err.response?.data.message,
      };
    }

    //update isPublished to true
    await this.updatePublishedSuccess(installer);

    return {
      success: true,
      message: `Installer published!`,
    };
  }

  public async getPublishedInstaller(
    installerId: string,
  ): Promise<IInstaller | null> {
    let publishedInstaller = null;
    try {
      publishedInstaller = await this.guardianService.makeGuardianRequest(
        `installer/${installerId}`,
        'get',
      );
    } catch (err: any) {
      logger.error(err, `Get published installer failed! ${err.message}`);
      return null;
    }
    return publishedInstaller.verified ? publishedInstaller.data : null;
  }

  private async updatePublishedSuccess(
    installer: IInstaller,
  ): Promise<IMutationResult> {
    const qb = (this.em as SqlEntityManager)
      .createQueryBuilder(Installer)
      .update({ isPublished: true })
      .where({
        installer_id: installer.installerId,
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

  public async getInstallerByInstallerId(
    installerId: string,
  ): Promise<IInstaller | null> {
    return await this.installerRepository.findOne(
      {
        installerId,
      },
      { populate: true },
    );
  }

  public async export(): Promise<IInstaller[]> {
    try {
      const data = await this.installerRepository.find(
        {},
        {
          orderBy: { installerId: 'ASC' },
        },
      );
      data.map((x) => {
        // eslint-disable-next-line no-param-reassign
        x.isPublished = false;
        return x;
      });
      return data;
    } catch (err: any) {
      logger.error(err, 'Export installer failed');
      return [];
    }
  }

  // TODO: move these into the file service
  private async storeFile(
    installerId: string,
    filename: string,
    content: string,
  ) {
    return await storeFileToS3(
      this.storageS3BucketName,
      `installer/${installerId}/${filename}`,
      Buffer.from(content, 'base64'),
    );
  }

  private async deleteFile(installerId: string, filename: string) {
    await deleteFileFromS3(
      this.storageS3BucketName,
      `installer/${installerId}/${filename}`,
    );
  }
}
