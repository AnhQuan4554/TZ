/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import {
  IMutationResult,
  IRootAuthority,
} from '@tymlez/platform-api-interfaces';
import { format } from 'date-fns';

import { Setting } from '../../settings/entities/setting.entity';
import { SettingService } from '../../settings/setting.service';
import {
  CreateRootAuthorityDto,
  UpdateRootAuthorityDto,
} from '../dto/root-authority.dto';
import { GuardianService } from '../guardian.service';

@Injectable()
export class RootAuthorityService {
  private readonly logger = new Logger(RootAuthorityService.name);
  constructor(
    private readonly em: EntityManager,
    private readonly guardianService: GuardianService,
    private readonly settingService: SettingService,
  ) {}

  public async addRootAuthority(
    root: CreateRootAuthorityDto,
  ): Promise<IMutationResult> {
    if (new Date(root.businessRegistrationDate).getTime() > Date.now()) {
      return {
        success: false,
        message: 'Business Registration Date is in the future. Please check!',
      };
    }

    delete (root as any).submit;

    root.registeredOfficeAddress.addressId = uuidv4();
    root.businessLead.personId = uuidv4();

    if (root.operationalContact) {
      root.operationalContact.personId = uuidv4();
    }
    if (root.leadUserContact) {
      root.leadUserContact.personId = uuidv4();
    }
    if (root.financePersonContact) {
      root.financePersonContact.personId = uuidv4();
    }

    const newRoot = this.em.create(Setting, {
      name: 'RootAuthority',
      jsonValue: JSON.stringify(root),
      description: 'Root Authority',
      type: 'string',
    } as any);

    try {
      await this.em.persistAndFlush(newRoot);
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

  public async updateRootAuthority(
    root: UpdateRootAuthorityDto,
  ): Promise<IMutationResult> {
    const existingRootSetting = await this.settingService.getDetailByName(
      'RootAuthority',
    );

    if (existingRootSetting === null) {
      return {
        success: false,
        message: 'Root Authority does not exist. No Root Authority to update',
      };
    }

    delete (root as any).submit;

    const existingRoot = JSON.parse(
      existingRootSetting.jsonValue as string,
    ) as IRootAuthority;

    root.registeredOfficeAddress.addressId =
      existingRoot.registeredOfficeAddress.addressId;

    root.businessLead.personId = existingRoot.businessLead.personId;

    if (root.operationalContact) {
      root.operationalContact.personId =
        existingRoot.operationalContact &&
        existingRoot.operationalContact.personId !== ''
          ? existingRoot.operationalContact.personId
          : uuidv4();
    }
    if (root.leadUserContact) {
      root.leadUserContact.personId =
        existingRoot.leadUserContact &&
        existingRoot.leadUserContact.personId !== ''
          ? existingRoot.leadUserContact.personId
          : uuidv4();
    }
    if (root.financePersonContact) {
      root.financePersonContact.personId =
        existingRoot.financePersonContact &&
        existingRoot.financePersonContact.personId !== ''
          ? existingRoot.financePersonContact.personId
          : uuidv4();
    }

    existingRootSetting.jsonValue = JSON.stringify(root);
    try {
      await this.em.persistAndFlush(existingRootSetting);
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

  public async getRootAuthority(): Promise<IRootAuthority | null> {
    const rootSetting = await this.settingService.getDetailByName(
      'RootAuthority',
    );
    if (rootSetting) {
      const root = JSON.parse(rootSetting.jsonValue as string);
      return root.isPublished ? { ...root } : { ...root, isPublished: false };
    }

    return null;
  }

  public async publishRootAuthority(): Promise<IMutationResult<boolean>> {
    const startTime = new Date().getTime();
    const root = await this.getRootAuthority();
    if (root === null) {
      return {
        success: false,
        message: `No Root Authority to be published`,
      };
    }

    delete (root as any).isPublished;

    if (root.operationalContact === null) {
      delete (root as any).operationalContact;
    }
    if (root.leadUserContact === null) {
      delete (root as any).leadUserContact;
    }
    if (root.financePersonContact === null) {
      delete (root as any).financePersonContact;
    }
    if (root.websiteLink === '') {
      delete (root as any).websiteLink;
    }
    const tokenMintValue = await this.guardianService.getTokenMintValue();
    const policyTags = await this.guardianService.getEnabledPolicyTags();

    if (policyTags.length === 0) {
      const message = 'Please set enabledPolicyTags in Settings first';
      this.logger.error(message);
      return {
        success: false,
        data: false,
        message,
      };
    }

    try {
      root.businessRegistrationDate = format(
        new Date(root.businessRegistrationDate),
        'yyyy-MM-dd',
      );
      // Stop the long request before timeout
      const racePromise = new Promise((r) => {
        setTimeout(() => {
          r('TIMEOUT');
        }, 55000 - (new Date().getTime() - startTime));
      });
      const result = await Promise.race([
        racePromise,
        this.guardianService.makeGuardianRequest(
          `root-authority?tokenMintValue=${tokenMintValue}&policyTags=${policyTags}`,
          'post',
          root,
        ),
      ]);
      if (result === 'TIMEOUT') {
        this.logger.log('Bootstrap process still running in process');
        return {
          success: false,
          data: true,
          message: 'Bootstrap process ussually took longer time',
        };
      }
    } catch (err: any) {
      logger.error(err, 'Publish root authority failed!');
      return {
        success: false,
        data: false,
        message: err.response?.data.message,
      };
    }
    await this.updatePublishedSuccess();
    return {
      success: true,
      data: true,
      message: `Root Authority published`,
    };
  }

  private async updatePublishedSuccess(): Promise<IMutationResult> {
    const existingRootSetting = await this.settingService.getDetailByName(
      'RootAuthority',
    );
    if (existingRootSetting === null) {
      return {
        success: false,
      };
    }
    const existingRoot = JSON.parse(
      existingRootSetting.jsonValue as string,
    ) as IRootAuthority;

    existingRoot.isPublished = true;
    existingRootSetting.jsonValue = JSON.stringify(existingRoot);
    try {
      await this.em.persistAndFlush(existingRootSetting);
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

  public async getPublishedRootAuthority(): Promise<{
    rootAuthority?: IRootAuthority;
    error?: string;
  }> {
    let publishedRoot = null;
    const tokenMintValue = await this.guardianService.getTokenMintValue();
    const policyTags = await this.guardianService.getEnabledPolicyTags();

    if (policyTags.length === 0) {
      const message = 'Please set enabledPolicyTags in settings first';
      this.logger.error(message);
      return { error: message };
    }

    try {
      publishedRoot = await this.guardianService.makeGuardianRequest(
        `root-authority?tokenMintValue=${tokenMintValue}&policyTags=${policyTags}`,
        'get',
      );
    } catch (err: any) {
      logger.error(err, 'Get published root authority failed!');
      return { error: err.message };
    }

    return { rootAuthority: publishedRoot };
  }

  public async export(): Promise<IRootAuthority | null> {
    const rootSetting = await this.settingService.getDetailByName(
      'RootAuthority',
    );
    if (rootSetting) {
      const root = rootSetting.jsonValue as string;
      return { ...JSON.parse(root), isPublished: false };
    }

    return null;
  }

  public async import(
    root: IRootAuthority,
    isNew: boolean,
  ): Promise<IMutationResult> {
    let newRoot;
    if (isNew) {
      newRoot = this.em.create(Setting, {
        name: 'RootAuthority',
        jsonValue: JSON.stringify(root),
        description: 'Root Authority',
        type: 'string',
      } as any);
    } else {
      newRoot = (await this.settingService.getDetailByName(
        'RootAuthority',
      )) as Setting;
      newRoot.jsonValue = JSON.stringify(root);
    }
    try {
      await this.em.persistAndFlush(newRoot);
    } catch (err: any) {
      logger.error(err, 'Import root failed!');
      return {
        success: false,
        message: 'Import root failed!',
      };
    }
    return {
      success: true,
    };
  }
}
