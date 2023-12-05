import assert from 'assert';
import bcrypt from 'bcryptjs';
import { logger } from '@tymlez/backend-libs';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { DEFAULT_ROLES, PERMISSIONS } from '@tymlez/common-libs';
import { User } from '../../modules/auth/entities/user.entity';
import { Role } from '../../modules/auth/entities/role.entity';

const TAGS = ['initial'];
export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.seedRoles(em);
    await this.seekUsers(em);
  }

  async seedRoles(em: EntityManager): Promise<void> {
    logger.info('Seeding roles & permissions setups');

    const initialsRoles = [
      {
        name: DEFAULT_ROLES.ADMIN,
        description: 'System administrator role with full access to everything',
        permissions: [PERMISSIONS.ALL_RESOURCE_WRITE],
      },
      {
        name: DEFAULT_ROLES.CLIENT,
        description:
          'Client users with permission to access everything on dashboard',
        permissions: [
          PERMISSIONS.CLIENT_DASHBOARD_READ,
          PERMISSIONS.TRUSTCHAIN_READ,
        ],
      },

      {
        name: DEFAULT_ROLES.AUDITOR,
        description: 'Auditor users with permission to access audit reports',
        permissions: [PERMISSIONS.AUDIT_REPORT_READ],
      },
    ];
    for await (const role of initialsRoles) {
      const checkExistingRole = await em.findOne(Role, { name: role.name });
      if (!checkExistingRole) {
        await em.persistAndFlush(em.create(Role, role as any));
      }
    }
  }

  async seekUsers(em: EntityManager): Promise<void> {
    logger.info('Running user seeds');
    const { SALT_ROUNDS } = process.env;
    assert(SALT_ROUNDS, `SALT_ROUNDS is missing`);

    const clients = await em.find('Client', {});
    assert(clients.length > 0, 'No Client found, please seed client first');
    const adminRole = await em.findOne(Role, { name: DEFAULT_ROLES.ADMIN });

    const createUserIfNotExists = async (email: string, name: string) => {
      const checkExistingUser = await em.findOne(User, {
        email,
      });
      if (!checkExistingUser) {
        logger.info(`Insert new user: ${email}`);
        const now = new Date();
        await em.persistAndFlush(
          em.create<User>(User, {
            email,
            roles: [],
            userRoles: [adminRole as Role],
            name,
            updatedAt: now,
            createdAt: now,
            tags: TAGS,
            client: clients[0],
            password: await bcrypt.hash('admin1', +SALT_ROUNDS),
            timeout: 1800,
            emailVerified: true,
          }),
        );
      }
    };
    await createUserIfNotExists('admin@tymlez.com', 'Administrator');
    await createUserIfNotExists(
      'development+newrelic@tymlez.com',
      'Newrelic Simulator',
    );
  }
}
