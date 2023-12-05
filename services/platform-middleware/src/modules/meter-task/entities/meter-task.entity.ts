import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import type {
  IMeter,
  IMeterJob,
  IMeterTask,
  IMeterTaskStage,
  IMeterTaskStatus,
  ISite,
  IIsoDate,
} from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';

@Entity()
export class MeterTask extends BaseEntity implements IMeterTask {
  @PrimaryKey()
  id!: number;

  @Property()
  stage!: IMeterTaskStage;

  @Property()
  isoDateTime!: IIsoDate;

  @Property()
  status!: IMeterTaskStatus;

  @Property({ nullable: true })
  error?: string;

  @Property()
  retries?: number;

  @ManyToOne('MeterJob')
  meterJob!: IMeterJob;

  @ManyToOne('Meter')
  meter!: IMeter;

  @ManyToOne('Site')
  site!: ISite;
}
