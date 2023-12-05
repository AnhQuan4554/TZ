import { Inject, Logger } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { waitFor } from '@tymlez/common-libs';
import { firstValueFrom } from 'rxjs';

//name, value, description, group, json_value, read_only
const seeders = [
  [
    'TymlezGooAggregationFields',
    'water_pumped,genset_fuel_used',
    '',
    'System',
    null,
    'true',
  ],
  [
    'TymlezCETAggregationFields',
    'water_pumped,genset_fuel_used',
    '',
    'System',
    null,
    'true',
  ],
  [
    'TymlezCRUAggregationFields',
    'water_pumped,genset_fuel_used',
    '',
    'System',
    null,
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
      this.logger.debug('Insert setting seeder error: ', err);
    }
  }
}
