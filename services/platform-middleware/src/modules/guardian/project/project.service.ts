/* eslint-disable no-param-reassign */
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { logger } from '@tymlez/backend-libs';
import type {
  IMutationResult,
  IProject,
} from '@tymlez/platform-api-interfaces';
import { Setting } from '../../settings/entities/setting.entity';
import { SettingService } from '../../settings/setting.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { GuardianService } from '../guardian.service';
import { RootAuthorityService } from '../root-authority/root-authority.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly em: EntityManager,
    private readonly guardianService: GuardianService,
    private readonly settingService: SettingService,
    private readonly rootService: RootAuthorityService,
  ) {}

  public async addProject(project: CreateProjectDto): Promise<IMutationResult> {
    if (project.standard.toUpperCase() === 'TYMLEZ') {
      project.standardProjectId = project.projectId;
    } else if (project.standardProjectId === '') {
      return {
        success: false,
        message: 'Standard Project Id is required',
      };
    }

    delete (project as any).submit;
    const newProject = this.em.create(Setting, {
      name: 'Project',
      jsonValue: JSON.stringify(project),
      description: 'Project',
      type: 'string',
    } as any);

    try {
      await this.em.persistAndFlush(newProject);
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

  public async updateProject(
    project: UpdateProjectDto,
  ): Promise<IMutationResult> {
    const existingProjectSetting = await this.settingService.getDetailByName(
      'Project',
    );

    if (existingProjectSetting === null) {
      return {
        success: false,
        message: 'Project does not exist. No project to update',
      };
    }
    if (project.standard.toUpperCase() === 'TYMLEZ') {
      project.standardProjectId = project.projectId;
    } else if (project.standardProjectId === '') {
      return {
        success: false,
        message: 'Standard Project Id is required',
      };
    }

    delete (project as any).submit;

    existingProjectSetting.jsonValue = JSON.stringify(project);
    try {
      await this.em.persistAndFlush(existingProjectSetting);
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

  public async getProject(): Promise<IProject | null> {
    const projectSetting = await this.settingService.getDetailByName('Project');

    if (projectSetting) {
      const project = JSON.parse(projectSetting.jsonValue as string);
      return project.isPublished
        ? { ...project }
        : { ...project, isPublished: false };
    }

    return null;
  }

  public async publishProject(): Promise<IMutationResult> {
    const project = await this.getProject();
    if (project === null) {
      return {
        success: false,
        message: `No project to be published`,
      };
    }
    const { rootAuthority, error } =
      await this.rootService.getPublishedRootAuthority();

    if (rootAuthority === undefined || error !== undefined) {
      return {
        success: false,
        message: `Root Authority is not published. (${error})`,
      };
    }

    if (project.standardProjectLink === '') {
      delete (project as any).standardProjectLink;
    }

    delete (project as any).isPublished;

    try {
      await this.guardianService.makeGuardianRequest(
        'project',
        'post',
        project,
      );
    } catch (err: any) {
      logger.error(err, 'Publish project failed!');
      return {
        success: false,
        message: err.response?.data.message,
      };
    }
    this.updatePublishedSuccess();
    return {
      success: true,
      message: `Project published`,
    };
  }

  private async updatePublishedSuccess(): Promise<IMutationResult> {
    const existingProjectSetting = await this.settingService.getDetailByName(
      'Project',
    );
    if (existingProjectSetting === null) {
      return {
        success: false,
      };
    }
    const existingProject = JSON.parse(
      existingProjectSetting.jsonValue as string,
    ) as IProject;

    existingProject.isPublished = true;
    existingProjectSetting.jsonValue = JSON.stringify(existingProject);
    try {
      await this.em.persistAndFlush(existingProjectSetting);
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

  public async getPublishedProject(): Promise<IProject | null> {
    let publishedProject = null;
    try {
      publishedProject = await this.guardianService.makeGuardianRequest(
        'project',
        'get',
      );
    } catch (err: any) {
      logger.error(err, 'Get published project failed!');
      return null;
    }
    return publishedProject === '' ? null : publishedProject;
  }

  public async export(): Promise<IProject | null> {
    const projectSetting = await this.settingService.getDetailByName('Project');
    if (projectSetting) {
      const project = projectSetting.jsonValue as string;
      return { ...JSON.parse(project), isPublished: false };
    }

    return null;
  }

  public async import(
    project: IProject,
    isNew: boolean,
  ): Promise<IMutationResult> {
    let newProject;
    if (isNew) {
      newProject = this.em.create(Setting, {
        name: 'Project',
        jsonValue: JSON.stringify(project),
        description: 'Project',
        type: 'string',
      } as any);
    } else {
      newProject = (await this.settingService.getDetailByName(
        'Project',
      )) as Setting;
      newProject.jsonValue = JSON.stringify(project);
    }
    try {
      await this.em.persistAndFlush(newProject);
    } catch (err: any) {
      logger.error(err, 'Import project failed!');
      return {
        success: false,
        message: `Import project failed!`,
      };
    }
    return {
      success: true,
    };
  }
}
