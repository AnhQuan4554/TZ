import { Migration } from '@mikro-orm/migrations';

export class Migration20220720093000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE "meter_task"
      DROP CONSTRAINT IF EXISTS unique_meter_task;
      `,
    );
    this.addSql(
      `
      ALTER TABLE "meter_task"
      ADD CONSTRAINT unique_meter_task UNIQUE (meter_job_id, iso_date_time);
      `,
    );
  }
}
