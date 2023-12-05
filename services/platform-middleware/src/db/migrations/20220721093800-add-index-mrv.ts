import { Migration } from '@mikro-orm/migrations';

export class Migration20220721093800 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_mrv_reading_id ON guardian_mrv(reading_id);`,
    );

    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_mrv_sent ON guardian_mrv(sent);`,
    );

    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_mrv_interval_start_date_time ON guardian_mrv(interval_start_date_time);`,
    );

    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_mrv_interval_end_date_time ON guardian_mrv(interval_end_date_time);`,
    );
  }
}
