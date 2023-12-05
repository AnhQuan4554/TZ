import { Migration } from '@mikro-orm/migrations';

export class Migration20220623171500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE site
      DROP COLUMN IF EXISTS timezone_offset,
      ADD COLUMN IF NOT EXISTS timezone varchar(100) null;
      `,
    );
  }
}
