import { Controller, Get, Param } from '@nestjs/common';
import type { PolicyConfig } from '@tymlez/guardian-api-client';
import { PolicyService } from './policy.service';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get('/list/:clientName')
  async getAll(
    @Param('clientName') clientName: string,
  ): Promise<PolicyConfig[]> {
    return await this.policyService.getAll(clientName);
  }
}
