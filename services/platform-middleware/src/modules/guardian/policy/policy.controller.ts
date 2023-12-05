import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import type {
  IMutationResult,
  IFindResult,
  IPolicy,
  UUID,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { CreatePolicyDto, UpdatePolicyDto } from '../dto/policy.dto';
import { GuardianPolicyService } from './policy.service';

@Controller('policy')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class GuardianPolicyController {
  constructor(private policyService: GuardianPolicyService) {}

  @Get()
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async getAll(): Promise<IFindResult<IPolicy>> {
    return await this.policyService.getAll();
  }

  @Get('/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async getDetail(@Param('id') id: UUID): Promise<IPolicy | null> {
    return await this.policyService.getDetail(id);
  }

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async add(@Body() policy: CreatePolicyDto): Promise<IMutationResult> {
    return await this.policyService.add(policy);
  }

  @Put('/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async update(
    @Param('id') id: string,
    @Body() policy: UpdatePolicyDto,
  ): Promise<IMutationResult> {
    if (policy.id === undefined) {
      return {
        success: false,
        message: 'Cannot update policy. Internal server error -  no policy id',
      };
    }

    if (id !== policy.id) {
      return {
        success: false,
        message: 'Policy to be updated does not match. Please check!',
      };
    }
    return await this.policyService.update(policy);
  }

  @Post('/publish/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(@Param('id') id: string): Promise<IMutationResult> {
    return await this.policyService.publish(id);
  }
}
