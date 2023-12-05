import { Migration } from '@mikro-orm/migrations';

export class Migration20221102141700 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE public.guardian_vp_document (
        id varchar(255) NOT NULL ,
        hash varchar(255) NOT NULL ,
        interval_start_date_time varchar(255) NULL ,
        interval_end_date_time varchar(255) NULL ,
        interval_duration int NULL ,
        value numeric(16, 6) NULL ,
        value_uom varchar(255) NULL ,
        co2_emissions numeric(16, 6) NULL ,
        co2_emissions_tymlez numeric(16, 6) NULL ,
        emissions_uom varchar(255) NULL ,
        interval_duration_uom varchar(255) NULL ,
        co2_eq_emissions numeric(16, 6) NULL DEFAULT 0,
        policy_tag varchar(255) NULL DEFAULT 'Tymlez_CET'::character varying,
        co2_eq_emissions_reduction numeric(16, 6) NULL ,
        co2_eq_emissions_reduction_tymlez numeric(16, 6) NULL ,
        emissions_reduction_uom varchar(255) NULL ,
        co2_eqemissions_reduction_formula varchar(255) NULL ,
        policy_id varchar(255) NULL ,
        transaction_Id varchar(255) NULL,
        memo varchar(255) NULL,
        trustchain_url varchar(255) NULL ,
        cache_date varchar(255) NULL,
        minted_date varchar(255) NULL,
        token_id varchar(255) NULL,
        other_data json NULL ,
        meta json NULL,
        record_type varchar(5) NOT NULL DEFAULT 'VP',
        CONSTRAINT guardian_vp_document_pkey PRIMARY KEY (id)
      );

      CREATE INDEX idx_vp_interval_end_date_time ON public.guardian_vp_document USING btree (interval_end_date_time);
      CREATE INDEX idx_vp_interval_start_date_time ON public.guardian_vp_document USING btree (interval_start_date_time);
      CREATE INDEX idx_vp_policy_tag ON public.guardian_vp_document USING btree (policy_tag);
      CREATE INDEX idx_vp_minted_date ON public.guardian_vp_document USING btree (minted_date);
      CREATE INDEX idx_vp_hash ON public.guardian_vp_document USING btree (hash);
      CREATE INDEX idx_vp_record_type ON public.guardian_vp_document USING btree (record_type);

      ALTER TABLE public.setting ALTER COLUMN value TYPE text USING value::text;

      `,
    );
  }
}
