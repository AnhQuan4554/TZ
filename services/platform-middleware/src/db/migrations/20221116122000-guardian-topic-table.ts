import { Migration } from '@mikro-orm/migrations';

export class Migration20221107110900 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS guardian_topic_message
        (            
            topic_id varchar(255) PRIMARY KEY,           
            messages varchar(255) not null,
            cached_timestamp timestamptz(0) not null
        );
      `,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_guardian_topic_message_topic_id ON guardian_topic_message(topic_id);`,
    );
  }
}
