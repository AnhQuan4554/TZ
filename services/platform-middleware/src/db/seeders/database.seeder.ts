import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import { ClientSeeder } from './client.seeder';
import { LocalSeeder } from './local.seeder';
import { SiteSeeder } from './sites.seeder';
import { UserSeeder } from './users.seeder';
import { SettingsSeeder } from './settings.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    logger.info('Running database seeds');
    // Please keep seeders in the right order.
    for await (const entity of [
      ClientSeeder,
      SiteSeeder,
      UserSeeder,
      SettingsSeeder,
      LocalSeeder,
    ]) {
      await this.call(em.fork(), [entity]);
    }
  }
}
