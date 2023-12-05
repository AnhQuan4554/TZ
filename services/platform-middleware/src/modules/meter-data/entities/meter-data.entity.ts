import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import type { IIsoDate, IMeterData } from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';

@Entity()
export class MeterData extends BaseEntity implements IMeterData {
  @PrimaryKey()
  id: number;

  @Property()
  metricName: string;

  @Property()
  metricValue: number;

  @Property()
  interval: number;

  @Property()
  isoDateTime: IIsoDate;

  @Property()
  isoDateTimeHour: IIsoDate;

  @Property()
  isoDateTimeDay: IIsoDate;

  @Property()
  isoDateTimeWeek: IIsoDate;

  @Property()
  isoDateTimeMonth: IIsoDate;

  @Property()
  meterKey: string;

  @Property()
  sourceHash?: string;
}
