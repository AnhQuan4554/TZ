import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export class IpfsFile {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  cid: string;

  @Property()
  url: string;

  @Property({ index: true, default: 'queue' })
  status: string;

  @Property({ nullable: true })
  storedUrl?: string;

  @Property({ nullable: true, default: 0 })
  retries?: number;

  @Property({ nullable: true })
  created: Date;

  @Property({ nullable: true })
  storedDate?: Date;

  @Property({ nullable: true })
  latency?: number;

  @Property({ nullable: true })
  error?: any;
}
