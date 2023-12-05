import assert from 'assert';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import type { Site } from '../../modules/dashboard-site/entities/site.entity';

const TAGS = ['initial'];
export class SiteSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    logger.info('Running site seeds');
    const now = new Date();
    const siteCount = await em.count('Site', {});

    if (siteCount === 0) {
      const clients = await em.find('Client', {});
      assert(clients.length > 0, 'No client found. Please seed client first.');

      logger.info('Inserting default site...');

      await em.persistAndFlush(
        em.create<Site>('Site', {
          name: 'Default Site',
          createdAt: now,
          updatedAt: now,
          tags: TAGS,
          label: 'Main',
          timezone: 'UTC',
          client: clients[0],
          address: '',
          lat: 0,
          lng: 0,
          metaData: {},
        }),
      );
    } else {
      logger.info('Skip site seeds as site already exists');
    }
  }
}
