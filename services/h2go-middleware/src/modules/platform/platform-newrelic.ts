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
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript },
        );
        this.logger.log('Creating synthetic monitor...');
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug('Created synthetic monitor: ', monitorStatus);
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor error: ', err);
    }
  }

  private replaceUrl(script: string): string {
    const clientPrefix = (process.env.NEW_RELIC_LABELS || '')
      .split(';')
      .map((x) => x.split(':').pop());

    return script.replace(
      'https://h2go.dev.tymlez.com',
      `https://${clientPrefix[1]}.${clientPrefix[0]}.tymlez.com`,
    );
  }
}
