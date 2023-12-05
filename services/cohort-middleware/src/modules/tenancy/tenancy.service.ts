import { Injectable, Logger } from '@nestjs/common';
import type {
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ITenancyDataResult,
} from '@tymlez/platform-api-interfaces';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class TenancyService {
  private readonly logger = new Logger(TenancyService.name);
  constructor(private platformService: PlatformService) {}

  async getMeterTenancy(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<any> {
    const { data: tenancies }: any = await this.platformService.getTenancies();
    const tenanciesData: ITenancyDataResult[] = await Promise.all(
      tenancies.map(async (tenancy: any) => {
        const query: IMeterDataQuery = {
          meterKeys: [tenancy.meterTag],
          fromIsoDateTime: from,
          toIsoDateTime: to,
          metricNames: ['eRealPositiveKwh'],
          granularity,
          groupByMeters: true,
          groupByTags: true,
        };
        const meterData = await this.platformService.queryMeterData(query);
        const data = meterData.filter((meter) =>
          tenancy.dataTags.includes(meter.tag || ''),
        );

        const hash: { [key: string]: any[] } = data.reduce((d, item) => {
          const group = { ...d };
          group[item.isoDateTime] = group[item.isoDateTime] || [];

          group[item.isoDateTime].push(item);
          return group;
        }, {} as any);

        const finalData = Object.entries(hash).map(([_, value]) => {
          return {
            ...value[0],
            value: value.reduce((t, i) => t + +i.value, 0),
          };
        });
        return {
          name: tenancy.name,
          data: finalData,
        };
      }),
    );

    this.logger.debug('getMeterTenancy');

    return tenanciesData;
  }
}
