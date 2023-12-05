import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import type { IDovu, SafeNumber } from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Dovu implements IDovu {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Unique()
  @Property({ type: 'string', nullable: false })
  signature: string;

  @Property({ type: 'string', nullable: false }) partnerIdentifier: string;

  @Property({ type: 'string', nullable: true }) customerReference: string;

  @Property({ type: 'string', nullable: false }) retirementTx: string;

  @Property({ type: 'number', nullable: false, default: 0 })
  retiredKgs: SafeNumber;

  @Property({ type: 'number', nullable: false, default: 0 })
  reserveRemainingKg: SafeNumber;

  @Property() createdAt: Date = new Date();

  @Property({ type: 'string', nullable: false }) stateProof: string;

  constructor() {
    this.id = uuidv4();
  }
}
