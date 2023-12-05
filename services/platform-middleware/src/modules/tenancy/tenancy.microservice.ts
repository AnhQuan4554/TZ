import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import type {
  IFindOneResult,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { ITenancy } from '@tymlez/platform-api-interfaces';
import { TenancyService } from './tenancy.service';

@Controller()
export class TenancyMicroservice {
  constructor(
    private readonly tenancyService: TenancyService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('tenancy.findOneByMeter')
  @UseRequestContext()
  async findByTags(meter: string): Promise<IFindOneResult<ITenancy>> {
    return withTransaction('tenancy.findOneByMeter', 'microservice', () =>
      this.tenancyService.findOneByMeter(meter),
    );
  }

  @MessagePattern('tenancy.getAllTenancies')
  @UseRequestContext()
  async getAllTenancies(): Promise<IFindResult<ITenancy>> {
    return withTransaction('tenancy.getAllTenancies', 'microservice', () =>
      this.tenancyService.getAllTenancies(),
    );
  }
}
