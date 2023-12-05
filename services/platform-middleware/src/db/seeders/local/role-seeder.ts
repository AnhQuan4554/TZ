import assert from 'assert';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { Role } from '../../../modules/auth/entities/role.entity';

export class LocalRoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    logger.info('Running local role seeder');
    const { SALT_ROUNDS } = process.env;
    assert(SALT_ROUNDS, `SALT_ROUNDS is missing`);
    const initialsRoles = [
      //user role - user management and role management
      {
        name: 'user',
        description: 'User role with full access to user management',
        permissions: [PERMISSION_SET.USER_MANAGEMENT],
      },
      {
        name: 'user-read',
        description: 'User role with read-only access to user management',
        permissions: [PERMISSION_SET.USER_READ_MANAGEMENT],
      },
      {
        name: 'user-write',
        description: 'User role with write access to user management',
        permissions: [PERMISSION_SET.USER_WRITE_MANAGEMENT],
      },

      //config role - client, sites, meters, tenancy, meterJob, meterTask, settings, Import & export
      {
        name: 'config',
        description: 'Config role with full access to config management',
        permissions: [PERMISSION_SET.CONFIG_MANAGEMENT],
      },
      {
        name: 'config-read',
        description: 'Config role with read-only access to config management',
        permissions: [PERMISSION_SET.CONFIG_READ_MANAGEMENT],
      },
      {
        name: 'config-write',
        description: 'Config role with write access to config management',
        permissions: [PERMISSION_SET.CONFIG_WRITE_MANAGEMENT],
      },

      //guardian role
      {
        name: 'guardian',
        description: 'Client role with full access to guardian',
        permissions: [PERMISSION_SET.GUARDIAN_READ_MANAGEMENT],
      },
      {
        name: 'guardian-read',
        description: 'Client role with read-only access to guardian',
        permissions: [PERMISSION_SET.GUARDIAN_READ_MANAGEMENT],
      },
      {
        name: 'guardian-write',
        description: 'Client role with write-only access to guardian',
        permissions: [PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT],
      },

      //data role : mrv, meterData, dataFlow, dataTask
      {
        name: 'data',
        description: 'Data role with full access to data',
        permissions: [PERMISSION_SET.DATA_MANAGEMENT],
      },
      {
        name: 'data-read',
        description: 'Data role with read-only access to data',
        permissions: [PERMISSION_SET.DATA_READ_MANAGEMENT],
      },
      {
        name: 'data-write',
        description: 'Data role with write-only access to data',
        permissions: [PERMISSION_SET.DATA_WRITE_MANAGEMENT],
      },

      //trustchain
      {
        name: 'trustchain',
        description: 'Client role with read-only access to trustchain',
        permissions: [PERMISSION_SET.CLIENT_TRUSTCHAIN_ACCESS],
      },

      //dashboard
      {
        name: 'dashboard',
        description: 'Client role with read-only access to dashboard',
        permissions: [PERMISSION_SET.CLIENT_DASHBOARD_ACCESS],
      },

      //audit : report
      {
        name: 'audit',
        description: 'Audit role with read-only access to report',
        permissions: [PERMISSION_SET.AUDIT_ACCESS],
      },
    ];
    for await (const role of initialsRoles) {
      const checkExistingRole = await em.findOne(Role, { name: role.name });
      if (!checkExistingRole) {
        await em.persistAndFlush(em.create(Role, role as any));
        logger.info("Inserted role '%s'", role.name);
      } else {
        logger.info(`Skip role seeds as ${role.name} already exists`);
      }
    }
  }
}
