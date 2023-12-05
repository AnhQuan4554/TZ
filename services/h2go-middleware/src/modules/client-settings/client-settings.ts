import type { IProcess } from '../../interface';
import { MetricNames } from '../worker/constants';

export class ClientSettings {
  static ALL_METRICS = Object.values(MetricNames);

  static WATER_INPUT_METRICS = [
    MetricNames.WATER_TREATMENT_WATER_INPUT,
    MetricNames.ELECTOLYSER_WATER_INPUT,
  ];

  static GRID_ELECTRICITY_METRICS = [
    MetricNames.WATER_TREATMENT_ELECTRICITY_INPUT,
    MetricNames.ELECTOLYSER_ELECTRICITY_INPUT,
    MetricNames.GAS_PURIFICATION_ELECTRICITY_INPUT,
    MetricNames.COMPRESSION_ELECTRICITY_INPUT,
  ];

  static SOLAR_ELECTRICITY_METRICS = [
    MetricNames.WATER_TREATMENT_SOLAR_INPUT,
    MetricNames.ELECTOLYSER_SOLAR_INPUT,
    MetricNames.GAS_PURIFICATION_SOLAR_INPUT,
    MetricNames.COMPRESSION_SOLAR_INPUT,
  ];

  static HYDROGEN_DELIVERED_METRICS = [MetricNames.ELECTOLYSER_HYDROGEN_OUTPUT];

  static OXYGEN_DELIVERED_METRICS = [MetricNames.ELECTOLYSER_OXYGEN_OUTPUT];

  static CARBON_EMISSION_METRICS = [MetricNames.CO2_EMISSIONS];

  static CARBON_ABATEMENT_METRICS = [MetricNames.CO2_REDUCTION];

  static PRODUCTION_PROCESS: IProcess[] = [
    {
      name: 'Water & Alkaline Treatment',
      group: 'Production Process',
      step: 1,
      metrics: [
        {
          label: 'Energy consumption',
          keys: [
            MetricNames.WATER_TREATMENT_ELECTRICITY_INPUT,
            MetricNames.WATER_TREATMENT_SOLAR_INPUT,
            MetricNames.WATER_TREATMENT_WATER_INPUT,
          ],
          uom: 'kWh',
          value: 0,
        },
        {
          label: 'Carbon emission',
          keys: [MetricNames.WATER_TREATMENT_WATER_EMISSIONS],
          uom: 'kg',
          value: 0,
        },
      ],
    },
    {
      name: 'Electrolysis',
      group: 'Production Process',
      step: 2,
      metrics: [
        {
          label: 'Energy consumption',
          keys: [
            MetricNames.ELECTOLYSER_ELECTRICITY_INPUT,
            MetricNames.ELECTOLYSER_SOLAR_INPUT,
            MetricNames.ELECTOLYSER_WATER_INPUT,
          ],
          uom: 'kWh',
          value: 0,
        },
        {
          label: 'Carbon emission',
          keys: [MetricNames.ELECTOLYSER_CO2_EMISSION],
          uom: 'kg',
          value: 0,
        },
      ],
    },
    {
      name: 'Gas Purification',
      group: 'Production Process',
      step: 3,
      metrics: [
        {
          label: 'Energy consumption',
          keys: [
            MetricNames.GAS_PURIFICATION_ELECTRICITY_INPUT,
            MetricNames.GAS_PURIFICATION_SOLAR_INPUT,
            MetricNames.GAS_PURIFICATION_HYDROGEN_INPUT,
          ],
          uom: 'kWh',
          value: 0,
        },
        {
          label: 'Carbon emission',
          keys: [MetricNames.GAS_PURIFICATION_EMISSIONS],
          uom: 'kg',
          value: 0,
        },
      ],
    },
    {
      name: 'Compression',
      group: 'Production Process',
      step: 4,
      metrics: [
        {
          label: 'Energy consumption',
          keys: [
            MetricNames.COMPRESSION_ELECTRICITY_INPUT,
            MetricNames.COMPRESSION_SOLAR_INPUT,
            MetricNames.COMPRESSION_HYDROGEN_INPUT,
          ],
          uom: 'kWh',
          value: 0,
        },
        {
          label: 'Carbon emission',
          keys: [MetricNames.COMPRESSION_EMISSIONS],
          uom: 'kg',
          value: 0,
        },
      ],
    },
  ];

  static accumulativeFields = [
    MetricNames.WATER_TREATMENT_ELECTRICITY_INPUT,
    MetricNames.ELECTOLYSER_ELECTRICITY_INPUT,
    MetricNames.GAS_PURIFICATION_ELECTRICITY_INPUT,
    MetricNames.COMPRESSION_ELECTRICITY_INPUT,
    MetricNames.WATER_TREATMENT_SOLAR_INPUT,
    MetricNames.ELECTOLYSER_SOLAR_INPUT,
    MetricNames.GAS_PURIFICATION_SOLAR_INPUT,
    MetricNames.COMPRESSION_SOLAR_INPUT,
  ];

  static metricNameMappings: { [x: string]: string[] } = {
    waterSupplied: ClientSettings.WATER_INPUT_METRICS,
    electricitySupplied: ClientSettings.GRID_ELECTRICITY_METRICS,
    solarSupplied: ClientSettings.SOLAR_ELECTRICITY_METRICS,
    deliveredHydrogen: ClientSettings.HYDROGEN_DELIVERED_METRICS,
    deliveredOxygen: ClientSettings.OXYGEN_DELIVERED_METRICS,
    totalCarbonEmission: ClientSettings.CARBON_EMISSION_METRICS,
  };
}
