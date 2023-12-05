import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import type { IFindOneResult, IMeter } from '@tymlez/platform-api-interfaces';
import { MeterService } from './meter.service';

@Controller()
export class MeterMicroservice {
  constructor(
    private readonly meterService: MeterService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('meter.findOneByKey')
  @UseRequestContext()
  async findByTags(key: string): Promise<IFindOneResult<IMeter>> {
    return withTransaction('meter.findOneByKey', 'microservice', () =>
      this.meterService.findOneByKey(key),
    );
  }
}
