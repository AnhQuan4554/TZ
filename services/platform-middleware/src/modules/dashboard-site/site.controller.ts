import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
  IFindResult,
  ISite,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS, PERMISSION_SET } from '@tymlez/common-libs';
import { CreateSiteDto, DeleteSiteDto, UpdateSiteDto } from './dto/site.dto';
import { SiteService } from './site.service';

@Controller('sites')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get()
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    PERMISSIONS.CLIENT_DASHBOARD_READ,
  )
  async getAllSites(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<ISite>> {
    return await this.siteService.getAllSites(pageSize, page);
  }

  @Get('/details/:id')
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    PERMISSIONS.CLIENT_DASHBOARD_READ,
  )
  async getSiteDetail(@Param('id') id: string): Promise<ISite | null> {
    return await this.siteService.getSiteDetail(id);
  }

  @Get('/:client/:siteName')
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    PERMISSIONS.CLIENT_DASHBOARD_READ,
  )
  async getSiteDetails(
    @Param('client') clientName: string,
    @Param('siteName') siteName: string,
  ): Promise<ISite | null> {
    return await this.siteService.getSiteDetails(clientName, siteName);
  }

  @Get('/:client')
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    PERMISSIONS.CLIENT_DASHBOARD_READ,
  )
  async getSites(
    @Param('client') clientName: string,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<Array<ISite> | null> {
    return this.siteService.getSites(clientName, pageSize, page);
  }

  @Post()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async addSite(@Body() site: CreateSiteDto): Promise<IMutationResult> {
    return await this.siteService.addSite(site);
  }

  @Put('/:id')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async UpdateSite(
    @Body() site: UpdateSiteDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (site.id === undefined) {
      return {
        success: false,
        message: 'Cannot update site. Internal server error -  no site id',
      };
    }
    if (id !== site.id) {
      return {
        success: false,
        message: 'Site to be updated does not match. Please check!',
      };
    }
    return await this.siteService.updateSite(site);
  }

  @Delete('/:id')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async deleteSite(
    @Body() site: DeleteSiteDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    if (site.id === undefined) {
      return {
        success: false,
        message: 'Cannot delete site. Internal server error -  no site id',
      };
    }
    if (id !== site.id) {
      return {
        success: false,
        message: 'Site to be deleted does not match. Please check!',
      };
    }
    return await this.siteService.deleteSite(site);
  }
}
