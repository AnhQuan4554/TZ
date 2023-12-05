import { round, sum } from 'lodash';
import { Injectable } from '@nestjs/common';
import type {
  ICarbonTotal,
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  ICarbonSeries,
} from '@tymlez/platform-api-interfaces';
import { diffSeriesData, lookupMetricSeries } from '@tymlez/common-libs';
import { ClientSettings } from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class CarbonService {
  constructor(private platformService: PlatformService) {}

  async getCarbonTotalData(
    from: IIsoDate,
    to: IIsoDate,
  ): Promise<ICarbonTotal> {
    const { carbonEmissionMetricNames, carbonAbatementMetricNames } =
      ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...carbonEmissionMetricNames,
        ...carbonAbatementMetricNames,
      ],
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const emissions = queryResult
      .filter((data) => carbonEmissionMetricNames.includes(data.metricName!))
      .map((data) => Number(data.value) || 0);

    const abatements = queryResult
      .filter((data) => carbonAbatementMetricNames.includes(data.metricName!))
      .map((data) => Number(data.value) || 0);

    const totalEmissions = round(sum(emissions), 4);
    const totalAbatements = round(sum(abatements), 4);
    const netEmissions = round(totalEmissions - totalAbatements, 4);

    return {
      emission: totalEmissions,
      abatement: totalAbatements,
      net: netEmissions,
    };
  }

  async getCarbonSeriesData(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<ICarbonSeries> {
    const { carbonEmissionMetricNames, carbonAbatementMetricNames } =
      ClientSettings;

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [
        ...carbonEmissionMetricNames,
        ...carbonAbatementMetricNames,
      ],
      granularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const emission = lookupMetricSeries(queryResult, carbonEmissionMetricNames);

    const abatement = lookupMetricSeries(
      queryResult,
      carbonAbatementMetricNames,
    );

    const net = diffSeriesData(emission, abatement);

    return {
      emission,
      abatement,
      net,
    };
  }
}
