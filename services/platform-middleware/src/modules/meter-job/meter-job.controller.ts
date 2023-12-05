import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PERMISSIONS } from '@tymlez/common-libs';
import type {
  IFindResult,
  IFindOneResult,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { MeterJobService } from './meter-job.service';
import { CreateMeterJobDto } from './dto/create-meter-job.dto';
import { UpdateMeterJobDto } from './dto/update-meter-job.dto';
import { MeterJob } from './entities/meter-job.entity';

@Controller('meter-job')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class MeterJobController {
  constructor(private readonly meterJobService: MeterJobService) {}
  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Post()
  async create(
    @Body() createMeterJobDto: CreateMeterJobDto,
  ): Promise<IMutationResult> {
    return await this.meterJobService.create(createMeterJobDto);
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Post('duplicate')
  duplicate(@Body() payload: { id: string }): Promise<IMutationResult> {
    return this.meterJobService.duplicate(payload.id);
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_READ,
  )
  @Get()
  findAll(): Promise<IFindResult<MeterJob>> {
    return this.meterJobService.findAll(
      {},
      { populate: ['currentTask'], orderBy: { id: 'DESC' } },
    );
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_READ,
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IFindOneResult<MeterJob>> {
    return this.meterJobService.findOne(id);
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeterJobDto: UpdateMeterJobDto,
  ): Promise<IMutationResult> {
    return this.meterJobService.update(id, updateMeterJobDto);
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Delete(':id')
  remove(@Param('id') id: string): Promise<IMutationResult> {
    return this.meterJobService.remove(id);
  }
}
