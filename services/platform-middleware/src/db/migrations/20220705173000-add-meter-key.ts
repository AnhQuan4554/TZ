import { Migration } from '@mikro-orm/migrations';

export class Migration20220605173000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter
      ADD COLUMN IF NOT EXISTS key varchar(255) NOT NULL DEFAULT '';
      `,
    );
    this.addSql(
      `
      ALTER TABLE meter_task
      ALTER COLUMN error TYPE text;
      `,
    );
    this.addSql(
      `
      ALTER TABLE meter_data
      ADD COLUMN IF NOT EXISTS meter_key varchar(255) NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS interval int4 null,
      DROP COLUMN IF EXISTS meter_id;
      `,
    );

    this.addSql(`DROP INDEX IF EXISTS idx_meter_data_iso_date_time;`);
    this.addSql(`DROP INDEX IF EXISTS idx_meter_data_iso_date_time_hour;`);
    this.addSql(`DROP INDEX IF EXISTS idx_meter_data_iso_date_time_day;`);
    this.addSql(`DROP INDEX IF EXISTS idx_meter_data_iso_date_time_week;`);
    this.addSql(`DROP INDEX IF EXISTS idx_meter_data_iso_date_time_month;`);

    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_time ON meter_data(metric_name, iso_date_time);`,
    );

    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_time_key ON meter_data(metric_name, iso_date_time, meter_key);`,
    );

    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_time_tags ON meter_data(metric_name, iso_date_time, tags);`,
    );
  }
}
