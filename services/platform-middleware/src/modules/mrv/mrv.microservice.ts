import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type {
  IMutationResult,
  IMrvProcessRequest,
} from '@tymlez/platform-api-interfaces';
import { withTransaction } from '@tymlez/backend-libs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { MrvService } from './mrv.service';

@Controller()
export class MrvMicroservice {
  constructor(
    private readonly service: MrvService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('mrv.prepare')
  @UseRequestContext()
  async prepareMRV(request: IMrvProcessRequest): Promise<IMutationResult<any>> {
    return withTransaction('mrv.prepare', 'microservice', () =>
      this.service.prepareMrvAt(request),
    );
  }

  @MessagePattern('mrv.validate')
  @UseRequestContext()
  async validateMrv(
    request: IMrvProcessRequest,
  ): Promise<IMutationResult<any>> {
    return withTransaction('mrv.validate', 'microservice', () =>
      this.service.validateMrv(request),
    );
  }

  @MessagePattern('mrv.submission')
  @UseRequestContext()
  async sentMrv(request: IMrvProcessRequest): Promise<IMutationResult<any>> {
    return withTransaction('mrv.submission', 'microservice', () =>
      this.service.submitMrv(request),
    );
  }

  @MessagePattern('mrv.submit-historical-data')
  @UseRequestContext()
  async submitApprovedHistoricalData(): Promise<IMutationResult<any>> {
    return withTransaction('mrv.submit-historical-data', 'microservice', () =>
      this.service.submitApprovedHistoricalData(),
    );
  }
}
