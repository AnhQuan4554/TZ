import { Migration } from '@mikro-orm/migrations';

export class Migration20220615105000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE site
      ADD COLUMN IF NOT EXISTS is_published boolean null;
      `,
    );
    this.addSql(
      `
      ALTER TABLE meter
      DROP CONSTRAINT IF EXISTS meter_site_fkey,
      ADD CONSTRAINT meter_site_fkey FOREIGN KEY (site_id) REFERENCES site;
      `,
    );

    this.addSql(
      `
      ALTER TABLE meter_job
      ALTER COLUMN last_task_id type uuid USING last_task_id::uuid,
      ALTER COLUMN last_task_id DROP NOT NULL;
      `,
    );
  }
}
