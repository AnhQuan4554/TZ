export enum MetricNames {
  // water treatment
  WATER_TREATMENT_ELECTRICITY_INPUT = 'water_treatment.input.electricity',
  WATER_TREATMENT_SOLAR_INPUT = 'water_treatment.input.solar',
  WATER_TREATMENT_WATER_INPUT = 'water_treatment.input.water',
  WATER_TREATMENT_WATER_OUTPUT = 'water_treatment.output.hydrogen',
  WATER_TREATMENT_WATER_EMISSIONS = 'water_treatment.emissions',
  WATER_TREATMENT_WATER_REDUCTION = 'water_treatment.reduction',

  // Electolyser
  ELECTOLYSER_ELECTRICITY_INPUT = 'electrolyser.input.electricity',
  ELECTOLYSER_SOLAR_INPUT = 'electrolyser.input.solar',
  ELECTOLYSER_WATER_INPUT = 'electrolyser.input.water',
  ELECTOLYSER_HYDROGEN_OUTPUT = 'electrolyser.output.hydrogen',
  ELECTOLYSER_OXYGEN_OUTPUT = 'electrolyser.output.oxygen',
  ELECTOLYSER_CO2_EMISSION = 'electrolyser.carbon.emissions',
  ELECTOLYSER_CO2_REDUCTION = 'electrolyser.carbon.reduction',

  // Gas Purification
  GAS_PURIFICATION_ELECTRICITY_INPUT = 'gas_purification.input.electricity',
  GAS_PURIFICATION_SOLAR_INPUT = 'gas_purification.input.solar',
  GAS_PURIFICATION_HYDROGEN_INPUT = 'gas_purification.input.hydrogen',
  GAS_PURIFICATION_HYDROGEN_OUTPUT = 'gas_purification.output.hydrogen',
  GAS_PURIFICATION_EMISSIONS = 'gas_purification.emissions',
  GAS_PURIFICATION_REDUCTION = 'gas_purification.reduction',

  // Compressor

  COMPRESSION_ELECTRICITY_INPUT = 'compression.input.electricity',
  COMPRESSION_SOLAR_INPUT = 'compression.input.solar',
  COMPRESSION_HYDROGEN_INPUT = 'compression.input.hydrogen',
  COMPRESSION_HYDROGEN_OUTPUT = 'compression.output.hydrogen',
  COMPRESSION_EMISSIONS = 'compression.emissions',
  COMPRESSION_REDUCTION = 'compression.reduction',

  SOLAR_GENERATION = 'solar.generation',
  CO2_EMISSIONS = 'carbon.emissions',
  CO2_REDUCTION = 'carbon.reduction',
}
