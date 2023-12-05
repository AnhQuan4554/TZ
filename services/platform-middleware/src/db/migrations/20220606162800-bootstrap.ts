import { Migration } from '@mikro-orm/migrations';

export class Migration0606162800 extends Migration {
  async up(): Promise<void> {

    this.addSql(
        `
        CREATE TABLE IF NOT EXISTS client
        (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name varchar(255) not null,
          label varchar(255) not null,
          created_at timestamptz(0) not null,
          updated_at timestamptz(0) not null,
          tags text[] not null,
          CONSTRAINT client_name_unique UNIQUE (name)
        );
        `,
    );

    this.addSql(
        `
        CREATE TABLE IF NOT EXISTS site
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar(255) not null,
            label varchar(255) not null,
            client_id uuid not null,
            address varchar(255) not null,
            lat double precision not null,
            lng double precision not null,
            timezone_offset integer not null default 0,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT site_name_unique UNIQUE (name),
            CONSTRAINT site_client_fkey FOREIGN KEY (client_id) REFERENCES client
        );
        `,
    );

    this.addSql(
      `
        CREATE TABLE IF NOT EXISTS "user"
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            email varchar(255) not null,
            name varchar(255) not null,
            password varchar(255) not null,
            client_id uuid not null,
            roles text[] not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT user_email_unique UNIQUE (email),
            CONSTRAINT user_client_fkey FOREIGN KEY (client_id) REFERENCES client
        );
      `,
    );


    this.addSql(
      `
        CREATE TABLE IF NOT EXISTS meter
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar(255) not null,
            site_id uuid not null,
            client_id uuid not null,
            device_id varchar(255) null,
            meter_type varchar(255) not null,
            lat double precision null,
            lng double precision null,
            interval int4 null,
            data_source text null,
            data_credentials text null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT meter_name_unique UNIQUE (name),
            CONSTRAINT meter_client_fkey FOREIGN KEY (client_id) REFERENCES client,
            CONSTRAINT meter_site_fkey FOREIGN KEY (client_id) REFERENCES site
        );
            `,
      );

      this.addSql(
        `
        CREATE TABLE IF NOT EXISTS meter_job
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            meter_id uuid not null,
            name varchar(255) not null,
            type varchar(255) not null,
            is_paused bool not null default true,
            start_iso_date_time varchar(27) not null,
            end_iso_date_time varchar(27) null,
            last_task_id varchar(255) not null,
            overwrite_data bool not null default true,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT meter_job_name_unique UNIQUE (name),
            CONSTRAINT meter_job_meter_fkey FOREIGN KEY (meter_id) REFERENCES meter
        );
        `,
      );

      this.addSql(
        `
        CREATE TABLE IF NOT EXISTS meter_task
        (
            id BIGSERIAL PRIMARY KEY,
            site_id uuid not null,
            meter_id uuid not null,
            meter_job_id uuid not null,
            type varchar(255) not null,
            status varchar(255) not null,
            retries integer not null default 0,
            error varchar(255) null,
            iso_date_time varchar(27) not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT meter_task_site_fkey FOREIGN KEY (site_id) REFERENCES site,
            CONSTRAINT meter_task_meter_fkey FOREIGN KEY (meter_id) REFERENCES meter,
            CONSTRAINT meter_task_meter_job_fkey FOREIGN KEY (meter_job_id) REFERENCES meter_job
        );
        `,
      );


      this.addSql(
        `
        CREATE TABLE IF NOT EXISTS meter_data
        (
            id BIGSERIAL PRIMARY KEY,
            meter_id uuid not null,
            metric_name varchar(255) not null,
            metric_value decimal null,
            iso_date_time varchar(27) not null,
            iso_date_time_hour varchar(27) not null,
            iso_date_time_day varchar(27) not null,
            iso_date_time_week varchar(27) not null,
            iso_date_time_month varchar(27) not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null,
            CONSTRAINT meter_data_meter_fkey FOREIGN KEY (meter_id) REFERENCES meter
        );
        `,
      );

      this.addSql(
        `CREATE INDEX idx_meter_data_iso_date_time ON meter_data(meter_id, metric_name, tags, iso_date_time, metric_value);`,
      );

      this.addSql(
        `CREATE INDEX idx_meter_data_iso_date_time_hour ON meter_data(meter_id, metric_name, tags, iso_date_time_hour, metric_value);`,
      );

      this.addSql(
        `CREATE INDEX idx_meter_data_iso_date_time_day ON meter_data(meter_id, metric_name, tags, iso_date_time_day, metric_value);`,
      );

      this.addSql(
        `CREATE INDEX idx_meter_data_iso_date_time_week ON meter_data(meter_id, metric_name, tags, iso_date_time_week, metric_value);`,
      );

      this.addSql(
        `CREATE INDEX idx_meter_data_iso_date_time_month ON meter_data(meter_id, metric_name, tags, iso_date_time_month, metric_value);`,
      );

      this.addSql(
        `
        CREATE TABLE IF NOT EXISTS installer
        (
            id uuid PRIMARY KEY,
            installer_id varchar(255) not null,
            installer_name varchar(255) not null,
            registration_country varchar(255) not null default '',
            business_registration_number varchar(255) not null default '',
            business_registration_number_type varchar(255) not null default '',
            business_registration_date date not null default now(),
            registered_office_address JSON NOT null default '{}'::json,
            business_type varchar(255) not null default '',
            primary_business_function varchar(255) not null default '',
            business_lead json not null default '{}'::json,
            website_link varchar(255) null,
            number_of_employees integer null,
            other_countries_of_operation varchar(255) null,
            other_related_entities varchar(255) null,
            shareholders varchar(255) null,
            balance_sheet_total varchar(255) null,
            operational_contact json null,
            lead_user_contact json null,
            finance_person_contact json null,
            certification json not null default '{}'::json,
            certification_expiry_date date not null default now(),
            is_published boolean null
        );
        `,
      );


      this.addSql(
        `
        CREATE TABLE IF NOT EXISTS device
          (
            id uuid PRIMARY KEY,
            device_id varchar(255) not null,
            installer_id  varchar(255) not null,
            site_id varchar(255) not null,
            device_type varchar(255) not null,
            device_name varchar(255) not null,
            device_description varchar(255)  null,
            make varchar(255)  null,
            model varchar(255)  null,
            certification json not null,
            serial_number varchar(255)  null,
            certification_expiry_date timestamptz(0),
            other_device_data json  null,
            created_by_id varchar(255),
            is_published boolean not null,
            created_at timestamptz(0) not null,
            updated_at timestamptz(0) not null,
            tags text[] not null
          );
        `,
      );

      this.addSql(
        `
        CREATE TABLE IF NOT EXISTS setting
        (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar(255) not null,
            value varchar(255) null,
            json_value json null,
            description varchar(255) null
        );
        `,
      );
  }
}
