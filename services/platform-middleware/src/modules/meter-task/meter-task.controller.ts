import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
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
  IFindResult,
  IMutationResult,
  IMeterTask,
  IMeterTaskStatus,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { UpdateMeterTaskDto } from './dto/update-meter-task.dto';
import { MeterTask } from './entities/meter-task.entity';
import { MeterTaskService } from './meter-task.service';

@Controller('meter-tasks')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class MeterTaskController {
  constructor(private meterTaskService: MeterTaskService) {}

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @Put('/:taskId')
  async update(
    @Body() meterTask: UpdateMeterTaskDto,
  ): Promise<IMutationResult<IMeterTask | null>> {
    return await this.meterTaskService.update(meterTask.id, meterTask);
  }

  @UseGuards(FirebaseAuthGuard, PermissionGuard)
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  @Get()
  findAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('startDateTime') startDateTime: string,
    @Query('endDateTime') endDateTime: string,
    @Query('status') status: IMeterTaskStatus,
    @Query('meterJobId') meterJobId: string,
  ): Promise<IFindResult<MeterTask>> {
    const meterTask = {
      startDateTime,
      endDateTime,
      status,
      meterJobId,
    };

    return this.meterTaskService.getAll(pageSize, page, meterTask);
  }
}
