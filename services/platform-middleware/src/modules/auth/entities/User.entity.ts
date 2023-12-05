import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  ManyToMany,
} from '@mikro-orm/core';
import type { IUser } from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';
import { Client } from './client.entity';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  name: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  roles: string[]; // Deprecated: We migrated to use many to many relationship in roles_user tabls

  @ManyToOne(() => Client)
  client: Client;

  @Property()
  timeout: number;

  @Property()
  emailVerified: boolean;

  @Property({ type: 'date', nullable: true })
  lastLogin?: Date;

  @ManyToMany(() => Role, 'users')
  userRoles: Role[];

  permissions?: string[];
  constructor() {
    super();
    this.id = uuidv4();
  }
}
