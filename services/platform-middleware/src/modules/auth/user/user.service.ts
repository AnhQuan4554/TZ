/* eslint-disable no-param-reassign */
import { Collection, EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { auth } from 'firebase-admin';
import {
  IFindResult,
  IMutationResult,
  IUser,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { AuthService } from '../auth.service';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    private readonly authService: AuthService,
    private readonly em: EntityManager,
  ) {}

  async deleteUser(id: string): Promise<IMutationResult> {
    const user = await this.getUserById(id);

    try {
      await this.userRepository.removeAndFlush(user);
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

  async ensureFirebaseUser(user: User, password: string) {
    const tenantApp = auth()
      .tenantManager()
      // eslint-disable-next-line no-process-env
      .authForTenant(process.env.FIREBASE_TENANT_ID || '');

    const checkUserInFirebase = async (email: string) => {
      return new Promise((resolve) => {
        tenantApp
          .getUserByEmail(email)
          .then((r) => {
            resolve({ isError: false, doesExist: true, user: r });
          })
          .catch((err) => {
            resolve({ isError: true, err });
          });
      });
    };

    const checkExistingUser: any = await checkUserInFirebase(user.email);
    let existingUser = checkExistingUser.user;

    if (existingUser) {
      // skip or update password
      const [providerData = {} as any] = existingUser.providerData;

      if (password && providerData.providerId === 'password') {
        await tenantApp.updateUser(existingUser.uid, {
          password,
          displayName: user.name,
        });
      }
    } else {
      existingUser = await tenantApp.createUser({
        email: user.email,
        password,
        emailVerified: false,
        displayName: user.name,
      });
    }
    // update user claims
    const userRoles = (
      user.userRoles as unknown as Collection<Role>
    ).getItems();

    await tenantApp.setCustomUserClaims(existingUser.uid, {
      roles: user.roles,
      platformUpdateAt: new Date().toISOString(),
      permissions: userRoles.flatMap((role) => role.permissions),
      platformDisplayName: user.name,
      clientName: user.client?.name,
      sessionTimeout: user.timeout || 60,
    });
    return existingUser;
  }

  async updateUser(
    id: string,
    updatedUser: UpdateUserDto,
  ): Promise<IMutationResult> {
    const { email, password } = updatedUser;

    const user = await this.userRepository.findOne({ id });

    if (!user) {
      return {
        success: false,
        message: `User does not exist!`,
      };
    }

    const sameEmailUser = (await this.userRepository.findOne({
      email,
    })) as User;
    if (sameEmailUser && sameEmailUser.id !== user.id) {
      return {
        success: false,
        message: `Another user has already used this email. Please change it!`,
      };
    }
    const oldPassword = sameEmailUser.password;

    Object.assign(user, updatedUser);
    user.userRoles = await this.roleRepository.find({
      name: { $in: updatedUser.roles },
    });

    // This is ugly but not find any good solution unless we add the entity
    // Remove all current roles assignment for the editing user
    await this.em
      .getConnection()
      .execute('delete from role_users where user_id = ?', [user.id]);

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS || '13', 10),
      );
      user.password = hashedPassword;
    } else {
      user.password = oldPassword;
    }

    try {
      await this.userRepository.persistAndFlush(user);
      await this.ensureFirebaseUser(user, password);
    } catch (err: any) {
      return {
        success: false,
        message: `User insertion failed ${err.message}`,
      };
    }
    return { success: true };
  }

  async createUser(user: CreateUserDto): Promise<IMutationResult> {
    const { password, email, roles, name, timeout } = user;
    const exists = await this.userRepository.count({ $or: [{ email }] });
    if (exists > 0) {
      return {
        success: false,
        message: 'Another user has already used this email. Please change it!',
      };
    }

    // TODO: Validate password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS || '13', 10),
      );
    } catch (err: any) {
      return {
        success: false,
        message: `User insertion failed ${err.message}`,
      };
    }

    const client = await this.authService.getClients();
    const userRoles = await this.roleRepository.find({ name: { $in: roles } });

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      roles,
      userRoles,
      client,
      timeout,
      tags: ['initial'],
      emailVerified: false,
    } as any);

    try {
      await this.userRepository.persistAndFlush(newUser);
      await this.ensureFirebaseUser(newUser, password);
    } catch (err: any) {
      return {
        success: false,
        message: `User insertion failed! ${err.message}`,
      };
    }
    return {
      success: true,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      {
        message: 'User does not exists',
        errors: 'Invalid user id',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async getUsers(pageSize: number, page: number): Promise<IFindResult<IUser>> {
    try {
      const [users, count] = await this.userRepository.findAndCount(
        {},
        {
          orderBy: { name: 'ASC' },
          limit: pageSize,
          offset: page * pageSize,
          populate: true,
        },
      );
      return { count, data: users };
    } catch (err: any) {
      logger.error(err, 'Get all users failed!');
      return { count: 0, data: [] };
    }
  }

  public async export(): Promise<IUser[]> {
    try {
      return await this.userRepository.find(
        {},
        {
          orderBy: { name: 'ASC' },
        },
      );
    } catch (err: any) {
      logger.error(err, 'Export users failed!');
      return [];
    }
  }

  public async import(user: IUser, isNew: boolean): Promise<IMutationResult> {
    user.password = await bcrypt.hash(
      '123456',
      parseInt(process.env.SALT_ROUNDS || '13', 10),
    );
    /* if client is not the same as in database, update client */
    const client = await this.authService.getClients();
    if (client !== user.client) {
      user.client = client;
    }
    try {
      if (isNew) {
        const newUser = this.userRepository.create({ ...user } as any);
        await this.userRepository.persistAndFlush(newUser);
      } else {
        const existingUser = (await this.getUserByEmail(user.email)) as User;
        user.id = existingUser.id;
        Object.assign(existingUser, user);
        await this.userRepository.persistAndFlush(existingUser);
      }
    } catch (err: any) {
      logger.error(err, 'Import user failed!');
      return {
        success: false,
        message: `Import user ${user.email} failed!`,
      };
    }
    return { success: true };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (err: any) {
      logger.error(err, 'Get user by email failed!');
      return null;
    }
  }
}
