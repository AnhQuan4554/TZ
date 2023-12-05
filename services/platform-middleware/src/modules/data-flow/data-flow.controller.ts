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
import { PERMISSION_SET } from '@tymlez/common-libs';
import {
  FirebaseAuthGuard,
  Permissions,
  PermissionGuard,
} from '@tymlez/backend-libs';
import { DataFlowService } from './data-flow.service';
import { CreateDataFlowDto } from './dto/create-data-flow.dto';
import { UpdateDataFlowDto } from './dto/update-data-flow.dto';
import { DataFlow } from './entities/data-flow.entity';

@Controller('data-flow')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class DataFlowController {
  constructor(private readonly dataFlowService: DataFlowService) {}

  @Get()
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  findAll(): Promise<IFindResult<DataFlow>> {
    return this.dataFlowService.findAll(
      {},
      {
        populate: ['dataTasks', 'meter'],
        orderBy: { id: 'DESC' },
        forceObject: true,
      },
    );
  }

  @Get(':id')
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  findOne(@Param('id') id: string): Promise<IFindOneResult<DataFlow>> {
    return this.dataFlowService.findOne(id, ['meter']);
  }

  @Post()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async create(
    @Body() createDataFlowDto: CreateDataFlowDto,
  ): Promise<IMutationResult> {
    return await this.dataFlowService.create(createDataFlowDto);
  }

  // @Post('publish')
  //@Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  // publish(@Body() payload: { id: string }): Promise<IMutationResult> {
  //   return this.dataFlowService.publish(payload.id);
  // }

  @Put(':id')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  update(
    @Param('id') id: string,
    @Body() updateDataFlowDto: UpdateDataFlowDto,
  ): Promise<IMutationResult> {
    return this.dataFlowService.update(id, updateDataFlowDto);
  }

  @Delete(':id')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  remove(@Param('id') id: string): Promise<IMutationResult> {
    return this.dataFlowService.remove(id);
  }
}
