import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import type {
  ILatitude,
  ILongitude,
  IGuardianSite,
} from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../../libs/BaseEntity';

@Entity()
export class GuardianSite extends BaseEntity implements IGuardianSite {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  @Unique()
  name: string;

  @Property({ columnType: 'double precision' })
  lat: ILatitude;

  @Property({ columnType: 'double precision' })
  lng: ILongitude;

  @Property()
  isPublished: boolean;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
