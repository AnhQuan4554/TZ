import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import type { IClient } from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';

@Entity()
export class Client extends BaseEntity implements IClient {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  @Unique()
  name: string;

  @Property()
  label: string;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
