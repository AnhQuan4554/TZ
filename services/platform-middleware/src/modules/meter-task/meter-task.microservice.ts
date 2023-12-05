import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type {
  IFindResult,
  IFindOneResult,
  IMutationResult,
  IMeterTask,
  IMeterTaskStateEvent,
} from '@tymlez/platform-api-interfaces';
import { withTransaction } from '@tymlez/backend-libs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { MeterTaskService } from './meter-task.service';
import { MeterTask } from './entities/meter-task.entity';

@Controller()
export class MeterTaskMicroservice {
  constructor(
    private readonly meterTaskService: MeterTaskService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('meter-task.findAll')
  @UseRequestContext()
  async findAll({
    options = {},
    filters = {},
  }): Promise<IFindResult<MeterTask>> {
    return withTransaction('meter-task.findAll', 'microservice', () =>
      this.meterTaskService.findAll(filters, options),
    );
  }

  @MessagePattern('meter-task.findOne')
  @UseRequestContext()
  async findOne(id: number): Promise<IFindOneResult<IMeterTask>> {
    return withTransaction('meter-task.findOne', 'microservice', () =>
      this.meterTaskService.findOne(id),
    );
  }

  @MessagePattern('meter-task.updateState')
  @UseRequestContext()
  async updateState({
    taskId,
    stateEvent,
    error,
  }: {
    taskId: number;
    stateEvent: IMeterTaskStateEvent;
    error?: string;
  }): Promise<IMutationResult> {
    return withTransaction('meter-task.updateState', 'microservice', () =>
      this.meterTaskService.updateState(taskId, stateEvent, error),
    );
  }
}
