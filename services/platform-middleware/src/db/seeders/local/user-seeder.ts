import bcrypt from 'bcryptjs';
import assert from 'assert';
import type { EntityManager } from '@mikro-orm/core';
import { logger } from '@tymlez/backend-libs';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../../modules/auth/entities/user.entity';
import { Role } from '../../../modules/auth/entities/role.entity';
import { Client } from '../../../modules/auth/entities/client.entity';

export class LocalUserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    logger.info('Running local client user seeder');
    const { SALT_ROUNDS } = process.env;
    assert(SALT_ROUNDS, `SALT_ROUNDS is missing`);
    const [client] = await em.find(Client, {});
    const data: Array<Array<any>> = [
      //email, roles, name, updatedAt, createdAt, tags, client, password, timeout, lastLogin,
      ['development+client@tymlez.com', ['client'], 'client'],
      ['development+admin@tymlez.com', ['admin'], 'admin'],
      //user role
      ['development+user@tymlez.com', ['user'], 'user'],
      ['development+user-readonly@tymlez.com', ['user-read'], 'user-read'],
      ['development+user-write@tymlez.com', ['user-write'], 'user-write'],
      //config role
      ['development+config@tymlez.com', ['config'], 'config'],
      ['development+config-read@tymlez.com', ['config-read'], 'config-read'],
      ['development+config-write@tymlez.com', ['config-write'], 'config-write'],
      //data role
      ['development+data@tymlez.com', ['data'], 'data'],
      ['development+data-read@tymlez.com', ['data-read'], 'data-read'],
      ['development+data-write@tymlez.com', ['data-write'], 'data-write'],
      //guardian role
      ['development+guardian@tymlez.com', ['guardian'], 'guardian'],
      [
        'development+guardian-read@tymlez.com',
        ['guardian-read'],
        'guardian-read',
      ],
      [
        'development+guardian-write@tymlez.com',
        ['guardian-write'],
        'guardian-write',
      ],
      //trustchain role
      ['development+trustchain@tymlez.com', ['trustchain'], 'trustchain'],
      //dashboard role
      ['development+dashboard@tymlez.com', ['dashboard'], 'dashboard'],
      //audit role
      ['development+audit@tymlez.com', ['audit'], 'audit'],
    ];
    const defaultPassword = await bcrypt.hash('default', +SALT_ROUNDS); // not being use any more
    for await (const [email, roles, name] of data) {
      const existingUser = await em.findOne(User, {
        email: email.toString(),
      });
      if (!existingUser) {
        logger.info("Inserting user '%s'", name);
        const userRoles = await em.find(Role, {
          name: { $in: roles },
        });
        await em.persistAndFlush(
          em.create(User, {
            email,
            roles,
            name,
            userRoles,
            updatedAt: new Date(),
            createdAt: new Date(),
            tags: ['initial'],
            client,
            password: defaultPassword,
            timeout: 3600,
            lastLogin: undefined,
            emailVerified: false,
          }),
        );

        logger.info("Inserted user '%s'", name);
      } else {
        logger.info(`Skip user seeds as a user ${name} already exists`);
      }
    }
  }
}
