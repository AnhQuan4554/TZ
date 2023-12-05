import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import type { IDoc } from '@tymlez/platform-api-interfaces';
import { BaseGuardianEntity } from './baseGuardian.entity';

@Entity()
export class Installer extends BaseGuardianEntity {
  @PrimaryKey({ type: 'uuid' }) id: string;
  @Property() @Unique() installerId: string;
  @Property() installerName: string;

  @Property({ type: 'json' }) certification: IDoc;
  @Property() certificationExpiryDate: Date;

  @Property()
  isPublished: boolean;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
