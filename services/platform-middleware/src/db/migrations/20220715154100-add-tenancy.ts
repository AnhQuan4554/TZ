import { Migration } from '@mikro-orm/migrations';

export class Migration20220715154100 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS tenancy
        (
            id uuid PRIMARY KEY,
            name varchar(255) not null,
            meter_id uuid not null,
            visible boolean not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT tenancy_meter_fkey FOREIGN KEY (meter_id) REFERENCES meter
        );
      `,
    );
  }
}
