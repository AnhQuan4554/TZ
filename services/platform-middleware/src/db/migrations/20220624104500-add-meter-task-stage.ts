import { Migration } from '@mikro-orm/migrations';

export class Migration20220624104500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter_task
      DROP COLUMN IF EXISTS type,
      ADD COLUMN IF NOT EXISTS stage varchar(100) null;
      `,
    );

    this.addSql(
      `
      ALTER TABLE meter_job
      DROP COLUMN IF EXISTS overwrite_data,
      DROP COLUMN IF EXISTS type;
      `,
    );

    this.addSql(
      `
      ALTER TABLE meter
      ADD COLUMN IF NOT EXISTS data_source_type varchar(100) null;
      `,
    );
  }
}
