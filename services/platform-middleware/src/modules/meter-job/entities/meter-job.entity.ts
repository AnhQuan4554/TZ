import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import type {
  IMeterJob,
  IMeterTask,
  IMeter,
  IIsoDate,
} from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';

@Entity()
export class MeterJob extends BaseEntity implements IMeterJob {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property()
  type: string;

  @Property({ default: true })
  isPaused: boolean;

  @Property({ fieldName: 'start_iso_date_time' })
  startISODateTime: IIsoDate;

  @Property({ fieldName: 'end_iso_date_time' })
  endISODateTime?: IIsoDate;

  @Property({ type: 'json', nullable: true })
  //, serializer: x=> x ? JSON.parse(x): {} })
  settings?: Record<string, any>;

  @Property({ type: 'json', nullable: true })
  //, serializer: x=> x ? JSON.parse(x): {} })
  runSettings?: Record<string, any>;

  @ManyToOne('MeterTask', { nullable: true })
  currentTask?: IMeterTask;

  @ManyToOne('Meter')
  meter!: IMeter;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
