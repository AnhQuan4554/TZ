import { Migration } from '@mikro-orm/migrations';

export class Migration20220702225700 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS guardian_site
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar(255) not null,
            lat double precision not null,
            lng double precision not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            is_published boolean not null,
            CONSTRAINT guardian_site_name_unique UNIQUE (name)
        );
      `,
    );
  }
}
