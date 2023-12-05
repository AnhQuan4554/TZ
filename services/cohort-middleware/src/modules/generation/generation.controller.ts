import {
  CacheTTL,
  DefaultValuePipe,
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
  ISingleValueHttpResponse,
  IMultiValueHttpResponse,
  ISeriesItem,
  ISummaryItem,
} from '@tymlez/platform-api-interfaces';
import { PERMISSIONS } from '@tymlez/common-libs';
import { GenerationService } from './generation.service';
import { IsoDateTimePipe } from '../../utils/pipes/isodatetime.pipe';

@Controller('generation')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class GenerationController {
  constructor(private generationService: GenerationService) {}

  @Get('forecast-total')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(3600)
  async getGenerationForecastTotal(
    @Query('hours', new DefaultValuePipe(24)) hours: number,
  ): Promise<ISingleValueHttpResponse<number>> {
    return await this.generationService.getGenerationForecastTotal(hours);
  }

  @Get('forecast-series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(3600)
  async getGenerationForecastSeries(
    @Query('hours', new DefaultValuePipe(24)) hours: number,
  ): Promise<IMultiValueHttpResponse<ISeriesItem>> {
    return await this.generationService.getGenerationForecastSeries(hours);
  }

  @Get('history-total')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(3600)
  async getGenerationHistoryTotal(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
  ): Promise<ISingleValueHttpResponse<number>> {
    const result = await this.generationService.getGenerationHistoryTotal(
      from,
      to,
    );
    return {
      data: result,
      success: true,
    };
  }

  @Get('history-series')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  @CacheTTL(3600)
  async getGenerationHistorySeries(
    @Query('from', new IsoDateTimePipe()) from: IIsoDate,
    @Query('to', new IsoDateTimePipe(new Date().toISOString())) to: IIsoDate,
    @Query(
      'granularity',
      new ParseEnumPipe(
        {
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
  ): Promise<IMultiValueHttpResponse<ISeriesItem>> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    const result = await this.generationService.getGenerationHistorySeries(
      from,
      to,
      realGranularity,
    );

    return {
      count: result.length,
      data: result,
      success: true,
    };
  }

  @Get('/history-metrics')
  @Permissions(
    PERMISSIONS.CLIENT_DASHBOARD_READ,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.ALL_RESOURCE_WRITE,
  )
  async getGenerationKeyMetrics(
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
  ): Promise<ISummaryItem> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;
    return await this.generationService.getGenerationSummary(
      from,
      to,
      realGranularity,
    );
  }
}
