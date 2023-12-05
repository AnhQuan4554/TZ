import {
  EntityRepository,
  EntityManager,
  Collection,
  UseRequestContext,
  MikroORM,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { auth } from 'firebase-admin';

import type {
  IMutationResult,
  IClient,
  IMicrosoftUser,
  IValidatedUser,
} from '@tymlez/platform-api-interfaces';
import { DEFAULT_ROLES } from '@tymlez/common-libs';
import jwt from 'jsonwebtoken';
import { DecodedIdToken } from 'firebase-admin/auth';
import { User } from './entities/user.entity';
import { Client } from './entities/client.entity';
import { UpdateClientDto } from './dto/updateClientDto';
import { Role } from './entities/role.entity';
import { AuthenticateDto } from './dto/authenticate.dto';

const profileCache: Record<string, any> = {};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: EntityRepository<Client>,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,

    public readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async authenticateCheck(tokenInfo: AuthenticateDto) {
    const userInfo: IMicrosoftUser = (await jwt.decode(
      tokenInfo.idToken,
    )) as any;
    const adminGroups =
      process.env.PLATFORM_ADMIN_AD_GROUP_IDS?.split(',') || [];

    if (tokenInfo.providerId === 'microsoft.com') {
      const hashAdminGroup = userInfo.groups.some((group: string) =>
        adminGroups.includes(group),
      );

      await this.setAzureUserRole(userInfo, hashAdminGroup);
    }

    const userProfile = await this.getUserByEmail(userInfo.email);

    return userProfile;
  }

  async setAzureUserRole(user: IMicrosoftUser, assignAdminRole = false) {
    const defaultAdminRole = assignAdminRole
      ? await this.roleRepository.findOne({
          name: DEFAULT_ROLES.ADMIN,
        })
      : undefined;

    const decodedTokenInfo = await this.getUserByEmail(user.email);

    if (!decodedTokenInfo) {
      const newUser = this.userRepository.create({
        name: user.name,
        email: user.email,
        password: '',
        roles: [defaultAdminRole?.name].filter(Boolean),
        timeout: 3600,
        tags: ['microsoft.com'],
        userRoles: [defaultAdminRole].filter(Boolean),
        client: await this.getClients(),
        emailVerified: true,
      } as any);

      await this.userRepository.persistAndFlush(newUser);
    }

    if (decodedTokenInfo && decodedTokenInfo.permissions?.length === 0) {
      // If SSO user has been login before the permission feature implemented. we need to setup the role agains
      const existingUser = await this.userRepository.findOne({
        email: user.email,
      });
      if (existingUser) {
        existingUser.userRoles = [defaultAdminRole].filter(Boolean) as any;
        await this.userRepository.persistAndFlush(existingUser);
      }
    }
    return await this.getUserByEmail(user.email);
  }

  public async getUserByEmail(
    email: string,
  ): Promise<IValidatedUser | undefined> {
    const userInfo = await this.userRepository.findOne(
      {
        email,
      },
      { populate: ['userRoles'] },
    );

    if (!userInfo) {
      return undefined;
    }

    const roles = (userInfo.userRoles as any as Collection<Role>).getItems();

    return {
      ...userInfo,
      userRoles: undefined, // Hide this internal properties from public API
      client: undefined,
      password: undefined,
      name: userInfo?.name as string,
      roles: roles.map((role) => role.name),
      permissions: roles.flatMap((role) => role.permissions),
      clientName: userInfo.client.name,
      lastLogin: userInfo.lastLogin,
    } as unknown as IValidatedUser;
  }

  @UseRequestContext()
  async getProfile(user: DecodedIdToken): Promise<IValidatedUser | undefined> {
    return this.getProfileInternal(user);
  }

  async getProfileInternal(
    user: DecodedIdToken,
  ): Promise<IValidatedUser | undefined> {
    const email = user.email || '';

    const userProfile = await this.getUserByEmail(email);
    if (user.email_verified && !userProfile?.emailVerified) {
      const userRecord = await this.userRepository.findOne({
        email: user.email,
      });
      if (userRecord) {
        userRecord.emailVerified = true;
        await this.userRepository.persistAndFlush(userRecord);
      }
    }

    if (user.auth_time && userProfile) {
      const authTime = new Date(user.auth_time * 1000);
      userProfile.lastLogin = authTime;
      if (!userProfile?.lastLogin || userProfile?.lastLogin !== authTime) {
        const userRecord = await this.userRepository.findOne({
          email: user.email,
        });
        if (userRecord) {
          userRecord.lastLogin = authTime;
          await this.userRepository.persistAndFlush(userRecord);
        }
      }
    }
    return userProfile;
  }

  async getRoles(user: IValidatedUser): Promise<string[]> {
    const decodedTokenInfo = await this.userRepository.findOne(
      {
        email: user.email,
      },
      { populate: ['userRoles'] },
    );

    const roles = (
      decodedTokenInfo?.userRoles as any as Collection<Role>
    ).getItems();

    return roles.map((role) => role.name);
  }

  public async getClientDetail(clientName: string): Promise<IClient | null> {
    return await this.clientRepository.findOne({ name: clientName });
  }

  async getClients(): Promise<IClient> {
    const clients = await this.clientRepository.findAll();
    if (clients === null) {
      throw new Error('No Client. Please check.');
    }
    if (clients.length > 1) {
      throw new Error('There is more than 1 client. Please check.');
    }
    return clients[0];
  }

  public async updateClient(client: UpdateClientDto): Promise<IMutationResult> {
    const existingClient = await this.getClientDetail(client.name);
    if (existingClient === null) {
      return {
        success: false,
        message: 'Client does not exist. No client to update',
      };
    }

    Object.assign(existingClient, client);

    await this.em.persistAndFlush(existingClient);
    return {
      success: true,
    };
  }

  public async validateToken(token: string): Promise<any> {
    const tenantApp = auth();
    const appTenant = tenantApp
      .tenantManager()
      // eslint-disable-next-line no-process-env
      .authForTenant(process.env.FIREBASE_TENANT_ID || '');
    const decodedTokenInfo = await appTenant
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException();
      });

    if (
      !decodedTokenInfo.email_verified &&
      decodedTokenInfo.firebase.sign_in_provider === 'password'
    ) {
      throw new UnauthorizedException();
    }
    if (profileCache[token]) {
      return profileCache[token];
    }
    const profile = await this.getProfileInternal(decodedTokenInfo);
    profileCache[token] = {
      ...profile,
      emailVerified:
        decodedTokenInfo.firebase.sign_in_provider !== 'password' ||
        decodedTokenInfo.email_verified,
    };

    return profileCache[token];
  }
}
