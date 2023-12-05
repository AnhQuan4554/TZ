import { Migration } from '@mikro-orm/migrations';

export class Migration20221219161500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE IF NOT EXISTS data_flow
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar(255) not null,
            meter_id uuid not null,
            is_paused bool not null default true,
            start_iso_date_time varchar(27) not null,
            end_iso_date_time varchar(27) null,
            run_iso_date_time varchar(27) null,
            run_at timestamptz(0) null,
            run_status varchar(255) null,
            run_error varchar(255) null,
            run_delay_intervals int default 0 not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT data_flow_name_unique UNIQUE (name),
            CONSTRAINT meter_job_meter_fkey FOREIGN KEY (meter_id) REFERENCES meter
        );`,
    );

    this.addSql(
      `CREATE TABLE IF NOT EXISTS data_task
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            data_flow_id uuid not null,
            name varchar(255) not null,
            type varchar(255) not null,
            settings JSON NULL,
            depends_on JSON NULL,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT data_task_flow_fkey FOREIGN KEY (data_flow_id) REFERENCES data_flow
        );`,
    );
  }
}
