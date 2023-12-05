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
  Permissions,
  FirebaseAuthGuard,
  PermissionGuard,
} from '@tymlez/backend-libs';
import type {
  IMutationResult,
  IMeter,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { MeterService } from './meter.service';
import {
  CreateMeterDto,
  DeleteMeterDto,
  UpdateMeterDto,
} from './dto/meter.dto';

@Controller('meters')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class MeterController {
  constructor(private meterService: MeterService) {}

  @Get('/:meterId')
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  async getMeter(@Param('meterId') meterId: string): Promise<IMeter | null> {
    return this.meterService.getMeterById(meterId);
  }

  @Get()
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  async getAllMeters(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<IMeter>> {
    return this.meterService.getAllMeters(pageSize, page);
  }

  @Post()
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async addMeter(@Body() meter: CreateMeterDto): Promise<IMutationResult> {
    return await this.meterService.addMeter(meter);
  }

  @Put('/:meterId')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async updateMeter(@Body() meter: UpdateMeterDto): Promise<IMutationResult> {
    return await this.meterService.updateMeter(meter);
  }

  @Delete('/:meterId')
  @Permissions(...PERMISSION_SET.CONFIG_WRITE_MANAGEMENT)
  async deleteMeter(@Body() meter: DeleteMeterDto): Promise<IMutationResult> {
    return await this.meterService.deleteMeter(meter);
  }

  @Get('/metersBySite/:id')
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  async getMetersBySite(@Param('id') id: string): Promise<IMeter[]> {
    return await this.meterService.getMetersBySite(id);
  }

  @Get('/metersByDevice/:id')
  @Permissions(...PERMISSION_SET.CONFIG_MANAGEMENT)
  async getMetersByDevice(@Param('id') id: string): Promise<IMeter[]> {
    return await this.meterService.getMetersByDevice(id);
  }
}
