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
import type {
  IFindResult,
  IFindOneResult,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { DataTaskService } from './data-task.service';
import { CreateDataTaskDto } from './dto/create-data-task.dto';
import { UpdateDataTaskDto } from './dto/update-data-task.dto';
import { DataTask } from './entities/data-task.entity';

@Controller('data-task')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class DataTaskController {
  constructor(private readonly dataTaskService: DataTaskService) {}
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Post()
  async create(
    @Body() createDataTaskDto: CreateDataTaskDto,
  ): Promise<IMutationResult> {
    return await this.dataTaskService.create(createDataTaskDto);
  }

  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Get()
  findAll(): Promise<IFindResult<DataTask>> {
    return this.dataTaskService.findAll(
      {},
      { populate: ['dataFlow'], orderBy: { id: 'DESC' } },
    );
  }

  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IFindOneResult<DataTask>> {
    return this.dataTaskService.findOne(id);
  }

  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataTaskDto: UpdateDataTaskDto,
  ): Promise<IMutationResult> {
    return this.dataTaskService.update(id, updateDataTaskDto);
  }

  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.PLATFORM_CONFIG_WRITE,
  )
  @Delete(':id')
  remove(@Param('id') id: string): Promise<IMutationResult> {
    return this.dataTaskService.remove(id);
  }
}
