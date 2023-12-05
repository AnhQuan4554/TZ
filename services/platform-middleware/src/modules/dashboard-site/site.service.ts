import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IMutationResult,
  IFindResult,
  ISite,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { Site } from './entities/site.entity';
import { CreateSiteDto, DeleteSiteDto, UpdateSiteDto } from './dto/site.dto';
import { AuthService } from '../auth/auth.service';
import { MeterService } from '../meter/meter.service';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepo: EntityRepository<Site>,

    private meterService: MeterService,
    private authService: AuthService,
    private readonly em: EntityManager,
  ) {}

  async getAllSites(
    pageSize: number,
    page: number,
  ): Promise<IFindResult<ISite>> {
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

  async getAllSitesWithoutLimit(): Promise<IFindResult<ISite>> {
    const [data, count] = await this.siteRepo.findAndCount(
      {},
      {
        orderBy: { name: 'ASC' },
      },
    );
    return { count, data };
  }

  async getSiteByName(siteName: string): Promise<ISite | null> {
    return await this.siteRepo.findOne({ name: siteName });
  }

  async getSiteDetail(id: string): Promise<ISite | null> {
    try {
      return await this.siteRepo.findOne({ id });
    } catch (err: any) {
      logger.error(err, 'Get site by Id failed!');
      return null;
    }
  }

  async getSiteDetails(
    clientName: string,
    siteName: string,
  ): Promise<ISite | null> {
    const client = await this.authService.getClientDetail(clientName);
    if (!client) {
      logger.error({}, `Cannot find client '${clientName}'`);
      return null;
    }
    return this.siteRepo.findOne({
      name: siteName,
      client: {
        name: clientName,
      },
    });
  }

  async getSites(
    clientName: string,
    pageSize: number,
    page: number,
  ): Promise<Array<ISite> | null> {
    const client = await this.authService.getClientDetail(clientName);
    if (!client) {
      logger.error({}, `Cannot find client '${clientName}'`);
      return null;
    }

    return await this.siteRepo.find(
      {
        client: { name: clientName },
      },
      {
        orderBy: { name: 'ASC' },
        limit: pageSize,
        offset: page * pageSize,
        populate: true,
      },
    );
  }

  public async addSite(site: CreateSiteDto): Promise<IMutationResult> {
    const existingSite = await this.getSiteByName(site.name);
    if (existingSite !== null) {
      return {
        success: false,
        message: 'Site name already exists',
      };
    }

    const client = await this.authService.getClients();

    const newSite = this.em.create(Site, {
      name: site.name,
      client,
      label: site.label,
      address: site.address,
      lat: site.lat,
      lng: site.lng,
      createdAt: new Date(),
      tags: ['initial'],
      timezone: site.timezone,
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

  public async updateSite(site: UpdateSiteDto): Promise<IMutationResult> {
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

  public async deleteSite(site: DeleteSiteDto): Promise<IMutationResult> {
    const existingSite = await this.getSiteDetail(site.id);
    if (existingSite === null) {
      return {
        success: false,
        message: 'Site does not exist. No site to delete',
      };
    }

    const res = await this.meterService.deleteMetersBySite(site.id);
    if (!res.success) {
      return {
        success: false,
        message: `Unable to delete site. ${res.message}`,
      };
    }

    try {
      const toBeDelete = existingSite as Site;
      await this.em.removeAndFlush(toBeDelete);
    } catch (err: any) {
      return {
        success: false,
        message: `Unable to delete site. ${err.message}`,
      };
    }
    return {
      success: true,
    };
  }

  public async export(): Promise<ISite[]> {
    try {
      return await this.siteRepo.find(
        {},
        {
          orderBy: { name: 'ASC' },
        },
      );
    } catch (err: any) {
      logger.error(err, 'Export site failed');
      return [];
    }
  }

  public async import(site: ISite, isNew: boolean): Promise<IMutationResult> {
    /* if client is not the same as in database, update client */
    const client = await this.authService.getClients();
    if (client !== site.client) {
      // eslint-disable-next-line no-param-reassign
      site.client = client;
    }
    try {
      if (isNew) {
        const newSite = this.em.create(Site, {
          ...site,
        } as any);
        await this.em.persistAndFlush(newSite);
      } else {
        const existingSite = (await this.getSiteByName(site.name)) as ISite;
        // eslint-disable-next-line no-param-reassign
        site.id = existingSite.id;
        Object.assign(existingSite, site);

        await this.em.persistAndFlush(existingSite);
      }
    } catch (err: any) {
      logger.error(err, 'Import site failed!');
      return {
        success: false,
        message: `Import site ${site.name} failed!`,
      };
    }
    return { success: true };
  }
}
