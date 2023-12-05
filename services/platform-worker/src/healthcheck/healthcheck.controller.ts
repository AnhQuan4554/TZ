import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';

@Controller('/healthcheck')
export class HealthcheckController {
  constructor(private service: HealthcheckService) {}

  @Get('/')
  async healthCheck(): Promise<any> {
    const { isAlive } = await this.service.isAlive();
    if (!isAlive) {
      throw new HttpException(
        'Service not available',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
