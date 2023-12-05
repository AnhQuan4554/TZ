import { Entity, JsonType, PrimaryKey, Property } from '@mikro-orm/core';
import { ITrustchainMRV } from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';

@Entity({ tableName: 'trustchain_mrv' })
export class TrustchainMRV extends BaseEntity implements ITrustchainMRV {
  @PrimaryKey()
  @Property()
  id: string;

  @Property()
  category: string;

  @Property()
  name: string;

  @Property()
  datetime: string;

  @Property()
  deviceDid: string;

  @Property()
  intervalStartDatetime: string;

  @Property()
  intervalEndDatetime: string;

  @Property()
  intervalDuration: number;

  @Property()
  intervalDurationUOM: string;

  @Property()
  value: number;

  @Property()
  valueUOM: string;

  @Property()
  emission: number;

  @Property()
  emissionUOM: string;

  @Property({ type: JsonType, nullable: false, fieldName: 'other_mrv_data' })
  otherMRVData: { [key: string]: number };

  @Property({ type: JsonType, nullable: false })
  rawData: { [key: string]: any };

  @Property()
  readingHashes: string;

  @Property()
  deviceId: string;

  @Property()
  siteId: string;

  @Property()
  tokenClassId: string;

  @Property()
  accountId: string;

  @Property()
  transactionId: string;
}
