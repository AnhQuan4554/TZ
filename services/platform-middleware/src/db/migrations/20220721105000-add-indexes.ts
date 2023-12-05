import { Migration } from '@mikro-orm/migrations';

export class Migration20220721105000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_iso_date_time_hour ON meter_data(metric_name, iso_date_time_hour, meter_key);`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_iso_date_time_day ON meter_data(metric_name, iso_date_time_day, meter_key);`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_iso_date_time_week ON meter_data(metric_name, iso_date_time_week, meter_key);`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_data_iso_date_time_month ON meter_data(metric_name, iso_date_time_month, meter_key);`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_meter_task_status ON meter_task(status, iso_date_time);`,
    );
  }
}
