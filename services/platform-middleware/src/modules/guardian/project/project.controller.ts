import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import type {
  IMutationResult,
  IProject,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async addProject(
    @Body() project: CreateProjectDto,
  ): Promise<IMutationResult> {
    if (project.projectId === undefined) {
      return {
        success: false,
        message: 'Cannot add project. Internal server error -  no project id',
      };
    }
    return await this.projectService.addProject(project);
  }

  @Put()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async updateProject(
    @Body() project: UpdateProjectDto,
  ): Promise<IMutationResult> {
    if (project.projectId === undefined) {
      return {
        success: false,
        message:
          'Cannot update project. Internal server error -  no project id',
      };
    }
    return await this.projectService.updateProject(project);
  }

  @Post('/publish')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(): Promise<IMutationResult> {
    return await this.projectService.publishProject();
  }

  @Get()
  @Permissions(
    ...PERMISSION_SET.GUARDIAN_MANAGEMENT,
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
  )
  async getProject(): Promise<IProject | null> {
    const prj = await this.projectService.getProject();
    return prj;
  }
}
