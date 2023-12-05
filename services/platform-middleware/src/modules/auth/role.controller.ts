import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { IMutationResult, IRole } from '@tymlez/platform-api-interfaces';
import {
  Permissions,
  PermissionGuard,
  FirebaseAuthGuard,
} from '@tymlez/backend-libs';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Controller('auth/roles')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/')
  @Permissions(...PERMISSION_SET.USER_MANAGEMENT)
  async listRole(): Promise<IRole[]> {
    return this.roleService.listRoles();
  }

  @Get('/permissions')
  @Permissions(...PERMISSION_SET.USER_MANAGEMENT)
  async listPermissions(): Promise<string[]> {
    return await this.roleService.listAvailablePermissions();
  }

  @Post()
  @Permissions(...PERMISSION_SET.USER_WRITE_MANAGEMENT)
  async addRole(@Body() role: CreateRoleDto): Promise<IMutationResult> {
    return await this.roleService.addRole(role);
  }

  @Put('/:name')
  @Permissions(...PERMISSION_SET.USER_WRITE_MANAGEMENT)
  async updateRole(
    @Param('name') name: string,
    @Body() role: UpdateRoleDto,
  ): Promise<IMutationResult> {
    if (name !== role.name) {
      return {
        success: false,
        message: 'Role to be updated does not match. Please check!',
      };
    }
    return await this.roleService.updateRole(role);
  }

  @Delete('/:name')
  @Permissions(...PERMISSION_SET.USER_WRITE_MANAGEMENT)
  async deleteRole(@Param('name') name: string): Promise<IMutationResult> {
    return await this.roleService.deleteRole(name);
  }
}
