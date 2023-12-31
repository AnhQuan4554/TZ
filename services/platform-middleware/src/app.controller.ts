import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type { IMiddlewareVersion } from '@tymlez/platform-api-interfaces';

@Controller()
export class AppController {
  @MessagePattern('app.healthCheck')
  async heathCheckMicroservice(): Promise<any> {
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
      NOW: new Date().toString(),
    };
  }
}
