import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import type { IDataTask } from '@tymlez/platform-api-interfaces';
import { BaseEntity } from '../../../libs/BaseEntity';
import { DataFlow } from '../../data-flow/entities/data-flow.entity';

@Entity()
export class DataTask extends BaseEntity implements IDataTask {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property()
  type: string;

  @Property({ type: 'json', nullable: true })
  settings?: Record<string, any>;

  @Property({ type: 'json', nullable: true })
  dependsOn?: DataTask[];

  @ManyToOne('DataFlow')
  dataFlow!: DataFlow;

  constructor() {
    super();
    this.id = uuidv4();
  }
}
