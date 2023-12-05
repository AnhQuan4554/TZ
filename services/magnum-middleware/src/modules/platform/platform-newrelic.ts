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

  async createSyntheticMonitorHome() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);
      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(
          `data/browser_home.txt`,
          'utf8',
        );
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript, scriptName: '-home' },
        );
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug('Created synthetic monitor home: ', monitorStatus);
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor home error: ', err);
    }
  }

  async createSyntheticMonitorBioChar() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);
      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(
          `data/browser_biochar.txt`,
          'utf8',
        );
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript, scriptName: '-biochar' },
        );
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug('Created synthetic monitor biochar: ', monitorStatus);
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor biochar error: ', err);
    }
  }

  async createSyntheticMonitorIronOre() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);
      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(
          `data/browser_ironore.txt`,
          'utf8',
        );
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript, scriptName: '-ironore' },
        );
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug('Created synthetic monitor ironore: ', monitorStatus);
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor ironore error: ', err);
    }
  }

  async createSyntheticMonitorPigIron() {
    try {
      await waitFor(5000);
      const res = this.platformClient.send<any>('app.healthCheck', '');

      const healthCheck = await firstValueFrom(res);
      if (healthCheck === 'Ok') {
        const script = await fs.promises.readFile(
          `data/browser_pigiron.txt`,
          'utf8',
        );
        const replacedUrlScript = this.replaceUrl(script);

        const monitorRes = await this.platformClient.send<any>(
          'newrelic.createSyntheticMonitor',
          { script: replacedUrlScript, scriptName: '-pigiron' },
        );
        const monitorStatus = await firstValueFrom(monitorRes);

        this.logger.debug('Created synthetic monitor pigiron: ', monitorStatus);
      }
    } catch (err) {
      this.logger.debug('Create synthetic monitor pigiron error: ', err);
    }
  }

  private replaceUrl(script: string): string {
    const clientPrefix = (process.env.NEW_RELIC_LABELS || '')
      .split(';')
      .map((x) => x.split(':').pop());

    return script.replace(
      'https://magnum.dev.tymlez.com',
      `https://${clientPrefix[0]}.${clientPrefix[1]}.tymlez.com`,
    );
  }
}
