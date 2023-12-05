/* eslint-disable camelcase */
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import type {
  ILatitude,
  ILongitude,
  IMeter,
  IMeterType,
  SafeNumber,
} from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../../libs/BaseEntity';
import { Client } from '../../auth/entities/client.entity';
import { Device } from '../../guardian/entities/device.entity';
import { Site } from '../../dashboard-site/entities/site.entity';

@Entity()
export class Meter extends BaseEntity implements IMeter {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  @Unique()
  key: string;

  @Property()
  @Unique()
  name: string;

  @ManyToOne(() => Site, { eager: true })
  site: Site;

  @ManyToOne(() => Device, { nullable: true })
  device?: Device;

  @Property({ type: 'string' })
  meterType: IMeterType;

  @Property({ columnType: 'double precision', nullable: true })
  lat?: ILatitude;

  @Property({ columnType: 'double precision', nullable: true })
  lng?: ILongitude;

  @Property({ type: 'number', nullable: true, default: 300 })
  interval: SafeNumber;

  @Property({ type: 'string', nullable: false })
  dataSourceType: string;

  @Property({ type: 'string', nullable: false })
  dataSource: string;

  @Property({ type: 'number', nullable: true, default: 0 })
  dataDelaySec: SafeNumber;

  @Property({ type: 'string', nullable: true })
  dataCredentials?: string;

  @Property({ type: 'number', nullable: true, default: 0 })
  officialCarbonFactor: SafeNumber;

  @Property({ type: 'number', nullable: true, default: 0 })
  customCarbonFactor: SafeNumber;

  @ManyToOne(() => Client)
  client: Client;

  @Property({ name: 'timezone' })
  getTimezone() {
    return this.site.timezone;
  }

  constructor() {
    super();
    this.id = uuidv4();
  }
}
