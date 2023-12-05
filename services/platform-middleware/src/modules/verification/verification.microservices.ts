import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import {
  IVpRecord,
  IVerification,
  IVerificationDetailQuery,
  IVerificationQuery,
} from '@tymlez/platform-api-interfaces';
import { VerificationService } from './verification.service';

@Controller()
export class VerificationMicroservice {
  constructor(
    private readonly verificationService: VerificationService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('verification.getVerification')
  @UseRequestContext()
  async getVerification(
    query: IVerificationQuery,
  ): Promise<IVerification | null> {
    return withTransaction('verification.getVerification', 'microservice', () =>
      this.verificationService.getVerification(query),
    );
  }

  @MessagePattern('verification.getVpRecord')
  @UseRequestContext()
  async getVpRecord(query: IVerificationDetailQuery): Promise<IVpRecord> {
    return withTransaction('verification.getVpRecord', 'microservice', () =>
      this.verificationService.getVpRecord(query),
    );
  }

  @MessagePattern('verification.getDatabaseVerification')
  @UseRequestContext()
  async getDatabaseVerification(
    query: IVerificationQuery,
  ): Promise<IVerification | null> {
    return withTransaction(
      'verification.getDatabaseVerification',
      'microservice',
      () => this.verificationService.getDatabaseVerification(query),
    );
  }

  @MessagePattern('verification.getDatabaseVpRecord')
  @UseRequestContext()
  async getDatabaseVpRecord(
    query: IVerificationDetailQuery,
  ): Promise<IVpRecord> {
    return withTransaction(
      'verification.getDatabaseVpRecord',
      'microservice',
      () => this.verificationService.getDatabaseVpRecord(query),
    );
  }

  @MessagePattern('verification.getDatabaseVerificationCount')
  @UseRequestContext()
  async getDatabaseVerificationCount(
    query: IVerificationQuery,
  ): Promise<number> {
    return withTransaction(
      'verification.getDatabaseVerificationCount',
      'microservice',
      () => this.verificationService.getDatabaseVerificationCount(query),
    );
  }
}
