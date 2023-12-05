import { Injectable } from '@nestjs/common';
import type {
  IGenerationLevel,
  IIsoDate,
  IMeterDataQuery,
  IMetricGranularity,
  IPanelGroupVerification,
  IPanelWarning,
  ISeriesItem,
} from '@tymlez/platform-api-interfaces';
import {
  EnumPanelWarning,
  EnumGenerationLevel,
  lookupMetricValue,
  lookupMetricSeries,
} from '@tymlez/common-libs';
import { getGranularity } from '@tymlez/backend-libs';
import {
  ClientSettings,
  maxMWh,
  totalPanelEachGroup,
} from '../client-settings/client-settings';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class EnergyService {
  constructor(private platformService: PlatformService) {}

  async getEnergySeriesData(
    from: IIsoDate,
    to: IIsoDate,
    granularity: IMetricGranularity,
  ): Promise<Record<string, ISeriesItem[]>> {
    const realGranularity =
      granularity === 'auto' ? getGranularity(from, to) : granularity;

    const { GENERATION_METRICS, FORECASTED_ENERGY_METRICS } = ClientSettings;
    //to get data in the past with metric 'solar_array_X.output'
    const GENERATION_METRICS_OLD = GENERATION_METRICS.map((x) =>
      x.replace('.electricity', ''),
    );
    const electricityMetrics = [
      ...GENERATION_METRICS,
      ...GENERATION_METRICS_OLD,
    ];

    const query: IMeterDataQuery = {
      fromIsoDateTime: from,
      toIsoDateTime: to,
      metricNames: [...electricityMetrics, ...FORECASTED_ENERGY_METRICS],
      granularity: realGranularity,
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    const generation = lookupMetricSeries(queryResult, electricityMetrics);

    const forecast = lookupMetricSeries(queryResult, FORECASTED_ENERGY_METRICS);

    return {
      generation,
      forecast,
    };
  }

  async getPanelGroups(): Promise<IPanelGroupVerification> {
    const {
      GENERATION_PANEL_GROUP_1_METRICS,
      GENERATION_PANEL_GROUP_2_METRICS,
      GENERATION_PANEL_GROUP_3_METRICS,
      GENERATION_PANEL_GROUP_4_METRICS,
      PANEL_GROUP_1_METRIC,
      PANEL_GROUP_2_METRIC,
      PANEL_GROUP_3_METRIC,
      PANEL_GROUP_4_METRIC,
    } = ClientSettings;

    const metricNames = [
      ...GENERATION_PANEL_GROUP_1_METRICS,
      ...GENERATION_PANEL_GROUP_2_METRICS,
      ...GENERATION_PANEL_GROUP_3_METRICS,
      ...GENERATION_PANEL_GROUP_4_METRICS,
      ...PANEL_GROUP_1_METRIC,
      ...PANEL_GROUP_2_METRIC,
      ...PANEL_GROUP_3_METRIC,
      ...PANEL_GROUP_4_METRIC,
    ];

    const to = new Date().getTime() - 5 * 60 * 1000; //get 5min before to have data available
    const from = to - 5 * 60 * 1000; //5 min before

    const query: IMeterDataQuery = {
      fromIsoDateTime: new Date(from).toISOString(),
      toIsoDateTime: new Date(to).toISOString(),
      metricNames,
      granularity: 'total',
      groupByMeters: false,
    };

    const queryResult = await this.platformService.queryMeterData(query);

    //group 1
    const nActivePanel1 = lookupMetricValue(queryResult, PANEL_GROUP_1_METRIC);
    const nBrokenPanel1 = totalPanelEachGroup - nActivePanel1;

    const generation1 =
      lookupMetricValue(queryResult, GENERATION_PANEL_GROUP_1_METRICS) / 1000; //MWh
    const generationRatio1 = generation1 / maxMWh;

    //group 2
    const nActivePanel2 = lookupMetricValue(queryResult, PANEL_GROUP_2_METRIC);
    const nBrokenPanel2 = totalPanelEachGroup - nActivePanel2;

    const generation2 =
      lookupMetricValue(queryResult, GENERATION_PANEL_GROUP_2_METRICS) / 1000;
    const generationRatio2 = generation2 / maxMWh;

    //group 3
    const nActivePanel3 = lookupMetricValue(queryResult, PANEL_GROUP_3_METRIC);
    const nBrokenPanel3 = totalPanelEachGroup - nActivePanel3;

    const generation3 =
      lookupMetricValue(queryResult, GENERATION_PANEL_GROUP_3_METRICS) / 1000;
    const generationRatio3 = generation3 / maxMWh;

    //group 4
    const nActivePanel4 = lookupMetricValue(queryResult, PANEL_GROUP_4_METRIC);
    const nBrokenPanel4 = totalPanelEachGroup - nActivePanel4;

    const generation4 =
      lookupMetricValue(queryResult, GENERATION_PANEL_GROUP_4_METRICS) / 1000;
    const generationRatio4 = generation4 / maxMWh;

    return {
      num: 4,
      records: [
        {
          name: 'PANL-G001',
          ids: '1 - 5,000',
          warning: this.getPanelWarningType(nBrokenPanel1),
          generation: generation1,
          level: this.getGenerationLevel(generationRatio1),
          brokenPanels: nBrokenPanel1,
          generationRatio: generationRatio1,
          activePanels: nActivePanel1,
        },

        {
          name: 'PANL-G002',
          ids: '5,001 - 10,000',
          warning: this.getPanelWarningType(nBrokenPanel2),
          generation: generation2,
          level: this.getGenerationLevel(generationRatio2),
          brokenPanels: nBrokenPanel2,
          generationRatio: generationRatio2,
          activePanels: nActivePanel2,
        },
        {
          name: 'PANL-G003',
          ids: '10,001 - 15,000',
          warning: this.getPanelWarningType(nBrokenPanel3),
          generation: generation3,
          level: this.getGenerationLevel(generationRatio3),
          brokenPanels: nBrokenPanel3,
          generationRatio: generationRatio3,
          activePanels: nActivePanel3,
        },
        {
          name: 'PANL-G004',
          ids: '15,001 - 20,000',
          warning: this.getPanelWarningType(nBrokenPanel4),
          generation: generation4,
          level: this.getGenerationLevel(generationRatio4),
          brokenPanels: nBrokenPanel4,
          generationRatio: generationRatio4,
          activePanels: nActivePanel4,
        },
      ],
    };
  }

  private getPanelWarningType(nBrokenPanel: number): IPanelWarning {
    if (nBrokenPanel === 0) {
      return EnumPanelWarning.none;
    }
    if (nBrokenPanel === totalPanelEachGroup) {
      return EnumPanelWarning.offline;
    }
    if (nBrokenPanel > 0 && nBrokenPanel < totalPanelEachGroup) {
      return EnumPanelWarning.broken;
    }

    return EnumPanelWarning.temperature;
  }

  private getGenerationLevel(generationRatio: number): IGenerationLevel {
    if (generationRatio === 0) {
      //0
      return EnumGenerationLevel.none;
    }
    if (generationRatio < 0.33) {
      //33%
      return EnumGenerationLevel.low;
    }
    if (generationRatio > 0.66) {
      //66%
      return EnumGenerationLevel.high;
    }
    return EnumGenerationLevel.medium;
  }
}
