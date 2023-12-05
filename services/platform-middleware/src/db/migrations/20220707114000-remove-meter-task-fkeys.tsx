import { Migration } from '@mikro-orm/migrations';

export class Migration20220707114000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter_task
      DROP CONSTRAINT IF EXISTS meter_task_site_fkey,
      DROP CONSTRAINT IF EXISTS meter_task_meter_fkey,
      DROP CONSTRAINT IF EXISTS meter_task_meter_job_fkey;
      `,
    );

    this.addSql(
      `
      ALTER TABLE meter_task
      ADD CONSTRAINT meter_task_site_fkey FOREIGN KEY (site_id) REFERENCES site(id) ON DELETE CASCADE,
      ADD CONSTRAINT meter_task_meter_job_fkey FOREIGN KEY (meter_job_id) REFERENCES meter_job(id) ON DELETE CASCADE;
      `,
    );
  }
}
