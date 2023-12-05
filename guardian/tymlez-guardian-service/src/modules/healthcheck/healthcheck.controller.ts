/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { CustomHealthcheckService } from './healthcheck.services';

@Controller('healthcheck')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private guardianHealthcheck: CustomHealthcheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): any {
    return this.health.check([
      () => this.http.pingCheck('network', 'https://www.google.com/'),
      async () => {
        const status = await this.guardianHealthcheck.healthcheck();
        return {
          guardian: {
            status: status.status.toLocaleLowerCase() as any,
            components: status.components,
          },
        };
      },
    ]);
  }
}
