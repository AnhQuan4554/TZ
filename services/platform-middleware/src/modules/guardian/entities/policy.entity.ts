import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import type { IPolicy } from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class GuardianPolicy implements IPolicy {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property()
  version: string;

  @Property()
  isPublished: boolean;

  @Property({
    nullable: true,
    fieldName: 'token_mint_value',
    type: 'decimal',
  })
  tokenMintValue: number;

  @Property({ nullable: true, fieldName: 'republished_schema' })
  republishedSchema: boolean;

  @Property({ type: 'json', nullable: true })
  content?: string;

  constructor() {
    this.id = uuidv4();
  }
}
