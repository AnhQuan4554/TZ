import { Controller, Get, UseGuards } from '@nestjs/common';
import type { IMiddlewareVersion } from '@tymlez/platform-api-interfaces';
import { FirebaseAuthGuard } from '@tymlez/backend-libs';
import { PlatformService } from './modules/platform/platform.service';

@Controller()
export class AppController {
  constructor(private platformService: PlatformService) {}

  @Get('secured')
  @UseGuards(FirebaseAuthGuard)
  secured(): string {
    return 'Ok';
  }

  @Get('healthcheck')
  healthCheck(): string {
    return 'Ok';
  }

  @Get('version')
  getVersion(): IMiddlewareVersion {
    return {
      gitSha: process.env.GIT_SHA,
      gitTag: process.env.GIT_TAG,
    };
  }

  @Get('meta-info')
  getMetaInfo(): Object {
    return {
      gitSha: process.env.GIT_SHA,
      gitTag: process.env.GIT_TAG,
      ENV: process.env.ENV,
      NODE_ENV: process.env.NODE_ENV,
      TZ: process.env.TZ,
      PLATFORM_API_HOST: process.env.PLATFORM_API_HOST,
      NOW: new Date().toString(),
    };
  }

  @Get('microservice-setting')
  async getMicroserviceSetting(): Promise<string[]> {
    const [consumptionMeterKey, generationMeterKey] =
      await this.platformService.getSettingByNames([
        'cohort-consumption',
        'cohort-generation',
      ]);
    return [consumptionMeterKey, generationMeterKey];
  }
}
