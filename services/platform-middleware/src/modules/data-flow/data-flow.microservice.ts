import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type {
  IFindResult,
  IFindOneResult,
} from '@tymlez/platform-api-interfaces';
import { withTransaction } from '@tymlez/backend-libs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { DataFlowService } from './data-flow.service';
import { DataFlow } from './entities/data-flow.entity';

@Controller()
export class DataFlowMicroservice {
  constructor(
    private readonly dataFlowService: DataFlowService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('data-flow.findOne')
  @UseRequestContext()
  async findOne(id: string): Promise<IFindOneResult<DataFlow>> {
    return withTransaction('data-flow.findOne', 'microservice', () =>
      this.dataFlowService.findOne(id),
    );
  }

  @MessagePattern('data-flow.findAll')
  @UseRequestContext()
  async findAll({
    options = {},
    filters = {},
  }): Promise<IFindResult<DataFlow>> {
    return withTransaction('data-flow.findAll', 'microservice', () =>
      this.dataFlowService.findAll(filters, options),
    );
  }
}
