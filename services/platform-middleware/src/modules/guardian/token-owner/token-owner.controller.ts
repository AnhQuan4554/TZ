import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { IMutationResult, ITokenOwner } from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import {
  CreateTokenOwnerDto,
  UpdateTokenOwnerDto,
} from '../dto/token-owner.dto';
import { TokenOwnerService } from './token-owner.service';

@Controller('token-owner')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class TokenOwnerController {
  constructor(private tokenOwnerService: TokenOwnerService) {}

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async add(@Body() token: CreateTokenOwnerDto): Promise<IMutationResult> {
    if (token.tokenOwnerId === undefined) {
      return {
        success: false,
        message:
          'Cannot add token owner. Internal server error -  no token owner id',
      };
    }
    return await this.tokenOwnerService.add(token);
  }

  @Put()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async update(@Body() token: UpdateTokenOwnerDto): Promise<IMutationResult> {
    if (token.tokenOwnerId === undefined) {
      return {
        success: false,
        message:
          'Cannot update token owner. Internal server error -  no token owner id',
      };
    }
    return await this.tokenOwnerService.update(token);
  }

  @Post('/publish')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(): Promise<IMutationResult<boolean>> {
    return await this.tokenOwnerService.publish();
  }

  @Get()
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async get(): Promise<ITokenOwner | null> {
    return await this.tokenOwnerService.get();
  }
}
