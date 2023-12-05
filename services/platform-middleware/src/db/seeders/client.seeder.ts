import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import { Client } from '../../modules/auth/entities/client.entity';

export class ClientSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    logger.info('Running client seeds...');

    const count = await em.count(Client, {});
    if (count === 0) {
      const now = new Date();
      const defaultClientName = process.env.CLIENT_NAME || 'Default Client';
      logger.info("Inserting client '%s'", defaultClientName);
      await em.persistAndFlush(
        em.create(Client, {
          name: defaultClientName,
          label: defaultClientName,
          tags: ['initial'],
          createdAt: now,
          updatedAt: now,
        }),
      );

      logger.info("Inserted client '%s'", defaultClientName);
    } else {
      // TODO: Implement updated logic
      logger.info('Skip client seeds as it already exists');
    }
  }
}
