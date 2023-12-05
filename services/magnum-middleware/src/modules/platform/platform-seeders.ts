import { Inject, Logger } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { waitFor } from '@tymlez/common-libs';
import { firstValueFrom } from 'rxjs';

//name, value, description, group, json_value, read_only
const seeders = [
  [
    'magnum-biochar',
    'biochar',
    '',
    'Magnum',
    '[{"name": "Biomass In","metricName": "dryer-input-biomass"},{"name": "Energy consumption","metricName": "dryer-input-electricity"},{"name": "CO2eq Emissions","metricName": "pyrolyser-outputs-emissions"}]',
    'true',
  ],
  [
    'magnum-ironore',
    'ironore',
    '',
    'Magnum',
    '[{"name": "Iron Ore In","metricName": "evf-input-crushed_ore"},{"name": "Energy consumption","metricName": "crusher-input-electricity"},{"name": "CO2eq Emissions","metricName": "mortarpump-input-electricity"}]',
    'true',
  ],
  [
    'magnum-hismelt',
    'hismelt',
    '',
    'Magnum',
    '[{"name": "Biochar In","metricName": "srv-input-lime"},{"name": "Energy consumption","metricName": "charmill-input-electricity"},{"name": "CO2eq Emissions","metricName": "compressor-outputs-cold_blast"}]',
    'true',
  ],
];

export class PlatformSeeder {
  private readonly logger = new Logger(PlatformSeeder.name);
  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  async seedSettings() {
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

        this.logger.debug('Inserted setting seeder : ', settingStatus);
      }
    } catch (err) {
      this.logger.debug('Insert seeting seeder error: ', err);
    }
  }
}
