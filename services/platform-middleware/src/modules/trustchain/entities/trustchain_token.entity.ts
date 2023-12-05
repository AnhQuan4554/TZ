import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import {
  IGuardianSite,
  IGuardianMRVSummary,
  IGuardianPolicyInfo,
  IGuardianProject,
  IGuardianTokenMintInfo,
  IGuardianVPInfo,
  IGuardianInstaller,
  IGuardianDevice,
} from '@tymlez/trustchain-sdk';
import { ITrustchainToken } from '@tymlez/platform-api-interfaces';

import { BaseEntity } from '../../../libs/BaseEntity';

@Entity({ tableName: 'trustchain_token' })
export class TrustchainToken extends BaseEntity implements ITrustchainToken {
  @PrimaryKey()
  @Property()
  id: string;

  @Property()
  tokenClassId: string;

  @Property()
  tokenSymbol: string;

  @Property()
  value: number;

  @Property()
  valueUOM: string;

  @Property()
  accountId: string;

  @Property()
  transactionDatetime: string;

  @Property()
  consensusDatetime: string;

  @Property()
  consensusTimestamp: string;

  @Property()
  messageId: string;

  @Property()
  @Unique()
  transactionId: string;

  @Property({ type: 'json', nullable: false })
  tokenMintInfo: IGuardianTokenMintInfo;

  @Property({ type: 'json' })
  policyInfo: IGuardianPolicyInfo | undefined;

  @Property({ type: 'json' })
  site: IGuardianSite | undefined;

  @Property({ type: 'json' })
  project: IGuardianProject | undefined;

  @Property({
    type: 'json',
    nullable: false,
  })
  devices: { count: number; items: IGuardianDevice[] };

  @Property({
    type: 'json',
    nullable: false,
  })
  installers: { count: number; items: IGuardianInstaller[] };

  @Property({ type: 'json', nullable: false })
  mrvSummary: IGuardianMRVSummary;

  @Property({ type: 'json', nullable: false })
  vpInfo: IGuardianVPInfo;

  @Property()
  createdBy: string;
}
