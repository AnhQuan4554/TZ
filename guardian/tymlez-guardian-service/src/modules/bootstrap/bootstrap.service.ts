/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EnumPolicyNames,
  EnumPolicyTokenSymbol,
  waitFor,
} from '@tymlez/common-libs';
import type {
  PolicyConfig,
  Session,
  TokenInfo,
  User,
} from '@tymlez/guardian-api-client';
import type { Model } from 'mongoose';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import type {
  IGuardianBootstrapStatus,
  IGuardianEntity,
  IGuardianSummary,
} from '@tymlez/platform-api-interfaces';
import { Encryption } from '@tymlez/backend-libs';
import { TymlezUser } from '../../schemas/user.schema';
import { BaseService } from '../base.service';
import type { RootAuthorityDto } from './dto/root-authority.dto';
import type { SiteDto } from './dto/site.dto';
import type { InstallerDto } from './dto/installer.dto';
import type { DeviceDto } from './dto/device.dto';
import { DeviceConfig } from '../../schemas/device-config.schema';
import type { ProjectDto } from './dto/project.dto';
import {
  BLOCK_TAGS,
  IDeviceGrid,
  IRootAuthorityGrid,
} from '../../interfaces/block';
import { BusinessException } from '../../common/exception';
import type { PublishPolicyDto } from './dto/publish-policy.dto';

@Injectable()
export class BootstrapService extends BaseService {
  private readonly logger = new Logger(BootstrapService.name);
  private bootstrapStatuses: string[] = [];
  private startedTime = new Date();

  constructor(
    @InjectModel(TymlezUser.name, 'tymlez')
    userModel: Model<TymlezUser>,

    @InjectModel(DeviceConfig.name, 'tymlez')
    private deviceConfigModel: Model<DeviceConfig>,
  ) {
    super(userModel);
  }

  private updateStatusMessage(message: string, reset = false) {
    this.logger.log(message);
    this.bootstrapStatuses.push(`${new Date().toISOString()} - ${message}`);
    if (this.bootstrapStatuses.length > 10) {
      this.bootstrapStatuses.splice(0, 1);
    }
    if (reset) {
      this.startedTime = new Date();
      this.bootstrapStatuses = [message];
    }
  }

  async getInstallerDevices(
    clientName: string,
    installerId: string,
    deviceId?: string,
  ): Promise<any> {
    const installerName = `${clientName}-${installerId}-installer`;
    const session = await this.loginAsUser(clientName, installerName);
    const installerDevices: any[] = [];
    const policies = await this.getPublishedPolicies(session);
    for await (const policy of policies) {
      const devices: any = await this.getPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.SENSORS_GRID,
      );
      installerDevices.push(
        devices.data.flatMap((x: any) => x.document.credentialSubject),
      );
    }

