import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type {
  IFindResult,
  IFindOneResult,
} from '@tymlez/platform-api-interfaces';
import { withTransaction } from '@tymlez/backend-libs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { DataTaskService } from './data-task.service';
import { DataTask } from './entities/data-task.entity';

@Controller()
export class DataTaskMicroservice {
  constructor(
    private readonly dataFlowService: DataTaskService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('data-task.findOne')
  @UseRequestContext()
  async findOne(id: string): Promise<IFindOneResult<DataTask>> {
    return withTransaction('data-task.findOne', 'microservice', () =>
      this.dataFlowService.findOne(id),
    );
  }

  @MessagePattern('data-task.findAll')
  @UseRequestContext()
  async findAll({
    options = {},
    filters = {},
  }): Promise<IFindResult<DataTask>> {
    return withTransaction('data-task.findAll', 'microservice', () =>
      this.dataFlowService.findAll(filters, options),
    );
  }
}
