/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  // HttpHealthIndicator,
  HealthCheck,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    // private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): any {
    const natServer = process.env.MQ_ADDRESS || 'nats://localhost:4222';
    return this.health.check([
      // () => this.http.pingCheck('network', 'https://docs.nestjs.com'),
      async () =>
        this.microservice.pingCheck('nats', {
          transport: Transport.NATS,
          options: {
            servers: [natServer],
          },
        }),
    ]);
  }
}
