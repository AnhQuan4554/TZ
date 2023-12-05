import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger } from '@tymlez/backend-libs';
import fs from 'fs';
import path from 'path';
import { Setting } from '../../../modules/settings/entities/setting.entity';
import { Meter } from '../../../modules/meter/entities/meter.entity';
import { MeterJob } from '../../../modules/meter-job/entities/meter-job.entity';
import { Tenancy } from '../../../modules/tenancy/entities/tenancy.entity';
import { Device } from '../../../modules/guardian/entities/device.entity';
import { Site } from '../../../modules/dashboard-site/entities/site.entity';
import { Client } from '../../../modules/auth/entities/client.entity';

export class ClientDataSeeder extends Seeder {
  private getSeederData(forEntity: string) {
    const dataFile = `src/db/seeders/local/client-data/${process.env.CLIENT_NAME}-${forEntity}.json`;
    logger.info(`Reading local data: ${dataFile}`);
    const dataFilePath = path.resolve(dataFile);
    if (fs.existsSync(dataFilePath)) {
      return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    }

    logger.info(`File not found: ${dataFile}`);
    return [];
  }

  private async seedSettings(em: EntityManager) {
    const settings = this.getSeederData('settings');

    for await (const setting of settings) {
      const existing = await em.findOne(Setting, {
        name: setting.name,
      });

      if (!existing) {
        logger.info(`Create Setting: ${setting.name}`);

        await em.persistAndFlush(em.create(Setting, setting));
      }
    }
  }

  private async seedMeters(em: EntityManager) {
    const meters = this.getSeederData('meters');
    const sites = await em.find(Site, {});
    const site = sites[0];

    const clients = await em.find(Client, {});
    const client = clients[0];

    for await (const meter of meters) {
      const device = await em.findOne(Device, { deviceName: meter.deviceName });

      const existing = await em.findOne(Meter, {
        name: meter.name,
      });

      meter.device = device;
      meter.site = site;
      meter.client = client;

      if (!existing && client && site) {
        logger.info(`Create Meter: ${meter.key}`);

        await em.persistAndFlush(em.create(Meter, meter));
      }
    }
  }

  private async seedTenancies(em: EntityManager) {
    const tenancies = this.getSeederData('tenancies');

    for await (const tenancy of tenancies) {
      const meter = await em.findOne(Meter, {
        key: tenancy.meterKey,
      });
      const existing = await em.findOne(Tenancy, {
        name: tenancy.name,
      });

      tenancy.meter = meter;

      if (!existing && meter) {
        logger.info(`Create Tenancy: ${tenancy.name}`);

        await em.persistAndFlush(em.create(Tenancy, tenancy));
      }
    }
  }

  private async seedMeterJobs(em: EntityManager) {
    const startISODateTime = new Date(
      new Date().getTime() -
        +(process.env.BACK_FILL_DATA || 0) * 24 * 3600 * 1000,
    ).toISOString();
    const endIsoDateTime = '2035-07-07T04:45:26.996Z';

    const jobs = this.getSeederData('meter-jobs');

    for await (const job of jobs) {
      const meter = await em.findOne(Meter, {
        key: job.meterKey,
      });
      const existing = await em.findOne(MeterJob, {
        name: job.name,
      });

      job.meter = meter;
      job.startISODateTime = startISODateTime;
      job.endISODateTime = endIsoDateTime;
      job.isPaused = true;

      if (!existing && meter) {
        logger.info(`Create Job: ${job.name}`);

        await em.persistAndFlush(em.create(MeterJob, job));
      }
    }
  }

  async run(em: EntityManager): Promise<void> {
    logger.info(
      `Running client data seeders for client: ${process.env.CLIENT_NAME}`,
    );

    await this.seedSettings(em);
    await this.seedMeters(em);
    await this.seedTenancies(em);
    await this.seedMeterJobs(em);
  }
}
