import { Migration } from '@mikro-orm/migrations';

export class Migration20230324160000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE "trustchain_mrv"
      ADD COLUMN IF NOT EXISTS reading_hashes varchar(255) NULL,
      ADD COLUMN IF NOT EXISTS raw_data json NULL,
      ADD COLUMN IF NOT EXISTS device_did varchar(255) NULL;
      `,
    );
  }
}
