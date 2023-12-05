export class ClientSettings {
  static timezone = 'Australia/Perth';
  static metricWaterPumped = 'water_pumped';
  static metricGensetEnergyGenerated = 'genset_energy_generated';
  static metricGensetFuelUsed = 'genset_fuel_used';
  static metricGensetCarbonEmission = 'genset_carbon_emission';
  static metricInverter1EnergyGenerated = 'inverter1_energy_generated';
  static metricInverter2EnergyGenerated = 'inverter2_energy_generated';
  static metricInvertersEnergyGenerated = 'inverters_energy_generated';
  static metricInvertersCarbonAbatement = 'inverters_carbon_abatement';

  static accumulativeFields = [
    ClientSettings.metricWaterPumped,
    ClientSettings.metricGensetFuelUsed,
  ];
}
