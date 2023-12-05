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
} from '@nestjs/common';
import {
  Permissions,
  FirebaseAuthGuard,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { PERMISSIONS, PERMISSION_SET } from '@tymlez/common-libs';
import {
  IFindResult,
  IMutationResult,
  ITenancy,
} from '@tymlez/platform-api-interfaces';
import {
  CreateTenancyDto,
  DeleteTenancyDto,
  UpdateTenancyDto,
} from './dto/tenancy.dto';
import { TenancyService } from './tenancy.service';

@Controller('tenancy')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class TenancyController {
  constructor(private tenancyService: TenancyService) {}

  @Get('/:id')
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    PERMISSIONS.CLIENT_DASHBOARD_READ,
  )
  async get(@Param('id') id: string): Promise<ITenancy | null> {
    return this.tenancyService.get(id);
  }

  @Get()
  @Permissions(
    ...PERMISSION_SET.CONFIG_MANAGEMENT,
    PERMISSIONS.CLIENT_DASHBOARD_READ,
  )
  async getAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<ITenancy>> {
    return this.tenancyService.getAll(pageSize, page);
  }

  @Post()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async add(@Body() tenancy: CreateTenancyDto): Promise<IMutationResult> {
    return await this.tenancyService.add(tenancy);
  }

  @Put('/:id')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async update(
    @Body() tenancy: UpdateTenancyDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    return await this.tenancyService.update(id, tenancy);
  }

  @Delete('/:id')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async delete(
    @Body() tenancy: DeleteTenancyDto,
    @Param('id') id: string,
  ): Promise<IMutationResult> {
    return await this.tenancyService.delete(id, tenancy);
  }
}
