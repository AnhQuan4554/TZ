import { Migration } from '@mikro-orm/migrations';

export class Migration20220823141500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter_job
      ADD COLUMN IF NOT EXISTS settings JSON NULL;
      `,
    );
  }
}