    return _.uniqBy(
      installerDevices
        .flat()
        .filter((x) => x.deviceId === deviceId || !deviceId),
      (x) => x.deviceId,
    );
  }

  async getInstallerData(
    clientName: string,
    installerId: string,
  ): Promise<any> {
    try {
      const installerName = `${clientName}-${installerId}-installer`;
      const session = await this.loginAsUser(clientName, installerName);
      const user = (await this.userModel.findOne({
        username: session.username,
      })) as TymlezUser;
      if (!user) {
        return {
          installerId,
          verified: false,
        };
      }
      return {
        installerId,
        verified: user.profile?.confirmed,
        data: { ...user.data, certification: undefined },
      };
    } catch (error) {
      this.logger.error({ error }, 'Installer not setup properly');
    }
    return {
      installerId,
      verified: false,
    };
  }

  async bootstrapDevice(device: DeviceDto, clientName: string): Promise<any> {
    this.updateStatusMessage('Start bootstrap device into system ', true);
    const installerName = `${clientName}-${device.installerId}-installer`;
    const session = await this.loginAsUser(clientName, installerName);
    const policies = await this.getPublishedPolicies(session);
    const devices = [];
    for await (const policy of policies) {
      devices.push(
        await this.bootstrapDeviceWithPolicy(
          session,
          device,
          policy,
          clientName,
        ),
      );
    }
    return { devices };
  }

  async bootstrapDeviceWithPolicy(
    session: Session,
    deviceInfo: DeviceDto,
    policy: PolicyConfig,
    clientName: string,
  ): Promise<any> {
    this.updateStatusMessage(
      `Bootstrap device '${deviceInfo.deviceName}' for policy ${policy.policyTag}`,
    );

    const block: any = await this.getPolicyBlockData(
      session,
      policy.id || '',
      BLOCK_TAGS.ADD_SENSOR_BNT,
    );
    const { deviceId } = { ...deviceInfo };
    const deviceConfigKey = `${session.username}-${policy.policyTag}-${policy.version}-${deviceId}`;
    const checkExisting = await this.deviceConfigModel.findOne({
      key: deviceConfigKey,
    });

    const assignSiteToDevice = async () => {
      const raSession = await this.loginAsRootAuthority(clientName);
      const data = await this.getPolicyBlockData<IDeviceGrid>(
        raSession,
        policy.id || '',
        BLOCK_TAGS.DEVICE_GRID,
      );
      this.updateStatusMessage(
        `Checking if device '${deviceInfo.deviceName}' is linked to a site`,
      );

      const findCurrentDevice = data.data.find(
        (x) =>
          x.__sourceTag__ === BLOCK_TAGS.DEVICE_NOT_LINKED_TO_SITE &&
          x.document.credentialSubject[0]?.deviceId === deviceId,
      );
      if (findCurrentDevice) {
        const sites: any = await this.getPolicyBlockData(
          raSession,
          policy.id || '',
          BLOCK_TAGS.SITE_GRID,
        );
        const site =
          sites.data.find(
            (x: any) =>
              x.document.credentialSubject[0]?.siteId === deviceInfo.siteId,
          ) || sites.data?.[0];

        assert(site, `Site ${deviceInfo.siteId} not found`);
        if (site) {
          findCurrentDevice.document.credentialSubject[0].siteId =
            site.document.credentialSubject[0].id;
        }
        this.updateStatusMessage(
          `Linking device '${deviceInfo.deviceName}' to Site`,
        );

        await this.setPolicyBlockData(
          raSession,
          policy.id || '',
          BLOCK_TAGS.ASSIGN_DEVICE_TO_SITE,
          findCurrentDevice,
        );
      }
    };

    if (checkExisting) {
      await assignSiteToDevice();
      this.logger.log('Device already installer %s', deviceConfigKey);
      return checkExisting;
    }
    const certification = deviceInfo.certification.includes(
      'https://ipfs.io/ipfs',
    )
      ? deviceInfo.certification
      : await this.api
          .ipfs()
          .upload(session, Buffer.from(deviceInfo.certification, 'base64'));

    const updateDeviceData = {
      document: {
        type: block.schema?.iri?.replace('#', ''),
        '@context': [block.schema?.contextURL],
        ...deviceInfo,
        installerId: undefined,
        certification,
      },
    };

    await this.setPolicyBlockData(
      session,
      policy.id || '',
      BLOCK_TAGS.ADD_SENSOR_BNT,
      updateDeviceData,
    );

    let addedDevice;
    let installedDevices;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      installedDevices = await this.getPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.SENSORS_GRID,
      );

      addedDevice = (installedDevices.data as any[]).find((dv: any) =>
        dv.document.credentialSubject.some(
          (x: any) => x.deviceId === deviceInfo.deviceId,
        ),
      );
      if (addedDevice) {
        break;
      }
      await waitFor(1000);
    }

    assert(
      addedDevice,
      `Number of new devices is not detected, expect found 1 device`,
    );

    this.logger.log(
      `Getting device config for ${deviceId} with policy ${policy.policyTag}`,
    );
    await assignSiteToDevice();
    const deviceConfig: any = await this.setPolicyBlockData(
      session,
      policy.id || '',
      BLOCK_TAGS.DOWNLOAD_CONFIG_BTN,
      {
        owner: addedDevice.owner,
        document: addedDevice.document,
      },
    );
    const newDeviceConfig = {
      key: deviceConfigKey,
      deviceId,
      deviceType: deviceInfo.deviceType,
      policyTag: policy.policyTag,
      config: deviceConfig.body,
      data: deviceInfo,
      clientName,
    } as DeviceConfig;

    this.logger.log('add device to db', deviceConfigKey);
    newDeviceConfig.config.schema = JSON.stringify(
      newDeviceConfig.config.schema,
    );
    this.deviceConfigModel.create(newDeviceConfig);
    return { ...addedDevice };
  }

  public async bootstrapSiteData(
    siteData: SiteDto,
    clientName: string,
  ): Promise<any> {
    this.updateStatusMessage('Bootstrapping site data', true);
    const session = await this.loginAsRootAuthority(clientName);
    const policies = await this.api.policy().getAll(session);
    const successfulPolicies: string[] = [];
    for await (const policy of policies.filter((x) => x.status === 'PUBLISH')) {
      this.updateStatusMessage(
        `Bootstrapping site data for ${policy.policyTag}`,
      );
      const sites: any = await this.getPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.SITE_GRID,
      );
      const site = sites.data.find(
        (x: any) =>
          x.document.credentialSubject[0].siteName === siteData.siteName,
      );
      if (site) {
        continue;
      }

      if (policy.name === EnumPolicyNames.Tymlez_CRU) {
        this.updateStatusMessage('Query project information');
        const { data: project }: any = await this.getPolicyBlockData(
          session,
          policy.id || '',
          BLOCK_TAGS.PROJECT_GRID,
        );
        assert(project.length > 0, 'Project data not found');
        siteData.projectId = project[0].document.credentialSubject[0].id;
      }
      this.updateStatusMessage(
        `Create new Site for policy: ${policy.policyTag}`,
      );
      const blockSetting: any = await this.getPolicyBlockData(
        session,
        policy.id as string,
        BLOCK_TAGS.REQUEST_SITE_DATA,
      );
      const siteDataWithContext = {
        document: {
          type: blockSetting.schema?.iri?.replace('#', ''),
          '@context': [blockSetting.schema?.contextURL],
          ...siteData,
        },
      };

      await this.setPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.REQUEST_SITE_DATA,
        siteDataWithContext,
      );
      let isDone = false;
      while (!isDone) {
        await waitFor(3000);
        const siteGrid = await this.getPolicyBlockData<IDeviceGrid>(
          session,
          policy.id as string,
          BLOCK_TAGS.SITE_GRID,
        );
        isDone = siteGrid.data.length > 0;
      }
      successfulPolicies.push(policy.name);
    }
    this.updateStatusMessage('DONE');
    return { successfulPolicies };
  }

  private isPolicyProjectApplicable(policyName: string) {
    const projectApplicablePolicies = [
      EnumPolicyNames.Tymlez_CRU,
      EnumPolicyNames.Tymlez_GOO,
      EnumPolicyNames.Tymlez_REC,
    ];
    return projectApplicablePolicies.includes(policyName as any);
  }

  private async updatePolicyProject(
    project: ProjectDto,
    policy: PolicyConfig,
    session: Session,
  ) {
    this.updateStatusMessage('Bootstrap policy project data');
    if (this.isPolicyProjectApplicable(policy.name)) {
      const requestProjectBlock = await this.getPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.REQUEST_PROJECT_DATA,
      );

      if (!requestProjectBlock) {
        return 'Project has been setup on policies';
      }
      this.updateStatusMessage(
        `Bootstrap project for policy ${policy.policyTag} version: ${policy.version}`,
      );

      const blockSetting: any = await this.getPolicyBlockData(
        session,
        policy.id as string,
        BLOCK_TAGS.REQUEST_PROJECT_DATA,
      );

      const cleanedProjectDto: Record<string, any> = { ...project };

      if (policy.name === EnumPolicyNames.Tymlez_REC) {
        delete cleanedProjectDto['plannedUNSDGImpacts'];
      }

      const projectVC = {
        document: {
          type: blockSetting.schema?.iri?.replace('#', ''),
          '@context': [blockSetting.schema?.contextURL],
          ...cleanedProjectDto,
        },
      };
      this.updateStatusMessage(
        `Waiting project data update for ${policy.policyTag} version: ${policy.version}`,
      );
      await this.setPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.REQUEST_PROJECT_DATA,
        projectVC,
      );
    }
    return '';
  }

  public async bootstrapProjectData(
    project: ProjectDto,
    clientName: string,
  ): Promise<any> {
    this.updateStatusMessage('Boostrap project data', true);
    const session = await this.loginAsRootAuthority(clientName);
    const policies = await this.getPublishedPolicies(session);
    let message = '';
    for await (const policy of policies) {
      message = await this.updatePolicyProject(project, policy, session);
    }
    this.updateStatusMessage('DONE');
    return { message, project };
  }

  public async getRootAuthority(
    clientName: string,
    tokenMintValue: number,
    enabledPolicies: EnumPolicyNames[] = [],
  ): Promise<any> {
    const session = await this.loginAsRootAuthority(clientName);
    const rootAuthority = await this.api.profile().getProfile(session);
    const user = await this.userModel.findOne({ username: session.username });
    if (rootAuthority?.confirmed) {
      const publishedPolicies = await this.getPublishedPolicies(session);
      const processedPolicyNames = publishedPolicies.map(
        (x) => x.name as EnumPolicyNames,
      );
      const unprocessedPolicyNames = enabledPolicies.filter(
        (x) => !processedPolicyNames.includes(x as EnumPolicyNames),
      );

      if (unprocessedPolicyNames.length > 0) {
        this.bootstrapAlways(
          session,
          clientName,
          user?.data,
          tokenMintValue,
          enabledPolicies,
        );
        return (rootAuthority.vcDocument as any)?.document
          ?.credentialSubject?.[0];
      }
      return {
        error: true,
        message: 'Root Authority has been bootstraped partially',
      };
    }
    return {
      error: true,
      message: 'Root Authority has not been initialized',
    };
  }

  async createInstaller(installer: InstallerDto, clientName: string) {
    this.updateStatusMessage(
      `Bootstrap Installer started: ${installer.installerName}`,
      true,
    );
    const rootAuthority = await this.loginAsRootAuthority(clientName);
    const rootAuthorityProfile = await this.api
      .profile()
      .getProfile(rootAuthority);
    const username = `${clientName}-${installer.installerId}-installer`;
    const user = await this.userModel.findOne({ username });
    if (user) {
      const session = await this.loginAsUser(clientName, username);

      const profile = await this.initInstaller(
        session,
        rootAuthority,
        rootAuthorityProfile,
        installer,
      );
      if (!user.did) {
        user.profile = profile;
        user.did = profile.did;

        await user.save();
      }

      return {
        message: `Installer profile has been setup for user "${username}"`,
        profile,
      };
    }
    // create user

    const password =
      process.env.GUARDIAN_USER_PASSWORD || Encryption.randomPassword(24);
    const encryptedPassword = Encryption.encrypt(password);
    // register user
    this.updateStatusMessage('Register new installer');
    await this.api.auth().register(username, password, 'USER');

    const newInstaller = await this.userModel.create({
      username,
      password: encryptedPassword.encrypted,
      iv: encryptedPassword.iv,
      client: clientName,
      role: 'USER',
      data: installer,
    });
    const session = await this.loginAsUser(clientName, username);
    this.updateStatusMessage('Setting up installer profile');
    const profile = await this.initInstaller(
      session,
      rootAuthority,
      rootAuthorityProfile,
      installer,
    );
    // update installer with profile and did
    newInstaller.profile = profile;
    newInstaller.did = profile.did;

    await newInstaller.save();
    return { profile };
  }

  async initInstaller(
    session: Session,
    rootAuthoritySession: Session,
    rootAuthority: User,
    data: InstallerDto,
  ) {
    this.updateStatusMessage('Start setup installer');
    const installerSetup = async (userSession: Session, root: Session) => {
      // associated token to user
      await this.associateTokenToUsers(userSession);

      await this.grantKycTokenToUsers(userSession, root);
      const policies = await this.api.policy().getAll(userSession);

      // setup installer profile in policy
      for await (const policy of policies) {
        await this.registerInstaller(session, data, policy);
      }
    };
    let profile = await this.api.profile().getProfile(session);
    if (profile.confirmed) {
      await installerSetup(session, rootAuthoritySession);
      return profile;
    }
    this.updateStatusMessage('Creating new installer account on chain');
    // setup user with root Authority
    const randomKey = await this.api.demo().getRandomKey();
    this.updateStatusMessage('Linking installer with guardian user');
    await this.api.profile().updateProfile(session, session.username, {
      hederaAccountId: randomKey.id,
      hederaAccountKey: randomKey.key,
      parent: rootAuthority.did,
    });
    this.updateStatusMessage('Waiting on account update on chain');
    profile = await this.waitForProfileConfirm(session);
    await installerSetup(session, rootAuthoritySession);

    return profile;
  }

  async registerInstaller(
    session: Session,
    installerInfo: InstallerDto,
    policy: PolicyConfig,
  ) {
    this.updateStatusMessage(`Registering installer in policy: ${policy.name}`);

    const role = await this.getPolicyBlockData(
      session,
      policy.id as string,
      BLOCK_TAGS.CHOOSE_ROLE_USER_ROLE,
    );
    if (role) {
      await this.setPolicyBlockData(
        session,
        policy.id as string,
        BLOCK_TAGS.CHOOSE_ROLE_USER_ROLE,
        { role: 'INSTALLER' },
      );
    }
    const installerBlock = await this.getPolicyBlockData(
      session,
      policy.id as string,
      BLOCK_TAGS.ADD_NEW_INSTALLER_REQUEST,
    );
    if (!installerBlock) {
      this.logger.log(
        `Skip because installer '${installerInfo.installerId}' was registered before.`,
        installerBlock,
      );
      return {};
    }
    this.updateStatusMessage(
      `Registering installer role in policy: ${policy.name}`,
    );

    const block: any = await this.getPolicyBlockData(
      session,
      policy.id as string,
      BLOCK_TAGS.ADD_NEW_INSTALLER_REQUEST,
    );

    this.updateStatusMessage('Uploading installer certificaiton to ipfs');
    // TODO : add encryption
    try {
      const certificationUrl = await this.api
        .ipfs()
        .upload(session, Buffer.from(installerInfo.certification, 'base64'));

      installerInfo.certification = certificationUrl;
    } catch (err) {
      console.error('error upload ipfs', err);
      throw err;
    }
    this.updateStatusMessage('Setting up installer profile with vc data');
    // transform the installer data for child
    await this.setPolicyBlockData(
      session,
      policy.id as string,
      BLOCK_TAGS.ADD_NEW_INSTALLER_REQUEST,
      {
        document: {
          type: block.schema?.iri.replace('#', ''),
          '@context': [block.schema?.contextURL],
          ...installerInfo,
        },
      },
    );
    this.updateStatusMessage('DONE', true);
    return {};
  }

  async associateTokenToUsers(session: Session) {
    const tokens = await this.api.token().listTokens(session);
    for await (const token of tokens) {
      if (!token.associated) {
        await this.api.token().associate(session, token.tokenId);
      }
    }
    return await this.api.token().listTokens(session);
  }

  async grantKycTokenToUsers(session: Session, rootAuthoritySession: Session) {
    const profile = await this.api.profile().getProfile(session);

    const tokens = await this.api.token().listTokens(session);
    for await (const token of tokens) {
      // TODO: regenerate the Guardian Client API to support enableKYC field.
      if (
        token.associated &&
        !token.kyc &&
        (token as TokenInfo & { enableKYC: boolean }).enableKYC
      ) {
        await this.api
          .token()
          .grantKyc(rootAuthoritySession, token.tokenId, profile.username);
      }
    }
    return await this.api.token().listTokens(session);
  }

  getStatus(clientName: string): IGuardianBootstrapStatus {
    return {
      clientName,
      startedAt: this.startedTime.toISOString(),
      totalTimes: new Date().getTime() - this.startedTime.getTime(),
      status: this.bootstrapStatuses,
      inProgress: ['DONE', 'ERROR'].includes(this.bootstrapStatuses[0]),
    };
  }

  async bootstrapRootAuthority(
    rootAuthority: RootAuthorityDto,
    clientName: string,
    tokenMintValue: number,
    enabledPolicies: EnumPolicyNames[] = [],
  ) {
    this.updateStatusMessage('Bootstrap root authority started', true);
    // create user
    const username = `${clientName}-root-authority`;
    const user = await this.userModel.findOne({ username });
    if (user) {
      const session = await this.loginAsRootAuthority(clientName);
      const profile = await this.initRootConfig(session, rootAuthority);
      await this.bootstrapAlways(
        session,
        clientName,
        rootAuthority,
        tokenMintValue,
        enabledPolicies,
      );
      return {
        message: `Root Authority has been created for "${username}"`,
        profile: (profile.vcDocument as any)?.document?.credentialSubject?.[0],
      };
    }

    const password =
      process.env.GUARDIAN_USER_PASSWORD || Encryption.randomPassword(24);
    const encryptedPassword = Encryption.encrypt(password);
    // register user

    await this.api.auth().register(username, password, 'STANDARD_REGISTRY');

    await this.userModel.create({
      username,
      password: encryptedPassword.encrypted,
      iv: encryptedPassword.iv,
      client: clientName,
      role: 'STANDARD_REGISTRY',
      data: rootAuthority,
    });
    const session = await this.loginAsRootAuthority(clientName);
    const profile = await this.initRootConfig(session, rootAuthority);
    await this.bootstrapAlways(
      session,
      clientName,
      rootAuthority,
      tokenMintValue,
      enabledPolicies,
    );
    return {
      profile: (profile.vcDocument as any)?.document?.credentialSubject?.[0],
    };
  }

  async getOwner(clientName: string) {
    const session = await this.loginAsOwner(clientName);
    const policies = await this.getPublishedPolicies(session);
    const data = [];
    for await (const policy of policies) {
      const doc = await this.getPolicyBlockData<IRootAuthorityGrid>(
        session,
        policy.id || '',
        BLOCK_TAGS.TOKEN_OWNER_DOCUMENT,
      );
      if (doc.data.length > 0) {
        data.push(doc.data[0].document.credentialSubject[0]);
      }
    }
    if (data.length !== policies.length) {
      throw new BusinessException(
        400,
        'Owner has not been setup for all policies',
      );
    }
    return data[0];
  }

  async bootstrapOwner(owner: RootAuthorityDto, clientName: string) {
    const rootAuthority = await this.loginAsRootAuthority(clientName);
    const rootAuthorityProfile = await this.api
      .profile()
      .getProfile(rootAuthority);
    const username = `${clientName}-owner`;
    const user = await this.userModel.findOne({ username });
    if (user) {
      const session = await this.loginAsUser(clientName, username);

      const profile = await this.initOwner(
        session,
        rootAuthority,
        rootAuthorityProfile,
        owner,
      );
      if (!user.did) {
        user.profile = profile;
        user.did = profile.did;

        await user.save();
      }

      return {
        message: `Owner profile has been setup for client "${clientName}"`,
        profile,
      };
    }
    // create owner

    const password =
      process.env.GUARDIAN_USER_PASSWORD || Encryption.randomPassword(24);
    const encryptedPassword = Encryption.encrypt(password);
    // register user
    this.updateStatusMessage('Register new owner');
    await this.api.auth().register(username, password, 'USER');

    const newOwner = await this.userModel.create({
      username,
      password: encryptedPassword.encrypted,
      iv: encryptedPassword.iv,
      client: clientName,
      role: 'USER',
      data: owner,
    });
    const session = await this.loginAsUser(clientName, username);
    this.updateStatusMessage('Setting up owner profile');
    const profile = await this.initOwner(
      session,
      rootAuthority,
      rootAuthorityProfile,
      owner,
    );
    // update installer with profile and did
    newOwner.profile = profile;
    newOwner.did = profile.did;

    await newOwner.save();
    return { profile };
  }

  async initOwner(
    session: Session,
    rootAuthoritySession: Session,
    rootAuthority: User,
    data: RootAuthorityDto,
  ) {
    let profile = await this.api.profile().getProfile(session);
    if (profile.confirmed) {
      const policies = await this.getPublishedPolicies(session);

      for await (const p of policies) {
        await this.setupOwnerProfileForPolicy(session, p, data);
      }
      return profile;
    }
    this.updateStatusMessage('Creating new owner account on chain');
    // setup user with root Authority
    const randomKey = await this.api.demo().getRandomKey();
    this.updateStatusMessage('Linking owner with guardian user');
    await this.api.profile().updateProfile(session, session.username, {
      hederaAccountId: randomKey.id,
      hederaAccountKey: randomKey.key,
      parent: rootAuthority.did,
    });
    this.updateStatusMessage('Waiting on owner account confirm on chain');
    profile = await this.waitForProfileConfirm(session);

    this.updateStatusMessage('Associate tokens to token owner');
    await this.associateTokenToUsers(session);
    this.updateStatusMessage('Granting KYC tokens to owner');
    await this.grantKycTokenToUsers(session, rootAuthoritySession);

    const policies = await this.getPublishedPolicies(session);
    for await (const p of policies) {
      await this.setupOwnerProfileForPolicy(session, p, data);
    }
    return profile;
  }

  private async bootstrapAlways(
    session: Session,
    clientName: string,
    rootAuthority: RootAuthorityDto,
    tokenMintValue: number,
    enabledPolicies: EnumPolicyNames[] = [],
  ) {
    const profile = await this.api.profile().getProfile(session);
    if (rootAuthority) {
      rootAuthority.rootAuthorityId = profile.did as string;
    }
    const tokens = await this.createTokens(session, enabledPolicies);
    const policies = await this.createPolicies(
      session,
      clientName,
      tokens,
      tokenMintValue,
      '',
      enabledPolicies,
    );

    // eslint-disable-next-line no-unreachable-loop
    for await (const existingPolicy of policies) {
      const policy = await this.api
        .policy()
        .getById(session, existingPolicy.id || '');

      await this.createSchemas(session, clientName, policy);

      if (policy.status === 'DRAFT') {
        this.logger.log(`Publishing policy %s`, policy.name);
        this.updateStatusMessage(`Publishing policy ${policy.name}`);

        await this.api.policy().publish(session, policy.id || '', '1.0.0');
      }
    }

    this.updateStatusMessage('DONE');
  }

  private async setupOwnerProfileForPolicy(
    session: Session,
    policy: PolicyConfig,
    owner: any,
  ) {
    this.updateStatusMessage('Register owner to policy');
    if ((policy as any).userRoles[0] === 'The user does not have a role') {
      this.updateStatusMessage(
        `Registering owner role in policy: ${policy.name}`,
      );
      // const role = await this.getPolicyBlockData(
      //   session,
      //   policy.id as string,
      //   BLOCK_TAGS.CHOOSE_ROLE_USER_ROLE,
      // );
      await this.setPolicyBlockData(
        session,
        policy.id as string,
        BLOCK_TAGS.CHOOSE_ROLE_USER_ROLE,
        { role: 'TOKEN_OWNER' },
      );
    }

    const block: any = await this.getPolicyBlockData(
      session,
      policy.id as string,
      BLOCK_TAGS.REQUEST_OWNER_VC,
    );

    this.updateStatusMessage(`Setting up owner vc for policy ${policy.name}`);

    const data = await this.getPolicyBlockData(
      session,
      policy.id as string,
      BLOCK_TAGS.REQUEST_OWNER_VC,
    );

    if (!data) {
      this.logger.log(`Skip because owner was registered before.`);
      return;
    }

    if (owner) {
      [
        'businessLead',
        'registeredOfficeAddress',
        'operationalContact',
        'leadUserContact',
        'financePersonContact',
      ].forEach((prop) => {
        if (owner[prop]) {
          owner[prop] = {
            ...owner[prop],
            '@context': [block.schema?.contextURL],
            type: block.schema.document.properties[prop].$ref?.replace('#', ''),
          };
        }
      });

      // Update root authority

      const rootAuthorityVC = {
        document: {
          type: block.schema?.iri?.replace('#', ''),
          '@context': [block.schema?.contextURL],
          ...owner,
        },
      };
      this.updateStatusMessage(`Sending owner data to policy: ${policy.name}`);
      await this.setPolicyBlockData(
        session,
        policy.id || '',
        BLOCK_TAGS.REQUEST_OWNER_VC,
        rootAuthorityVC,
      );
    }
  }

  private async createTokens(
    session: Session,
    enabledPolicies: EnumPolicyNames[],
  ) {
    const tokens = JSON.parse(
      fs.readFileSync(path.resolve('data/tokens.json'), 'utf8'),
    ) as TokenInfo[];
    const existingToken = await this.api.token().listTokens(session);
    const tokenToCreated = tokens.filter(
      (t) =>
        enabledPolicies.includes(t.tokenName as any) &&
        !existingToken.find((et: TokenInfo) => et.tokenName === t.tokenName),
    );

    for await (const token of tokenToCreated) {
      this.logger.log({ token }, 'Create tokens');
      this.updateStatusMessage(`Creating token ${token.tokenName}`);
      await this.api.token().create(session, token as any);
    }
    return await this.api.token().listTokens(session);
  }

  private async createPolicies(
    session: Session,
    clientName: string,
    tokens: TokenInfo[],
    tokenMintValue: number,
    version = '',
    enabledPolicies: EnumPolicyNames[] = [],
  ) {
    const getPolicy = (name: EnumPolicyNames, token: TokenInfo) => {
      let json = fs.readFileSync(
        path.resolve(`data/policies/${name}.json`),
        'utf8',
      );
      // replace the dynamic value

      json = json.replace('sum(total) >= 1', `sum(total) >= ${tokenMintValue}`);
      json = json.replace(
        'CO2eqEmissions/1',
        `CO2eqEmissions/${tokenMintValue}`,
      );
      json = json.replace(
        'CO2eqEmissionsReduction/1',
        `CO2eqEmissionsReduction/${tokenMintValue}`,
      );
      json = json.replace('value/1', `value/${tokenMintValue}`);
      json = json.replace(
        '__MEMO__',
        `ipfs-cdn=${
          process.env.IPFS_CDN_URL || 'https://testnet.data.tymlez.com'
        }`,
      );

      const policy = JSON.parse(json);
      policy.config.children
        .find((p: any) => p.tag === BLOCK_TAGS.MINT_EVENTS)
        .children.find((p: any) => p.tag === BLOCK_TAGS.MINT_TOKEN).tokenId =
        token.tokenId;
      //  Update threshold with corresponding config value send from platform setting.
      policy.config.children
        .find((p: any) => p.tag === BLOCK_TAGS.MINT_EVENTS)
        .children.find(
          (p: any) => p.tag === BLOCK_TAGS.MRV_SPLIT,
        ).threshold = `${tokenMintValue}`;

      return policy;
    };

    const policies = Object.entries(EnumPolicyNames)
      .map(([policyKey, policyName]) => {
        if (enabledPolicies.includes(policyName as any)) {
          const tokenSymbol =
            EnumPolicyTokenSymbol[
              policyKey as keyof typeof EnumPolicyTokenSymbol
            ];
          return getPolicy(
            policyName,
            tokens.find((x) => x.tokenSymbol === tokenSymbol) as TokenInfo,
          );
        }
        return null;
      })
      .filter(Boolean);

    const existingPolicies = await this.api.policy().getAll(session);
    const policyNames = policies.map((p) => p.name);

    for await (const policy of policies) {
      const existPolicy = existingPolicies.find((p) => p.name === policy.name);
      const policyTag = `${clientName}.${policy.policyTag}.${
        version || '1.0.0'
      }`;
      if (!existPolicy) {
        policy.policyTag = policyTag;
        this.logger.log('Create policy %s', policy.policyTag);
        this.updateStatusMessage(`Creating policy ${policy.policyTag}`);
        await this.api.policy().create(session, policy);
      } else {
        // create new version of existing policy
        if (version && existPolicy.status === 'PUBLISH') {
          const newVersionPolicy = {
            ...existPolicy,
            previousVersion: existPolicy.version,
            policyTag,
            config: policy.config,
            status: 'DRAFT',
          };
          await this.api.policy().create(session, newVersionPolicy);
        }
        if (existPolicy.status === 'DRAFT') {
          this.logger.log('Update policy %s', policy.policyTag);
          this.updateStatusMessage(`Update policy ${policy.policyTag}`);
          await this.api.policy().update(session, existPolicy.id || '', {
            ...existPolicy,
            config: policy.config,
          });
        }
      }
    }

    const allPolicies = await this.api.policy().getAll(session);

    return allPolicies.filter((x) => policyNames.includes(x.name));
  }

  private async createSchemas(
    session: Session,
    clientName: string,
    policy: PolicyConfig,
  ) {
    const getSchema = (name: string) => {
      const files = [
        path.resolve(`data/schemas/${policy.name}/${name}.json`),
        path.resolve(`data/schemas/${name}.json`),
      ];
      for (const file of files) {
        if (fs.existsSync(file)) {
          const schemaJson = JSON.parse(fs.readFileSync(file, 'utf8'));
          const allKeys = Object.keys(schemaJson.document.properties);

          // eslint-disable-next-line no-loop-func
          schemaJson.fields = allKeys.map((key) => ({
            description: schemaJson.document.properties[key].description,
            isArray: schemaJson.document.properties[key].type === 'array',
            isRef: !!schemaJson.document.properties[key]?.items?.$ref,
            name: schemaJson.document.properties[key].title,
            title: schemaJson.document.properties[key].title,
            required: schemaJson.document.required.includes(key),
            readOnly: ['ref', 'policyId'].includes(key),
            type: schemaJson.document.properties[key].type,
          }));
          return schemaJson;
        }
      }
      return null;
    };

    if (!Object.values(EnumPolicyNames).includes(policy.name as any)) {
      return;
    }
    const shareSchemas = ['Person', 'Address', 'Data Source'];
    const sources = [
      getSchema('person'),
      getSchema('data-source'),
      getSchema('address'),
      getSchema('root-authority'),
      getSchema('site'),
      getSchema('project'),
      getSchema('installer'),
      getSchema('device'),
      getSchema('mrv'),
    ].filter(Boolean);
    const idMaps = sources.reduce(
      (acc, item) => ({ ...acc, [item.document.$id]: item.name }),
      {},
    );

    for await (const schema of sources) {
      const allSchemas = await this.api
        .schema()
        .getAllByTopicId(session, policy.topicId);

      this.updateStatusMessage(
        `Creating schema : ${policy.policyTag}/${schema.name}`,
      );
      this.logger.log(
        'Processing schema %s %s %s ',
        clientName,
        schema.name,
        schema.uuid,
      );
      const publishedSchema = allSchemas.filter(
        (x) => x.status === 'PUBLISHED',
      );

      //  generate new ids
      const newId = uuidv4();
      schema.uuid = newId;
      schema.document.$id = `#${newId}`;
      const comment = JSON.parse(schema.document.$comment);
      comment['@id'] = `#${newId}`;
      schema.document.$comment = JSON.stringify(comment);
      Object.keys(schema.document.properties).forEach((k) => {
        const ref =
          schema.document.properties[k].$ref ||
          schema.document.properties[k].items?.$ref;
        if (ref) {
          this.logger.log(
            'Update reference to schema %s %s %s ',
            schema.name,
            schema.uuid,
            ref,
            idMaps[ref],
          );
          const refSchemaName = idMaps[ref];
          const findSchema = publishedSchema.find(
            (x) => x.name === refSchemaName,
          );
          if (findSchema) {
            if (schema.document.properties[k].$ref) {
              schema.document.properties[k].$ref = findSchema?.iri;
            }

            if (schema.document.properties[k].items?.$ref) {
              schema.document.properties[k].items.$ref = findSchema?.iri;
            }

            schema.document.$defs[findSchema?.iri || ''] = JSON.parse(
              findSchema?.document as string,
            );
          }
        }
      });

      schema.topicId = policy.topicId;
      //created schema
      if (!allSchemas.find((x) => x.name === schema.name)) {
        await this.api.schema().create(session, policy.topicId, schema);
      }

      const createdSchema = (
        await this.api.schema().getAllByTopicId(session, policy.topicId)
      ).find((s) => s.name === schema.name);

      if (
        shareSchemas.includes(schema.name) &&
        createdSchema &&
        createdSchema.status === 'DRAFT'
      ) {
        this.updateStatusMessage(
          `Publishing schema: ${policy.policyTag}/${createdSchema.name}`,
        );
        await this.api.schema().publish(session, createdSchema.id, '1.0.0');

        this.updateStatusMessage(
          `Published schema: ${policy.policyTag}/${createdSchema.name}`,
        );
      }
    }

    const existSchemes = await this.api
      .schema()
      .getAllByTopicId(session, policy.topicId);

    // installer schemas
    const [
      installerSchema,
      mrvSchema,
      deviceSchema,
      projectSchema,
      siteSchema,
      rootAuthoritySchema,
    ] = ['Installer', 'MRV', 'Device', 'Project', 'Site', 'Root Authority'].map(
      (schemaName) => existSchemes.find((x) => x.name === schemaName),
    );

    this.updatePolicySchema(
      policy,
      [
        BLOCK_TAGS.ADD_NEW_INSTALLER_REQUEST,
        BLOCK_TAGS.INSTALLER_GRID_DATA,
        BLOCK_TAGS.RA_INSTALLER_DATA,
      ],
      installerSchema?.iri || '',
    );

    this.updatePolicySchema(
      policy,
      [
        BLOCK_TAGS.SENSORS_GRID_FILTERS,
        BLOCK_TAGS.DEVICE_SITE_SELECTOR,
        BLOCK_TAGS.ADD_SENSOR_BNT,
        BLOCK_TAGS.DEVICE_NOT_LINKED_TO_SITE,
        BLOCK_TAGS.DEVICE_LINKED_TO_SITE,
      ],
      deviceSchema?.iri || '',
    );

    this.updatePolicySchema(
      policy,
      [
        BLOCK_TAGS.SENSORS_GRID,
        BLOCK_TAGS.MRV_GRIDS,
        BLOCK_TAGS.MRV_SOURCE,
        BLOCK_TAGS.MVR_GRID_FILTERS,
        BLOCK_TAGS.DOWNLOAD_CONFIG_BTN,
      ],
      mrvSchema?.iri || '',
    );

    this.updatePolicySchema(
      policy,
      [
        BLOCK_TAGS.REQUEST_SITE_DATA,
        BLOCK_TAGS.SITE_GRID_DATA,
        BLOCK_TAGS.DEVICE_SITE_SELECTOR,
      ],
      siteSchema?.iri || '',
    );

    this.updatePolicySchema(
      policy,
      [BLOCK_TAGS.REQUEST_OWNER_VC, BLOCK_TAGS.TOKEN_OWNER_DOCUMENT_DATA],
      rootAuthoritySchema?.iri || '',
    );

    this.updatePolicySchema(
      policy,
      [BLOCK_TAGS.REQUEST_PROJECT_DATA, BLOCK_TAGS.PROJECT_GRID_DATA],
      projectSchema?.iri || '',
    );

    this.updateStatusMessage(
      `Patching policy with schema id : ${policy.policyTag}, policy version : ${policy.version} status = ${policy.status}`,
    );
    this.logger.log('Update policy');
    await this.api.policy().update(session, policy.id || '', policy);
  }

  private updatePolicySchema(
    policy: any,
    tags: string | string[],
    schema: string,
  ) {
    if (typeof policy !== 'object' || !policy) {
      return;
    }
    if (Array.isArray(policy)) {
      policy.forEach((p) => this.updatePolicySchema(p, tags, schema));
    }
    const lookupTags = Array.isArray(tags) ? tags : [tags];
    Object.keys(policy).forEach((key) => {
      if (policy[key] && lookupTags.includes(policy[key].tag)) {
        if (policy[key].schema) {
          policy[key].schema = schema;
        }
        if (policy[key].filters?.schema) {
          policy[key].filters.schema = schema;
        }
        return;
      }
      this.updatePolicySchema(policy[key], lookupTags, schema);
    });
  }

  public async initRootConfig(session: Session, data: any) {
    this.updateStatusMessage('Start initialize root authority', true);

    const rootAuthority = await this.api.profile().getProfile(session);

    if (rootAuthority?.confirmed) {
      this.logger.log('Skip because root config already initialized');
      return rootAuthority;
    }

    // ensure the rootAuthority schema
    const safeData = { ...data };
    Object.keys(safeData).forEach((key) => {
      if (!safeData[key]) {
        delete safeData[key];
      }
      if (typeof safeData[key] === 'object') {
        safeData[key]['@context'] = [];
      }
    });
    this.updateStatusMessage('Generate root authority account');
    const randomKey = await this.api.demo().getRandomKey();

    //--------- Start Create Tymlez Standar Registry User --------------------//

    const getSchema = (name: string) => {
      const file = path.resolve(`data/schemas/${name}.json`);
      const fileData = JSON.parse(fs.readFileSync(file, 'utf8'));
      const allKeys = Object.keys(fileData.document.properties);

      fileData.fields = allKeys.map((key) => ({
        description: fileData.document.properties[key].description,
        isArray: false,
        isRef: !!fileData.document.properties[key]?.items?.$ref,
        name: fileData.document.properties[key].title,
        title: fileData.document.properties[key].title,
        required: fileData.document.required.includes(key),
        readOnly: ['ref', 'policyId'].includes(key),
        type: fileData.document.properties[key].type,
      }));
      return fileData;
    };

    const tymlezStandardRegistrySchema = getSchema('standard-registry');

    await this.api
      .schema()
      .createStandardRegistry(
        session,
        tymlezStandardRegistrySchema,
        session.username,
      );

    const createdSchema = (
      await this.api
        .schema()
        .getStandardRegistry(session, 0, 100, session.username)
    ).find((s) => s.name === tymlezStandardRegistrySchema.name);

    if (createdSchema && createdSchema.id) {
      await this.api
        .schema()
        .activateStandardRegistry(session, createdSchema.id);
    }

    //--------- End Create Tymlez Standar Registry User --------------------//

    this.updateStatusMessage('Setting up root authority profile');
    await this.api.profile().updateProfile(session, session.username, {
      vcDocument: {
        name: 'Tymlez',
        type: 'TymlezStandardRegistry',
        ...safeData,
        '@context': [],
      },
      hederaAccountId: randomKey.id,
      hederaAccountKey: randomKey.key,
    });
    this.updateStatusMessage('Waiting root authority account setup on chain');
    return await this.waitForProfileConfirm(session);
  }

  public async getBootstrapSummary(
    clientName: string,
  ): Promise<IGuardianSummary> {
    const defaultValue: IGuardianSummary = {
      status: 'Not Ready',
      policies: 0,
      installers: 0,
      devices: 0,
      rootAuthorityBalance: 'NA',
      rootAuthorityAccountId: '',
      entities: [],
      env: process.env.NEW_RELIC_APP_NAME || '',
    };
    try {
      const users = await this.userModel.find({ client: clientName });
      if (users.length === 0) {
        return defaultValue;
      }

      const entities = await Promise.all(
        users.map(async (user) => {
          const { username, role } = user;
          const currentSession = await this.loginAsUser(
            clientName,
            username,
            role as any,
          );
          const profile = await this.api.profile().getProfile(currentSession);
          const accountId = profile.hederaAccountId as string;
          const did = profile.did as string;
          const isTestnet = did.includes('testnet');
          const balance = await this.getAccountBalance(accountId, isTestnet);
          return {
            username,
            role,
            accountId,
            did,
            balance,
          } as IGuardianEntity;
        }),
      );

      const session = await this.loginAsRootAuthority(clientName);
      const policies = await this.getPublishedPolicies(session);
      const publishedPolicy = policies[0];
      const devices: any = await this.getPolicyBlockData(
        session,
        publishedPolicy?.id || '',
        BLOCK_TAGS.DEVICE_GRID,
      );
      const installers: any = await this.getPolicyBlockData(
        session,
        publishedPolicy?.id || '',
        BLOCK_TAGS.RA_INSTALLER_GRID,
      );
      const ra = entities.find((x) => x.role === 'STANDARD_REGISTRY');

      return {
        status: 'Ready',
        policies: policies.length,
        installers: installers.data.length,
        devices: devices.data.length,
        rootAuthorityBalance: ra?.balance || '',
        rootAuthorityAccountId: ra?.accountId || '',
        entities,
        env: defaultValue.env,
      };
    } catch (error) {
      this.logger.error({ error }, 'Unable to get bootstrap summary');
      return defaultValue;
    }
  }

  private async waitForProfileConfirm(session: Session) {
    let userProfile: User | undefined;

    while (!userProfile || !userProfile.confirmed) {
      this.logger.log('Waiting for user to be initialized', userProfile);

      userProfile = await this.api.profile().getProfile(session);

      if (userProfile && userProfile.confirmed) {
        break;
      }
      if (userProfile && userProfile.failed) {
        throw new Error('Unable to setup user account');
      }
      await waitFor(2000);
    }
    return userProfile;
  }

  async getProject(clientName: string): Promise<any> {
    const session = await this.loginAsRootAuthority(clientName);
    const policies = await this.api.policy().getAll(session);
    const projectApplicablePolicy = policies.find(
      (p) => p.status === 'PUBLISH' && this.isPolicyProjectApplicable(p.name),
    );

    const data: any = await this.getPolicyBlockData(
      session,
      projectApplicablePolicy?.id || '',
      BLOCK_TAGS.PROJECT_GRID,
    );
    return data.data.map((x: any) => x.document.credentialSubject[0]).pop();
  }

  async getSites(clientName: string): Promise<any> {
    const session = await this.loginAsRootAuthority(clientName);
    const policies = (await this.api.policy().getAll(session)).filter(
      (x) => x.status === 'PUBLISH',
    );
    let result: any[] = [];
    for await (const policy of policies) {
      const { data }: any = await this.getPolicyBlockData(
        session,
        policy?.id || '',
        BLOCK_TAGS.SITE_GRID,
      );
      result = [
        ...result,
        ...data.map((x: any) => x.document.credentialSubject[0]),
      ];
    }

    return result;
  }

  async getPolicies(clientName: string): Promise<any> {
    const session = await this.loginAsRootAuthority(clientName);
    return await this.api.policy().getAll(session);
  }

  async publishPolicy(
    policy: PublishPolicyDto,
    clientName: string,
  ): Promise<any> {
    this.updateStatusMessage('Publishing new policy version', true);
    const session = await this.loginAsRootAuthority(clientName);
    const ra = await this.api.profile().getProfile(session);
    const publishedPolicies = await this.getPublishedPolicies(session);

    const tokens = await this.api.token().listTokens(session);
    const existingVersion = publishedPolicies.find(
      (x) => x.name === policy.policyName && x.version === policy.version,
    );
    if (existingVersion) {
      throw new BusinessException(400, 'Duplicated policy version');
    }

    const matchedPolicy = publishedPolicies.find(
      (x) => x.name === policy.policyName && x.version === '1.0.0',
    );

    //TO DO: allow publish new policy version 1.0.0. Now just throw an error
    if (!matchedPolicy) {
      throw new BusinessException(
        400,
        `Policy ${policy.policyName} version 1.0.0 does not exist. Cannot publish this policy`,
      );
    }

    const policies = (
      await this.createPolicies(
        session,
        clientName,
        tokens,
        policy.tokenMintValue,
        policy.version,
        [policy.policyName],
      )
    ).filter((x) => x.status === 'DRAFT');

    // eslint-disable-next-line no-unreachable-loop
    for await (const existingPolicy of policies) {
      const newPolicy = await this.api
        .policy()
        .getById(session, existingPolicy.id || '');
      await this.createSchemas(session, clientName, newPolicy);
      if (newPolicy.status === 'DRAFT') {
        this.logger.log(`Publishing policy %s`, matchedPolicy.name);
        this.updateStatusMessage(`Publishing policy ${matchedPolicy.name}`);

        await this.api
          .policy()
          .publish(session, newPolicy.id || '', policy.version);
      }
      const owner = await this.loginAsOwner(clientName);
      const data = await this.getPolicyBlockData(
        owner,
        matchedPolicy.id || '',
        BLOCK_TAGS.TOKEN_OWNER_DOCUMENT,
      );
      if (data.data) {
        await this.initOwner(
          owner,
          session,
          ra,
          (data.data as any)[0].document.credentialSubject[0] as any,
        );
      }
      if (this.isPolicyProjectApplicable(newPolicy.name)) {
        const projectData = await this.getPolicyBlockData(
          session,
          matchedPolicy.id || '',
          BLOCK_TAGS.SITE_GRID,
        );
        await this.updatePolicyProject(
          (projectData.data as any)[0].document.credentialSubject[0] as any,
          newPolicy,
          session,
        );
      }

      const siteData = await this.getPolicyBlockData(
        session,
        matchedPolicy.id || '',
        BLOCK_TAGS.SITE_GRID,
      );
      await this.bootstrapSiteData(
        (siteData.data as any)[0].document.credentialSubject[0] as any,
        clientName,
      );
      // Installer data
      const listInstallers = this.userModel.find({
        client: clientName,
        role: 'USER',
        username: { $regex: /installer/, $options: 'i' },
      });
      for await (const installer of listInstallers) {
        const installerSession = await this.loginAsUser(
          clientName,
          installer.username,
          'USER',
        );
        this.updateStatusMessage(
          `Bootstrap installer for new policy : ${installer.username}`,
        );
        await this.initInstaller(installerSession, session, ra, installer.data);
        const devices = await this.getInstallerDevices(
          clientName,
          installer.data.installerId,
        );
        for await (const device of devices) {
          // bootstrap device
          await this.bootstrapDeviceWithPolicy(
            installerSession,
            device,
            newPolicy,
            clientName,
          );
        }
      }
    }

    return { clientName, matchedPolicy };
  }
}
