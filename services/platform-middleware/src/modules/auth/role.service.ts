import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IMutationResult } from '@tymlez/platform-api-interfaces';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  listRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  listAvailablePermissions() {
    return Object.values(PERMISSIONS);
  }

  async updateRole(role: UpdateRoleDto): Promise<IMutationResult> {
    const existingRole = await this.roleRepository.findOne({ name: role.name });

    if (!existingRole) {
      return {
        success: false,
        message: `Role does not exist. No role to update!`,
      };
    }

    Object.assign(existingRole, role);
    try {
      await this.roleRepository.persistAndFlush(existingRole);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  public async addRole(role: CreateRoleDto): Promise<IMutationResult> {
    const existingRole = await this.roleRepository.findOne({ name: role.name });

    if (existingRole) {
      return {
        success: false,
        message: `Role name already exists. `,
      };
    }
    const newRole = this.roleRepository.create({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      createdAt: new Date(),
    } as any);

    try {
      await this.roleRepository.persistAndFlush(newRole);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  public async deleteRole(name: string): Promise<IMutationResult> {
    const existingRole = await this.roleRepository.findOne({ name });

    if (!existingRole) {
      return {
        success: false,
        message: 'Role does not exist. No role to delete',
      };
    }

    try {
      const toBeDelete = existingRole as Role;
      await this.roleRepository.removeAndFlush(toBeDelete);
    } catch (err: any) {
      return {
        success: false,
        message: `Unable to delete role. ${err.message}`,
      };
    }
    return {
      success: true,
    };
  }
}
