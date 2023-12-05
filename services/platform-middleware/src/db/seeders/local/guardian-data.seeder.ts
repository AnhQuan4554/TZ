import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { logger, storeFileToS3 } from '@tymlez/backend-libs';
import fs from 'fs';
import path from 'path';
import { User } from '../../../modules/auth/entities/user.entity';
import { Device } from '../../../modules/guardian/entities/device.entity';
import { Installer } from '../../../modules/guardian/entities/installer.entity';
import { GuardianSite } from '../../../modules/guardian/entities/site.entity';
import { Setting } from '../../../modules/settings/entities/setting.entity';

export class GuardianLocalSeeder extends Seeder {
  private async seedSetting(em: EntityManager) {
    for await (const key of ['RootAuthority', 'Project', 'TokenOwner']) {
      const existing = await em.findOne(Setting, { name: key });
      if (existing) {
        logger.info(`Skips setting key: ${key}`);
      } else {
        const json = fs.readFileSync(
          path.resolve(`src/db/seeders/local/guardian-data/${key}.json`),
          'utf8',
        );
        await em.persistAndFlush(
          em.create(Setting, {
            name: key,
            value: 'na',
            jsonValue: json,
            description: 'local bootstrap data',
            type: 'string',
            group: key,
            readOnly: true,
          }),
        );
      }
    }
  }

  private async seedGuardianSites(em: EntityManager) {
    const sites = [
      [
        'cad2d745-e4c2-4930-8daf-3657bbedd833',
        'Tymlez development',
        '-37.6771889',
        '145.1273193',
      ],
    ];
    const outputs: GuardianSite[] = [];
    for await (const [id, name, lat, lng] of sites) {
      const existing = await em.findOne(GuardianSite, { id });

      if (!existing) {
        const site = em.create(GuardianSite, {
          id,
          name,
          lat: +lat,
          lng: +lng,
          createdAt: new Date(),
          updatedAt: new Date(),
          isPublished: false,
          tags: [],
        });
        outputs.push(site);
        logger.info(`Create site: ${name}`);
        await em.persistAndFlush(site);
      }
    }
    return outputs;
  }

  private async seedGuardianInstaller(em: EntityManager) {
    const installers = JSON.parse(
      fs.readFileSync(
        path.resolve(`src/db/seeders/local/guardian-data/Installers.json`),
        'utf8',
      ),
    );
    for await (const installer of installers) {
      const existing = await em.findOne(Installer, {
        installerId: installer.installerId,
      });
      if (!existing) {
        logger.info(`Create Installer: ${installer.installerId}`);
        const certification = await storeFileToS3(
          process.env.ASSET_BUCKET_NAME || 'local',
          `installer/${installer.installerId}/${installer.installerId}.pdf`,
          fs.readFileSync(
            path.resolve(
              `src/db/seeders/local/guardian-data/certification.pdf`,
            ),
          ),
        );

        await em.persistAndFlush(
          em.create(Installer, {
            ...installer,
            certification,
          }),
        );
      }
    }
  }

  private async seedGuardianDevices(em: EntityManager) {
    const devices = JSON.parse(
      fs.readFileSync(
        path.resolve(`src/db/seeders/local/guardian-data/Devices.json`),
        'utf8',
      ),
    );
    for await (const device of devices) {
      const existing = await em.findOne(Device, {
        deviceId: device.deviceId,
      });
      if (!existing) {
        logger.info(`Create Device: ${device.deviceId}`);
        const installer = await em.findOne(Installer, { id: device.installer });
        const site = await em.findOne(GuardianSite, { id: device.site });
        const [admin] = await em.find(User, {});

        const certification = await storeFileToS3(
          process.env.ASSET_BUCKET_NAME || 'local',
          `device/${device.deviceId}/${device.deviceId}.pdf`,
          fs.readFileSync(
            path.resolve(
              `src/db/seeders/local/guardian-data/certification.pdf`,
            ),
          ),
        );

        await em.persistAndFlush(
          em.create(Device, {
            ...device,
            installer,
            site,
            createdBy: admin,
            certification,
          }),
        );
      }
    }
  }

  async run(em: EntityManager): Promise<void> {
    logger.info('Running Guardian data seeder');
    await this.seedSetting(em);
    await this.seedGuardianSites(em);
    await this.seedGuardianInstaller(em);
    await this.seedGuardianDevices(em);
  }
}
