import { Migration } from '@mikro-orm/migrations';

export class Migration20220615152200 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter_job
      DROP COLUMN IF EXISTS last_task_id,
      Add COLUMN IF NOT EXISTS current_task_id int NULL;
      `,
    );
  }
}
