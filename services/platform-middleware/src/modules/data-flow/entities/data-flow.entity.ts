import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import type {
  IIsoDate,
  IDataFlow,
  IMeter,
} from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';
import { DataTask } from '../../data-task/entities/data-task.entity';

@Entity()
export class DataFlow extends BaseEntity implements IDataFlow {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property({ default: true })
  isPaused: boolean;

  @Property({ fieldName: 'start_iso_date_time' })
  startISODateTime: IIsoDate;

  @Property({ fieldName: 'end_iso_date_time', nullable: true })
  endISODateTime?: IIsoDate;

  @Property({ fieldName: 'run_iso_date_time', nullable: true })
  runISODateTime?: IIsoDate;

  @Property({ nullable: true })
  runStatus?: 'running' | 'ready' | 'complete' | 'error';

  @Property({ nullable: true })
  runError?: string;

  @Property()
  runDelayIntervals = 0;

  @ManyToOne('Meter')
  meter!: IMeter;

  @OneToMany(() => DataTask, (task) => task.dataFlow)
  dataTasks = new Collection<DataTask>(this);

  constructor() {
    super();
    this.id = uuidv4();
  }
}
