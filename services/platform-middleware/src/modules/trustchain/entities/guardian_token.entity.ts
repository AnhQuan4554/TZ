import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import {
  IIsoDate,
  ITrustChainTokenRecord,
} from '@tymlez/platform-api-interfaces';

@Entity({ tableName: 'guardian_trustchain' })
export class GuardianToken implements ITrustChainTokenRecord {
  @PrimaryKey()
  @Property()
  transactionId: string;

  // Common Token fields
  @Property({ nullable: false })
  transactionHash: string;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: false })
  entityId: string;

  @Property({ nullable: false })
  memo: string;

  @Property({ nullable: false })
  consensusTimestamp: string;

  @Property({ nullable: false })
  symbol: string;

  @Property({ nullable: false })
  tokenId: string;

  @Property({ nullable: false })
  type: string;

  @Property({ nullable: false })
  rootAuthority: string;

  @Property({ type: 'json', nullable: false })
  adminKey: any;

  @Property({ type: 'string', nullable: false })
  vpDocument: string;

  @Property({ type: 'json', nullable: false })
  mintedToken: any;

  @Property({ nullable: false, default: Date.now() })
  cachedTimestamp: IIsoDate;

  @Property({ type: 'string', nullable: false })
  topicId: string;

  @Property({ type: 'string', nullable: false })
  cachingMethod: string;
}
