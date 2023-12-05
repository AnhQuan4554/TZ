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
  ISite,
  // UUID,
  ISiteMetaData,
} from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../../libs/BaseEntity';
import { Client } from '../../auth/entities/client.entity';

@Entity()
export class Site extends BaseEntity implements ISite {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  @Unique()
  name: string;

  @ManyToOne(() => Client)
  client: Client;

  @Property()
  label: string;

  @Property()
  address: string;

  @Property({ columnType: 'double precision' })
  lat: ILatitude;

  @Property({ columnType: 'double precision' })
  lng: ILongitude;

  @Property()
  timezone: string;

  @Property({ type: 'json', nullable: true })
  metaData: ISiteMetaData;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
