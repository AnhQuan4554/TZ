import { Property } from '@mikro-orm/core';

export class CreateMRVDto {
  @Property({ nullable: false })
  deviceId: string;

  @Property({ nullable: false })
  readingId: string;

  @Property({ nullable: false })
  readingDate: string;

  @Property({ nullable: false })
  intervalStartDateTime: string;

  @Property({ nullable: false })
  intervalEndDateTime: string;

  @Property({ nullable: false })
  intervalDuration: number;

  @Property({ nullable: false })
  intervalDurationUOM: string;

  @Property({ nullable: false })
  value: number;

  @Property({ nullable: false })
  valueUOM: string;

  @Property({ nullable: false })
  quality: string;

  @Property({ nullable: false, fieldName: 'green_house_gas_emissions_scope' })
  greenhouseGasEmissionsScope: string;

  @Property({ nullable: false, fieldName: 'green_house_gas_emissions_source' })
  greenhouseGasEmissionsSource: string;

  @Property({ nullable: false, fieldName: 'co2_emissions' })
  CO2Emissions: number;

  @Property({ nullable: false, fieldName: 'co2_eq_emissions' })
  CO2eqEmissions: number;

  @Property({ nullable: false, fieldName: 'co2_emissions_tymlez' })
  CO2eqEmissionsTYMLEZ: number;

  @Property({ nullable: false })
  emissionsUOM: string;

  @Property({ nullable: false, fieldName: 'co2_eq_formula' })
  CO2eqFormula: string;

  @Property({ nullable: true, fieldName: 'co2_eq_formula_link' })
  CO2eqFormulaLink?: string;

  @Property({ nullable: true, fieldName: 'other_mrv_data' })
  otherMRVData: string;

  @Property({ nullable: true, default: 'realtime' })
  dataSourceType?: string;

  @Property({ type: 'json', nullable: true })
  documentProof?: any;
}
