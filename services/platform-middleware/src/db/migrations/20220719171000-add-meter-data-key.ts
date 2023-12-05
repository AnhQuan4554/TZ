import { Migration } from '@mikro-orm/migrations';

export class Migration20220719171000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE "meter_data"
      DROP CONSTRAINT IF EXISTS unique_meter_data;
      `,
    );
    this.addSql(
      `
      ALTER TABLE "meter_data"
      ADD CONSTRAINT unique_meter_data UNIQUE (iso_date_time, meter_key, metric_name , tags, "interval");
      `,
    );
  }
}
