import { Migration } from '@mikro-orm/migrations';

export class Migration20230314130000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE public.trustchain_token (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        token_class_id varchar(255) NOT NULL,
        token_symbol varchar(255) NOT NULL,
        value numeric(16, 6) NULL,
        value_uom varchar(255) NULL,
        account_id varchar(255) NULL,
        transaction_datetime varchar(255) NULL,
        consensus_datetime varchar(255) NOT NULL,
        consensus_timestamp varchar(255) NOT NULL,
        transaction_id varchar(255) NULL,
        message_id varchar(255) NULL,
        token_mint_info json NULL,
        policy_info json NULL,
        site json NULL,
        project json NULL,
        devices json NULL,
        installers json NULL,
        mrv_summary json NULL,
        vp_info json NULL,
        created_by varchar(255) NULL,
        created_at timestamptz(0) not null,
        updated_at timestamptz(0) not null,
        tags text[] not null,
        CONSTRAINT unique_transaction_id UNIQUE (transaction_id)
      );

      CREATE INDEX idx_account_class_datetime ON public.trustchain_token (account_id, consensus_datetime, token_class_id);

      CREATE INDEX idx_createdby_datetime ON public.trustchain_token (account_id, created_by, consensus_datetime);
      `,
    );

    this.addSql(
      `
      CREATE TABLE public.trustchain_mrv (
        id uuid PRIMARY KEY NOT NULL,
        name varchar(255) NULL,
        datetime varchar(255) NULL,
        device_id varchar(255) NULL,
        interval_start_datetime varchar(255) NULL,
        interval_end_datetime varchar(255) NULL,
        interval_duration integer NULL,
        interval_duration_uom varchar(255) NULL,
        value numeric(16, 6) NULL,
        value_uom varchar(255) NULL,
        emission numeric(16, 6) NULL,
        emission_uom varchar(255) NULL,
        other_mrv_data json NULL,
        site_id varchar(255) NULL,
        token_class_id varchar(255) NOT NULL,
        account_id varchar(255) NOT NULL,
        transaction_id varchar(255) NOT NULL,
        created_at timestamptz(0) not null,
        updated_at timestamptz(0) not null,
        tags text[] not null
      );

      CREATE INDEX idx_mrv_tokenid_datetime ON public.trustchain_mrv (transaction_id, datetime);
      `,
    );
  }
}
