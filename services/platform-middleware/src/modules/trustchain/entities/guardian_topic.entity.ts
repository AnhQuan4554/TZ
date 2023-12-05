import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import {
  IIsoDate,
  ITrustChainTopicRecord,
} from '@tymlez/platform-api-interfaces';

@Entity({ tableName: 'guardian_topic_message' })
export class GuardianTopic implements ITrustChainTopicRecord {
  @PrimaryKey()
  @Property()
  topicId: string;

  // Common Topic fields
  @Property({ nullable: false })
  messages: string;

  @Property({ nullable: false, default: Date.now() })
  cachedTimestamp: IIsoDate;
}
