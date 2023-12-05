import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import type {
  IFindResult,
  IMutationResult,
  ISetting,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { CreateSettingDto, UpdateSettingDto } from './dto/setting.dto';
import { SettingService } from './setting.service';

@Controller('settings')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class SettingController {
  constructor(private settingService: SettingService) {}

  @Get()
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  async getAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('filter') filterQuery: string,
  ): Promise<IFindResult<ISetting>> {
    return this.settingService.getAllSettings(pageSize, page, filterQuery);
  }

  @Get('/:id')
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  async getDetailById(@Param('id') id: string): Promise<ISetting | null> {
    return this.settingService.getDetailById(id);
  }

  @Get('trustchain/:name')
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    ...PERMISSION_SET.CLIENT_TRUSTCHAIN_ACCESS,
  )
  async getPublicSettingByName(
    @Param('name') name: string,
  ): Promise<ISetting | null> {
    // Only allow few setting to be public access
    if (!['TrustchainAllAccounts', 'TrustchainDefaultAccount'].includes(name)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.settingService.getDetailByName(name);
  }

  @Post()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async add(@Body() setting: CreateSettingDto): Promise<IMutationResult> {
    return await this.settingService.add(setting);
  }

  @Put('/:settingName')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async update(@Body() setting: UpdateSettingDto): Promise<IMutationResult> {
    return await this.settingService.update(setting);
  }
}
