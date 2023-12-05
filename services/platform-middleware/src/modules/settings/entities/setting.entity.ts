import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ISetting } from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Setting implements ISetting {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  value: string;

  @Property({ type: 'json', nullable: true })
  jsonValue: any;

  @Property({ nullable: true })
  description: string;

  @Property({ nullable: false })
  type: string;

  @Property({ nullable: true, fieldName: 'setting_group' })
  group?: string;

  @Property({ nullable: true })
  readOnly?: boolean;

  constructor() {
    this.id = uuidv4();
  }
}
