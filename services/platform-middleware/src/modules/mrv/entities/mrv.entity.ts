import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { EnumPolicyTags } from '@tymlez/common-libs';

@Entity({ tableName: 'guardian_mrv' })
export class Mrv {
  @PrimaryKey()
  id: number;

  // Common MRV fields
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

  // CET fields
  @Property({ nullable: true, fieldName: 'green_house_gas_emissions_scope' })
  greenhouseGasEmissionsScope: string;

  @Property({ nullable: true, fieldName: 'green_house_gas_emissions_source' })
  greenhouseGasEmissionsSource: string;

  @Property({ nullable: true, fieldName: 'co2_emissions' })
  CO2Emissions: number;

  @Property({ nullable: true, fieldName: 'co2_eq_emissions' })
  CO2eqEmissions: number;

  @Property({ nullable: true, fieldName: 'co2_emissions_tymlez' })
  CO2eqEmissionsTYMLEZ: number;

  @Property({ nullable: true })
  emissionsUOM: string;

  @Property({ nullable: true, fieldName: 'co2_eq_formula' })
  CO2eqFormula: string;

  @Property({ nullable: true, fieldName: 'co2_eq_formula_link' })
  CO2eqFormulaLink?: string;

  /// CRU fields

  @Property({ nullable: true, fieldName: 'co2_eq_emissions_reduction' })
  CO2eqEmissionsReduction: number;

  @Property({ nullable: true, fieldName: 'co2_eq_emissions_reduction_tymlez' })
  CO2eqEmissionsReductionTYMLEZ: number;

  @Property({ nullable: true, fieldName: 'emissions_reduction_uom' })
  emissionsReductionUOM: string;

  @Property({ nullable: true, fieldName: 'co2_eqemissions_reduction_formula' })
  CO2eqEmissionsReductionFormula: string;

  @Property({
    nullable: true,
    fieldName: 'co2_eq_emissions_reduction_formulalink',
  })
  CO2eqEmissionsReductionFormulaLink: string;

  // Other common field
  @Property({ nullable: false, type: 'json' })
  sourceData: any;

  @Property({ nullable: true, fieldName: 'other_mrv_data', type: 'json' })
  otherMRVData: string;

  // Platform fields
  @Property({ nullable: true, default: false })
  validated: boolean;

  @Property({ nullable: true })
  validationError?: string;

  @Property({ nullable: true, default: false })
  sent?: boolean;

  @Property({ nullable: true })
  sendError?: string;

  @Property({ nullable: true, default: 'realtime' })
  dataSourceType?: string;

  @Property({ type: 'json', nullable: true })
  documentProof?: any;

  @Property({ nullable: true, default: false })
  isApproved?: boolean;

  @Property({ nullable: true, default: EnumPolicyTags.Tymlez_CET })
  policyTag?: string;
}
