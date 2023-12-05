import { Migration } from '@mikro-orm/migrations';

export class Migration202208005111000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS guardian_policy
        (
            id uuid PRIMARY KEY,
            name varchar(55) not null,
            version varchar(55) not null,
            is_published boolean not null,
            content json null
        );
      `,
    );
  }
}
