import { Inject, Logger } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { waitFor } from '@tymlez/common-libs';
import { firstValueFrom } from 'rxjs';

//name, value, description, group, json_value, read_only
const seeders = [
  ['cohort-consumption', 'DD54108399431', '', 'CLIENT', '', 'true'],
  ['cohort-generation', '6587-6532-5132-b217', '', 'CLIENT', '', 'true'],
];

export class PlatformSeeder {
  private readonly logger = new Logger(PlatformSeeder.name);
  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  async postSettingSeeders() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);
      if (healthCheck === 'Ok') {
        const settingRes = this.platformClient.send<any>(
          'settings.seedSettings',
          {
            seeders,
          },
        );

        const settingStatus = await firstValueFrom(settingRes);

        this.logger.debug('add seeting seeder status', settingStatus);
      }
    } catch (err) {
      this.logger.debug('add seeting seeder status: ', err);
    }
  }
}
