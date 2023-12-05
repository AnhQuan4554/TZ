import {
  Body,
  Controller,
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
  IGuardianSite,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { CreateGuardianSiteDto, UpdateGuardianSiteDto } from '../dto/site.dto';
import { GuardianSiteService } from './site.service';

@Controller('guardian-sites')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class GuardianSiteController {
  constructor(private siteService: GuardianSiteService) {}

  @Get()
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async getAllSites(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<IGuardianSite>> {
    return await this.siteService.getAllSites(pageSize, page);
  }

  @Get('/details/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_MANAGEMENT)
  async getSiteDetail(@Param('id') id: string): Promise<IGuardianSite | null> {
    return await this.siteService.getSiteDetail(id);
  }

  @Post()
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async addSite(@Body() site: CreateGuardianSiteDto): Promise<IMutationResult> {
    return await this.siteService.addSite(site);
  }

  @Put('/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async UpdateSite(
    @Param('id') id: string,
    @Body() site: UpdateGuardianSiteDto,
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

  @Post('/publish/:id')
  @Permissions(...PERMISSION_SET.GUARDIAN_WRITE_MANAGEMENT)
  async publish(@Param('id') id: string): Promise<IMutationResult> {
    return await this.siteService.publishSite(id);
  }
}
