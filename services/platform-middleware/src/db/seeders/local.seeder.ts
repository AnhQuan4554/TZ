import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import { GuardianLocalSeeder } from './local/guardian-data.seeder';
import { ClientDataSeeder } from './local/client-data.seeder';
import { LocalUserSeeder } from './local/user-seeder';
import { LocalRoleSeeder } from './local/role-seeder';

export class LocalSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    if (process.env.ENV !== 'local') {
      return;
    }

    const localSeeders = [
      LocalRoleSeeder,
      LocalUserSeeder,
      GuardianLocalSeeder,
      ClientDataSeeder,
    ];

    logger.info('Running all local development seeds..');

    for await (const entity of localSeeders) {
      await this.call(em.fork(), [entity]);
    }
  }
}
