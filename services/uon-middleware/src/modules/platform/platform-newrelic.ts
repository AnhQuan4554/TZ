import { Inject, Logger } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { waitFor } from '@tymlez/common-libs';
import { firstValueFrom } from 'rxjs';
import fs from 'fs';

export class PlatformNewRelic {
  private readonly logger = new Logger(PlatformNewRelic.name);
  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  async createSyntheticMonitor() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);
      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(`data/browser.txt`, 'utf8');
        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script },
        );
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug('Created synthetic monitor : ', monitorStatus);
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor error: ', err);
    }
  }
}
