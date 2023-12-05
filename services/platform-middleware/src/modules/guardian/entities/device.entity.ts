import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import type { IDevice, IDoc } from '@tymlez/platform-api-interfaces';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../../libs/BaseEntity';
import { User } from '../../auth/entities/user.entity';
import { GuardianSite } from '../../guardian/entities/site.entity';
import { Installer } from './installer.entity';

@Entity()
export class Device extends BaseEntity implements IDevice {
  @PrimaryKey({ type: 'uuid' }) id: string;

  @Property()
  @Unique()
  deviceId: string;

  @ManyToOne(() => GuardianSite, { fieldName: 'site_id' })
  site: GuardianSite;

  @Property()
  deviceName: string;

  @Property()
  deviceType: string;

  @Property({ nullable: true })
  deviceDescription?: string;

  @Property({ nullable: true })
  make?: string;

  @Property({ nullable: true })
  model?: string;

  @Property()
  certificationExpiryDate: Date;

  @Property()
  serialNumber?: string;

  @Property({ type: 'json', nullable: true })
  otherDeviceData?: string;

  @Property({ type: 'json' })
  certification: IDoc;

  @ManyToOne(() => User)
  createdBy: User;

  @ManyToOne(() => Installer, { fieldName: 'installer_id' })
  installer: Installer;

  @Property()
  isPublished: boolean;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
