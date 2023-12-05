/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import { IMutationResult, ITokenOwner } from '@tymlez/platform-api-interfaces';
import { format } from 'date-fns';

import { Setting } from '../../settings/entities/setting.entity';
import { SettingService } from '../../settings/setting.service';
import {
  CreateTokenOwnerDto,
  UpdateTokenOwnerDto,
} from '../dto/token-owner.dto';
import { GuardianService } from '../guardian.service';

@Injectable()
export class TokenOwnerService {
  private readonly logger = new Logger(TokenOwnerService.name);
  constructor(
    private readonly em: EntityManager,
    private readonly settingService: SettingService,
    private readonly guardianService: GuardianService,
  ) {}

  public async add(token: CreateTokenOwnerDto): Promise<IMutationResult> {
    if (new Date(token.businessRegistrationDate).getTime() > Date.now()) {
      return {
        success: false,
        message: 'Business Registration Date is in the future. Please check!',
      };
    }

    delete (token as any).submit;

    token.registeredOfficeAddress.addressId = uuidv4();

    token.businessLead.personId = uuidv4();

    if (token.operationalContact) {
      token.operationalContact.personId = uuidv4();
    }
    if (token.leadUserContact) {
      token.leadUserContact.personId = uuidv4();
    }
    if (token.financePersonContact) {
      token.financePersonContact.personId = uuidv4();
    }

    const newToken = this.em.create(Setting, {
      name: 'TokenOwner',
      jsonValue: JSON.stringify(token),
      description: 'Token Owner',
      type: 'string',
    } as any);

    try {
      await this.em.persistAndFlush(newToken);
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

  public async update(token: UpdateTokenOwnerDto): Promise<IMutationResult> {
    const existingTokenSetting = await this.settingService.getDetailByName(
      'TokenOwner',
    );

    if (existingTokenSetting === null) {
      return {
        success: false,
        message: 'Token Owner does not exist. No Token Owner to update',
      };
    }

    delete (token as any).submit;

    const existingtoken = JSON.parse(
      existingTokenSetting.jsonValue as string,
    ) as ITokenOwner;

    token.registeredOfficeAddress.addressId =
      existingtoken.registeredOfficeAddress.addressId;

    token.businessLead.personId = existingtoken.businessLead.personId;

    if (token.operationalContact) {
      token.operationalContact.personId =
        existingtoken.operationalContact &&
        existingtoken.operationalContact.personId !== ''
          ? existingtoken.operationalContact.personId
          : uuidv4();
    }
    if (token.leadUserContact) {
      token.leadUserContact.personId =
        existingtoken.leadUserContact &&
        existingtoken.leadUserContact.personId !== ''
          ? existingtoken.leadUserContact.personId
          : uuidv4();
    }
    if (token.financePersonContact) {
      token.financePersonContact.personId =
        existingtoken.financePersonContact &&
        existingtoken.financePersonContact.personId !== ''
          ? existingtoken.financePersonContact.personId
          : uuidv4();
    }

    existingTokenSetting.jsonValue = JSON.stringify(token);
    try {
      await this.em.persistAndFlush(existingTokenSetting);
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

  public async get(): Promise<ITokenOwner | null> {
    const tokenSetting = await this.settingService.getDetailByName(
      'TokenOwner',
    );
    if (tokenSetting) {
      const token = JSON.parse(tokenSetting.jsonValue as string);
      return token.isPublished
        ? { ...token }
        : { ...token, isPublished: false };
    }

    return null;
  }

  public async publish(): Promise<IMutationResult<boolean>> {
    const startTime = new Date().getTime();
    const token = await this.get();
    if (token === null) {
      return {
        success: false,
        message: `No Token Owner to be published`,
      };
    }

    delete (token as any).isPublished;

    if (token.operationalContact === null) {
      delete (token as any).operationalContact;
    }
    if (token.leadUserContact === null) {
      delete (token as any).leadUserContact;
    }
    if (token.financePersonContact === null) {
      delete (token as any).financePersonContact;
    }
    if (token.websiteLink === '') {
      delete (token as any).websiteLink;
    }

    try {
      token.businessRegistrationDate = format(
        new Date(token.businessRegistrationDate),
        'yyyy-MM-dd',
      );
      // Stop the long request before timeout
      const racePromise = new Promise((r) => {
        setTimeout(() => {
          r('TIMEOUT');
        }, 55000 - (new Date().getTime() - startTime));
      });

      const rootAuthorityId = token.tokenOwnerId;
      const rootAuthorityName = token.tokenOwnerName;
      delete (token as any).tokenOwnerId;
      delete (token as any).tokenOwnerName;

      const result = await Promise.race([
        racePromise,
        this.guardianService.makeGuardianRequest(`owner`, 'post', {
          ...token,
          rootAuthorityId,
          rootAuthorityName,
        }),
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
      logger.error(err, `Publish Token Owner failed! ${err.message}`);
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
      message: `Token Owner published`,
    };
  }

  private async updatePublishedSuccess(): Promise<IMutationResult> {
    const existingTokenSetting = await this.settingService.getDetailByName(
      'TokenOwner',
    );
    if (existingTokenSetting === null) {
      return {
        success: false,
      };
    }
    const existingToken = JSON.parse(
      existingTokenSetting.jsonValue as string,
    ) as ITokenOwner;

    existingToken.isPublished = true;
    existingTokenSetting.jsonValue = JSON.stringify(existingToken);
    try {
      await this.em.persistAndFlush(existingTokenSetting);
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

  public async getPublishedTokenOwner(): Promise<ITokenOwner | null> {
    let publishedToken = null;
    try {
      publishedToken = await this.guardianService.makeGuardianRequest(
        `owner`,
        'get',
      );
    } catch (err: any) {
      logger.error(err, 'Get published Token Owner failed!');
      return null;
    }
    return publishedToken.error ? null : publishedToken;
  }

  public async export(): Promise<ITokenOwner | null> {
    const tokenSetting = await this.settingService.getDetailByName(
      'TokenOwner',
    );
    if (tokenSetting) {
      const token = tokenSetting.jsonValue as string;
      return { ...JSON.parse(token), isPublished: false };
    }

    return null;
  }

  public async import(
    token: ITokenOwner,
    isNew: boolean,
  ): Promise<IMutationResult> {
    let newtoken;
    if (isNew) {
      newtoken = this.em.create(Setting, {
        name: 'TokenOwner',
        jsonValue: JSON.stringify(token),
        description: 'Token Owner',
        type: 'string',
      } as any);
    } else {
      newtoken = (await this.settingService.getDetailByName(
        'TokenOwner',
      )) as Setting;
      newtoken.jsonValue = JSON.stringify(token);
    }
    try {
      await this.em.persistAndFlush(newtoken);
    } catch (err: any) {
      logger.error(err, 'Import token failed!');
      return {
        success: false,
        message: 'Import token failed!',
      };
    }
    return {
      success: true,
    };
  }
}
