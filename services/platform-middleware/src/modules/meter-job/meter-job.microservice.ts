import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type {
  IFindResult,
  IMutationResult,
  IMeterTask,
  IFindOneResult,
} from '@tymlez/platform-api-interfaces';
import { withTransaction } from '@tymlez/backend-libs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { MeterJobService } from './meter-job.service';
import { MeterJob } from './entities/meter-job.entity';

@Controller()
export class MeterJobMicroservice {
  constructor(
    private readonly meterJobService: MeterJobService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('meter-job.findOne')
  @UseRequestContext()
  async findOne(id: string): Promise<IFindOneResult<MeterJob>> {
    return withTransaction('meter-job.findOne', 'microservice', () =>
      this.meterJobService.findOne(id),
    );
  }

  @MessagePattern('meter-job.findAll')
  @UseRequestContext()
  async findAll({
    options = {},
    filters = {},
  }): Promise<IFindResult<MeterJob>> {
    return withTransaction('meter-job.findAll', 'microservice', () =>
      this.meterJobService.findAll(filters, options),
    );
  }

  @MessagePattern('meter-job.makeTask')
  @UseRequestContext()
  async makeTask(jobId: string): Promise<IMutationResult<IMeterTask | null>> {
    return withTransaction('meter-job.makeTask', 'microservice', () =>
      this.meterJobService.makeTask(jobId),
    );
  }
}
