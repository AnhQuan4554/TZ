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
import { PERMISSIONS } from '@tymlez/common-libs';
import {
  IFindOneResult,
  IFindResult,
  IMrv,
  IMrvApprovedStatus,
  IMrvSummary,
  IMrvQuery,
  IMrvStatus,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import { CreateMRVDto } from './dto/mrv.dto';
import { MrvService } from './mrv.service';

@Controller('mrv')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class MrvController {
  constructor(private mrvService: MrvService) {}

  @Get()
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.MRV_MANUAL_UPLOAD,
    PERMISSIONS.CLIENT_DATA_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
  )
  async getAll(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('startDateTime') startDateTime: string,
    @Query('endDateTime') endDateTime: string,
    @Query('status') status: IMrvStatus,
    @Query('dataSourceType') dataSourceType: string,
    @Query('isApproved') isApproved: IMrvApprovedStatus,
    @Query('policyTag') policyTag: string,
  ): Promise<IFindResult<IMrv>> {
    const mrvQuery: IMrvQuery = {
      startDateTime,
      endDateTime,
      status,
      dataSourceType,
      isApproved,
      policyTag,
    };
    return this.mrvService.getAll(pageSize, page, mrvQuery);
  }

  @Get('/summary')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.MRV_MANUAL_UPLOAD,
    PERMISSIONS.CLIENT_DATA_READ,
    PERMISSIONS.MRV_MANUAL_APPROVE,
  )
  async getSummary(
    @Query('startDateTime') startDateTime: string,
    @Query('endDateTime') endDateTime: string,
  ): Promise<IMrvSummary[]> {
    return this.mrvService.getSummary(startDateTime, endDateTime);
  }

  @Post()
  @Permissions(PERMISSIONS.ALL_RESOURCE_WRITE, PERMISSIONS.MRV_MANUAL_UPLOAD)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async addMRV(@Body() mrv: CreateMRVDto): Promise<IMutationResult> {
    return await this.mrvService.addMRV(mrv);
  }

  @Put('/approve/:id')
  @Permissions(PERMISSIONS.ALL_RESOURCE_WRITE, PERMISSIONS.MRV_MANUAL_APPROVE)
  async approveMrv(@Param('id') id: number): Promise<IMutationResult> {
    return await this.mrvService.approveMrv(id);
  }

  @Put(':id')
  @Permissions(PERMISSIONS.ALL_RESOURCE_WRITE, PERMISSIONS.MRV_MANUAL_UPLOAD)
  update(
    @Param('id') id: string,
    @Body() mrv: CreateMRVDto,
  ): Promise<IMutationResult> {
    return this.mrvService.update(parseInt(id, 10), mrv);
  }

  @Get(':id')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.MRV_MANUAL_UPLOAD,
    PERMISSIONS.CLIENT_DATA_READ,
    PERMISSIONS.MRV_MANUAL_APPROVE,
  )
  findOne(@Param('id') id: string): Promise<IFindOneResult<IMrv>> {
    return this.mrvService.findOne(parseInt(id, 10));
  }

  @Delete(':id')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.MRV_MANUAL_UPLOAD,
    PERMISSIONS.MRV_MANUAL_APPROVE,
  )
  remove(@Param('id') id: string): Promise<IMutationResult> {
    return this.mrvService.remove(parseInt(id, 10));
  }
}
