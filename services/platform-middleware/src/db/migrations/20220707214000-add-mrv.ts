import { Migration } from '@mikro-orm/migrations';

export class Migration20220707214000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter_job
      ADD COLUMN IF NOT EXISTS type varchar(255) NOT NULL DEFAULT '';
      `,
    );
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS guardian_mrv
        (
            id BIGSERIAL PRIMARY KEY,
            device_id varchar(255) not null,
            reading_id varchar(255) not null,
            reading_date varchar(255) not null,
            interval_start_date_time varchar(255) not null,
            interval_end_date_time varchar(255) not null,
            interval_duration integer not null,
            value decimal(16,6) not null,
            value_uom varchar(255) not null,
            quality varchar(255) not null,
            green_house_gas_emissions_scope varchar(255) not null,
            green_house_gas_emissions_source varchar(255) not null,
            co2_emissions decimal(16,6) not null,
            co2_emissions_tymlez decimal(16,6) not null,
            emissions_uom varchar(255) not null,
            co2eq_forumla text null,
            co2eq_forumla_link text null,
            source_data json not null,
            other_mrv_data json not null,
            validated boolean null,
            validation_error text null,
            sent boolean not null default false,
            send_error text null
        );
      `,
    );
  }
}
