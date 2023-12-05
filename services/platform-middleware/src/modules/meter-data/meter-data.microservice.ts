import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import type {
  IMutationResult,
  IMeterData,
  IMeterDataQuery,
  IMeterDataResult,
} from '@tymlez/platform-api-interfaces';
import { MeterDataService } from './meter-data.service';

@Controller()
export class MeterDataMicroservice {
  constructor(
    private readonly meterDataService: MeterDataService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('meter-data.ingest')
  @UseRequestContext()
  async ingest(data: IMeterData[]): Promise<IMutationResult> {
    return withTransaction('meter-data.ingest', 'microservice', () =>
      this.meterDataService.ingest(data),
    );
  }

  @MessagePattern('meter-data.query')
  @UseRequestContext()
  async query(query: IMeterDataQuery): Promise<IMeterDataResult[]> {
    return withTransaction('meter-data.query', 'microservice', () =>
      this.meterDataService.query(query),
    );
  }
}
