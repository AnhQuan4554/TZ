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

  async createSyntheticMonitorRealtime() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);

      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(
          `data/browser_realtime.txt`,
          'utf8',
        );
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript, scriptName: '-realtime' },
        );
        this.logger.log('Creating synthetic monitor realtime...');
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug(
          'Created synthetic monitor realtime: ',
          monitorStatus,
        );
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor realtime error: ', err);
    }
  }

  async createSyntheticMonitorAnalytics() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);

      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(
          `data/browser_analytics.txt`,
          'utf8',
        );
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript, scriptName: '-analytics' },
        );
        this.logger.log('Creating synthetic monitor analytics...');
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug(
          'Created synthetic monitor analytics: ',
          monitorStatus,
        );
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor analytics error: ', err);
    }
  }

  private replaceUrl(script: string): string {
    const clientPrefix = (process.env.NEW_RELIC_LABELS || '')
      .split(';')
      .map((x) => x.split(':').pop());

    return script.replace(
      'https://solarfarm.dev.tymlez.com',
      `https://${clientPrefix[0]}.${clientPrefix[1]}.tymlez.com`,
    );
  }
}
