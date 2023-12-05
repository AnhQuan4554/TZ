import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'guardian_vp_document' })
export class GuardianVpDocument {
  @PrimaryKey()
  id: string;

  @Property({ nullable: false })
  hash: string;

  @Property({ nullable: true })
  intervalStartDateTime?: string;

  @Property({ nullable: true })
  intervalEndDateTime?: string;

  @Property({ nullable: true })
  intervalDuration?: number;

  @Property({ nullable: true })
  intervalDurationUOM?: string;

  @Property({ nullable: true })
  value: number;

  @Property({ nullable: true })
  valueUOM?: string;

  @Property({ nullable: true, fieldName: 'co2_emissions' })
  CO2Emissions: number;

  @Property({ nullable: true, fieldName: 'co2_eq_emissions' })
  CO2eqEmissions: number;

  @Property({ nullable: true, fieldName: 'co2_emissions_tymlez' })
  CO2eqEmissionsTYMLEZ?: number;

  @Property({ nullable: true })
  emissionsUOM?: string;

  /// CRU fields

  @Property({ nullable: true, fieldName: 'co2_eq_emissions_reduction' })
  CO2eqEmissionsReduction: number;

  @Property({ nullable: true, fieldName: 'co2_eq_emissions_reduction_tymlez' })
  CO2eqEmissionsReductionTYMLEZ?: number;

  @Property({ nullable: true, fieldName: 'emissions_reduction_uom' })
  emissionsReductionUOM?: string;

  @Property({ nullable: true, fieldName: 'other_data', type: 'json' })
  otherData: any;

  @Property({ nullable: false, default: 'Tymlez_CET' })
  policyTag: string;

  @Property({ nullable: true })
  policyId?: string;

  @Property({ nullable: true })
  transactionId?: string;

  @Property({ nullable: true })
  trustchainUrl?: string;

  @Property({ nullable: true })
  memo?: string;

  @Property({ nullable: true })
  cacheDate: string;

  @Property({ nullable: true })
  mintedDate: Date;

  @Property({ nullable: true })
  tokenId: string;

  @Property({ nullable: true, type: 'json' })
  meta?: any;

  @Property({ nullable: false, default: 'VP' })
  recordType?: string;
}
