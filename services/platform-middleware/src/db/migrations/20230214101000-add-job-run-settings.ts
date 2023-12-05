import { Migration } from '@mikro-orm/migrations';

export class Migration20230214101000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter_job
      ADD COLUMN IF NOT EXISTS run_settings JSON NULL;
      `,
    );
  }
}
