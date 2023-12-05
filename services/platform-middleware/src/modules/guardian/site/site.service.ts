/* eslint-disable no-param-reassign */
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IMutationResult,
  IFindResult,
  IGuardianSite,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { CreateGuardianSiteDto, UpdateGuardianSiteDto } from '../dto/site.dto';
import { GuardianSite } from '../entities/site.entity';
import { ProjectService } from '../project/project.service';
import { GuardianService } from '../guardian.service';

@Injectable()
export class GuardianSiteService {
  constructor(
    @InjectRepository(GuardianSite)
    private siteRepo: EntityRepository<GuardianSite>,
    private readonly guardianService: GuardianService,
    private projectService: ProjectService,
    private readonly em: EntityManager,
  ) {}

  async getAllSites(
    pageSize: number,
    page: number,
  ): Promise<IFindResult<IGuardianSite>> {
    const [data, count] = await this.siteRepo.findAndCount(
      {},
      {
        orderBy: { name: 'ASC' },
        limit: pageSize,
        offset: page * pageSize,
      },
    );
    return { count, data };
  }

  async getSiteDetail(id: string): Promise<IGuardianSite | null> {
    return await this.siteRepo.findOne({ id });
  }

  async getSiteByName(siteName: string): Promise<IGuardianSite | null> {
    return await this.siteRepo.findOne({ name: siteName });
  }

  public async addSite(site: CreateGuardianSiteDto): Promise<IMutationResult> {
    const existingSite = await this.getSiteByName(site.name);
    if (existingSite !== null) {
      return {
        success: false,
        message: 'Site name already exists',
      };
    }

    const newSite = this.em.create(GuardianSite, {
      name: site.name,
      lat: site.lat,
      lng: site.lng,
      createdAt: new Date(),
      tags: ['initial'],
      isPublished: false,
    } as any);
    try {
      await this.em.persistAndFlush(newSite);
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

  public async updateSite(
    site: UpdateGuardianSiteDto,
  ): Promise<IMutationResult> {
    const existingSite = await this.getSiteDetail(site.id);
    if (existingSite === null) {
      return {
        success: false,
        message: 'Site does not exist. No site to update',
      };
    }
    if (existingSite.name !== site.name) {
      const existingSitename = await this.getSiteByName(site.name);
      if (existingSitename !== null) {
        return {
          success: false,
          message: 'Site name already exists. Please input another site name!',
        };
      }
    }
    Object.assign(existingSite, site);
    try {
      await this.em.persistAndFlush(existingSite);
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

  public async publishSite(id: string): Promise<IMutationResult> {
    const site = await this.getSiteDetail(id);
    if (site === null) {
      return {
        success: false,
        message: `No site to be published`,
      };
    }
    const publishedProject = await this.projectService.getPublishedProject();
    if (publishedProject === null) {
      return {
        success: false,
        message: `Project is not published. Please check!`,
      };
    }

    delete (site as any).isPublished;

    try {
      await this.guardianService.makeGuardianRequest(`site`, 'post', {
        siteId: site.id,
        siteName: site.name,
        projectId: publishedProject.projectId,
        GPSLocation: `${site.lng}-${site.lat}`,
      });
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data.message,
      };
    }

    //update isPublished to true
    await this.updatePublishedSuccess(site);

    return {
      success: true,
      message: `Site published!`,
    };
  }

  private async updatePublishedSuccess(
    site: IGuardianSite,
  ): Promise<IMutationResult> {
    const qb = (this.em as SqlEntityManager)
      .createQueryBuilder(GuardianSite)
      .update({ isPublished: true })
      .where({
        name: site.name,
      });

    try {
      await qb.execute();
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

  public async isSitePublished(id: string): Promise<Boolean> {
    let publishedSites = [];
    try {
      publishedSites = await this.guardianService.makeGuardianRequest(
        `sites`,
        'get',
      );
    } catch (err: any) {
      logger.error(err, 'Get published sites failed!');
      return false;
    }
    if (publishedSites.length === 0) {
      return false;
    }
    return publishedSites.find((x: any) => x.siteId === id);
  }

  public async export(): Promise<IGuardianSite[]> {
    try {
      const data = await this.siteRepo.find(
        {},
        {
          orderBy: { name: 'ASC' },
        },
      );
      data.map((x) => {
        x.isPublished = false;
        return x;
      });
      return data;
    } catch (err: any) {
      logger.error(err, 'Export guardian site failed');
      return [];
    }
  }

  public async import(
    site: IGuardianSite,
    isNew: boolean,
  ): Promise<IMutationResult> {
    try {
      if (isNew) {
        const newSite = this.em.create(GuardianSite, {
          ...site,
        } as any);
        await this.em.persistAndFlush(newSite);
      } else {
        const existingSite = (await this.getSiteByName(
          site.name,
        )) as IGuardianSite;

        site.id = existingSite.id;
        Object.assign(existingSite, site);

        await this.em.persistAndFlush(existingSite);
      }
    } catch (err: any) {
      logger.error(err, 'Import guardian site failed!');
      return {
        success: false,
        message: `Import guardian site ${site.name} failed!`,
      };
    }
    return { success: true };
  }
}
