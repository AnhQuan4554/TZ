import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ITenancy } from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../../libs/BaseEntity';
import { Meter } from '../../meter/entities/meter.entity';

@Entity()
export class Tenancy extends BaseEntity implements ITenancy {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property({ type: 'string', nullable: false }) @Unique() name: string;

  @ManyToOne(() => Meter, { eager: true })
  meter: Meter;

  @Property({ type: 'boolean', nullable: false })
  visible: boolean;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
