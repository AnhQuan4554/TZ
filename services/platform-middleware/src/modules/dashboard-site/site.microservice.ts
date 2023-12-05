import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import type { IFindResult, ISite, UUID } from '@tymlez/platform-api-interfaces';
import { SiteService } from './site.service';

@Controller()
export class SiteMicroservice {
  constructor(
    private siteService: SiteService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('site.getSite')
  @UseRequestContext()
  async getSite(@Payload() siteId: UUID): Promise<ISite | null> {
    return withTransaction('site.getSite', 'microservice', () =>
      this.siteService.getSiteDetail(siteId),
    );
  }

  @MessagePattern('site.getSites')
  @UseRequestContext()
  async getSites(): Promise<IFindResult<ISite> | []> {
    return withTransaction('site.getSites', 'microservice', () =>
      this.siteService.getAllSitesWithoutLimit(),
    );
  }
}
