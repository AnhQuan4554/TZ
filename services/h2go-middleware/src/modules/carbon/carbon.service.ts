import { Injectable } from '@nestjs/common';
import type {
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ICarbonSeries,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import { diffSeriesData, lookupMetricSeries } from '@tymlez/common-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class CarbonService {
  constructor(private platformService: PlatformService) {}

  async getCarbonSeriesData(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ICarbonSeries> {
    const { CARBON_EMISSION_METRICS, CARBON_ABATEMENT_METRICS } =
      ClientSettings;

    const emission = await this.getMetricSeriesData(
      CARBON_EMISSION_METRICS,
      from,
      to,
      granularity,
    );

    const abatement = await this.getMetricSeriesData(
      CARBON_ABATEMENT_METRICS,
      from,
      to,
      granularity,
    );

    const net = diffSeriesData(emission, abatement);

    return {
      emission,
      abatement,
      net,
    };
  }

  async getMetricSeriesData(
    metricNames: string[],
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ISeriesItem[]> {
    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames,
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    return lookupMetricSeries(queryResult, metricNames);
  }
}
