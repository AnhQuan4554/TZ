import { Inject, Logger } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { waitFor } from '@tymlez/common-libs';
import { firstValueFrom } from 'rxjs';

//name, value, description, group, json_value, read_only
const seeders = [
  [
    'TymlezGooAggregationFields',
    'water_treatment.input.water,water_treatment.input.electricity,electrolyser.input.electricity,electrolyser.input.solar,gas_purification.input.electricity,gas_purification.input.solar,compression.input.electricity,compression.input.solar',
    '',
    'System',
    null,
    'true',
  ],
  [
    'TymlezCETAggregationFields',
    'water_treatment.input.water,water_treatment.input.electricity,electrolyser.input.electricity,electrolyser.input.solar,gas_purification.input.electricity,gas_purification.input.solar,compression.input.electricity,compression.input.solar',
    '',
    'System',
    null,
    'true',
  ],

  [
    'TymlezCRUAggregationFields',
    'water_treatment.input.water,water_treatment.input.electricity,electrolyser.input.electricity,electrolyser.input.solar,gas_purification.input.electricity,gas_purification.input.solar,compression.input.electricity,compression.input.solar',
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
