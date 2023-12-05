import { MetricNames } from '../worker/constants';

export const totalPanelEachGroup = 5000;
export const maxMWh = 0.137041666667;

export class ClientSettings {
  static ALL_METRICS = Object.values(MetricNames);

  static FORECASTED_ENERGY_METRICS = [
    MetricNames.ARRAY_1_FORECAST_VALUE_OUTPUT,
    MetricNames.ARRAY_2_FORECAST_VALUE_OUTPUT,
    MetricNames.ARRAY_3_FORECAST_VALUE_OUTPUT,
    MetricNames.ARRAY_4_FORECAST_VALUE_OUTPUT,
  ];

  static GENERATION_METRICS = [
    MetricNames.ARRAY_1_OUTPUT,
    MetricNames.ARRAY_2_OUTPUT,
    MetricNames.ARRAY_3_OUTPUT,
    MetricNames.ARRAY_4_OUTPUT,
  ];

  static CARBON_ABATEMENT_METRICS = [
    MetricNames.ARRAY_1_CO2_REDUCTION,
    MetricNames.ARRAY_2_CO2_REDUCTION,
    MetricNames.ARRAY_3_CO2_REDUCTION,
    MetricNames.ARRAY_4_CO2_REDUCTION,
  ];

  static metricNameMappings: { [x: string]: string[] } = {
    generated: ClientSettings.GENERATION_METRICS,
    forecast: ClientSettings.FORECASTED_ENERGY_METRICS,
    abatement: ClientSettings.CARBON_ABATEMENT_METRICS,
  };

  static PANEL_METRICS = [
    MetricNames.ARRAY_1_PANEL_OUTPUT,
    MetricNames.ARRAY_2_PANEL_OUTPUT,
    MetricNames.ARRAY_3_PANEL_OUTPUT,
    MetricNames.ARRAY_4_PANEL_OUTPUT,
  ];

  static realtimeMetricNameMappings: { [x: string]: string[] } = {
    generated: ClientSettings.GENERATION_METRICS,
    panel: ClientSettings.PANEL_METRICS,
  };

  static PERFORMANCE_PERCENTAGE_METRICS = [
    MetricNames.ARRAY_1_PERFORMANCE_PERCENTAGE_OUTPUT,
    MetricNames.ARRAY_2_PERFORMANCE_PERCENTAGE_OUTPUT,
    MetricNames.ARRAY_3_PERFORMANCE_PERCENTAGE_OUTPUT,
    MetricNames.ARRAY_4_PERFORMANCE_PERCENTAGE_OUTPUT,
  ];

  static GENERATION_PANEL_GROUP_1_METRICS = [MetricNames.ARRAY_1_OUTPUT];
  static GENERATION_PANEL_GROUP_2_METRICS = [MetricNames.ARRAY_2_OUTPUT];
  static GENERATION_PANEL_GROUP_3_METRICS = [MetricNames.ARRAY_3_OUTPUT];
  static GENERATION_PANEL_GROUP_4_METRICS = [MetricNames.ARRAY_4_OUTPUT];

  static PANEL_GROUP_1_METRIC = [MetricNames.ARRAY_1_PANEL_OUTPUT];
  static PANEL_GROUP_2_METRIC = [MetricNames.ARRAY_2_PANEL_OUTPUT];
  static PANEL_GROUP_3_METRIC = [MetricNames.ARRAY_3_PANEL_OUTPUT];
  static PANEL_GROUP_4_METRIC = [MetricNames.ARRAY_4_PANEL_OUTPUT];

  static accumulativeFields = [];
}
