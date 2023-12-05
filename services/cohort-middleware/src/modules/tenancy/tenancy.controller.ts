import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseEnumPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  FirebaseAuthGuard,
  PermissionGuard,
  Permissions,
  getGranularity,
} from '@tymlez/backend-libs';
import type {
  IIsoDate,
  IMetricGranularity,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';
import { TenancyService } from './tenancy.service';

@Controller('tenancy')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class TenancyController {
  constructor(private tenancyService: TenancyService) {}

  @Get('/main')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getMeterTenancy(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query(
      'granularity',
      new ParseEnumPipe(
        {
          total: 'total',
          minute: 'minute',
          hour: 'hour',
          day: 'day',
          month: 'month',
          week: 'week',
          auto: 'auto',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid granularity value');
          },
        },
      ),
    )
    granularity: IMetricGranularity,
  ): Promise<any> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    return this.tenancyService.getMeterTenancy(from, to, realGranularity);
  }
}
