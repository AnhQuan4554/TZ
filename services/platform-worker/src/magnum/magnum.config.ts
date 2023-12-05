const gridEmissionCo2eqFactor = 0.273876;
const gridEmissionCo2Factor = 0.272143;
const gridEmissionCh4Factor = 0.000025;
const gridEmissionN2oFactor = 0.000004;
const bioCharGasEmissionFactor = (0.3 / 509) * 1000;
const hismeltGasEmissionFactor = (0.25 / 509) * 1000 * 1000; // HIsmelt use KNm3 as unit

const gridConsumptionMetrics = [
  'biochar-dryer-input-electricity',
  'biochar-grinder-input-electricity',
  'biochar-pyrolyser-input-electricity',
  'ironore-crusher-input-electricity',
  'ironore-evf-input-electricity',
  'ironore-mill-input-electricity',
  'ironore-magsep-input-electricity',
  // Note: hismelt uses self-generated power. Not from the grid
  // 'hismelt-srv-input-electricity',
  // 'hismelt-charmill-input-electricity',
  // 'hismelt-ogc-input-electricity',
  // 'hismelt-boiler-input-electricity',
  // 'hismelt-oredryer-input-electricity',
  // 'hismelt-oxygenplant-input-electricity',
  // 'hismelt-compressor-input-electricity',
  // 'hismelt-hotblaststoves-input-electricity',
  // 'hismelt-otherusers-input-electricity',
  // 'hismelt-fgd-input-electricity',
];

export const gridEmissionCo2eqFactors: Record<string, number> =
  Object.fromEntries(
    gridConsumptionMetrics.map((m) => [m, gridEmissionCo2eqFactor]),
  );

export const gridEmissionCo2Factors: Record<string, number> =
  Object.fromEntries(
    gridConsumptionMetrics.map((m) => [m, gridEmissionCo2Factor]),
  );

export const gridEmissionCh4Factors: Record<string, number> =
  Object.fromEntries(
    gridConsumptionMetrics.map((m) => [m, gridEmissionCh4Factor]),
  );

export const gridEmissionN2oFactors: Record<string, number> =
  Object.fromEntries(
    gridConsumptionMetrics.map((m) => [m, gridEmissionN2oFactor]),
  );

export const gasEmissionFactors: Record<string, number> = {
  'hismelt-fgd-output-emissions': hismeltGasEmissionFactor,
  'biochar-pyrolyser-output-emissions': bioCharGasEmissionFactor,
};

export const carbonReductionFactors: Record<string, number> = {
  'hismelt-srv-input-char': 0.8 * 1000,
  'hismelt-srv-output-pig_iron': -0.04 * 1000,
  'biochar-pyrolyser-input-ground_biomass': 0.798 * 1000,
};
