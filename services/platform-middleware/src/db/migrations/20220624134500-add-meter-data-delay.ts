import { Migration } from '@mikro-orm/migrations';

export class Migration20220624134500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter
      ADD COLUMN IF NOT EXISTS data_delay_sec integer not null default 0;
      `,
    );
  }
}
