import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import type { IRole } from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity implements IRole {
  @PrimaryKey()
  @Unique()
  name: string;

  @Property()
  description: string;

  @Property()
  permissions: string[];

  @ManyToMany(() => User)
  users: Collection<User> = new Collection<User>(this);

  constructor() {
    super();
  }
}
