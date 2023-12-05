import { Migration } from '@mikro-orm/migrations';

export class Migration20220713224500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_mrv
      ADD COLUMN IF NOT EXISTS interval_duration_uom varchar(255) null;
      `,
    );

    this.addSql(
      `
      ALTER TABLE guardian_mrv
      ADD COLUMN IF NOT EXISTS co2_eq_emissions  decimal(16,6) default(0) not null;
      `,
    );

    this.addSql(
      `
      ALTER TABLE guardian_mrv
      RENAME COLUMN co2eq_forumla TO co2_eq_formula;
      `,
    );

    this.addSql(
      `
      ALTER TABLE guardian_mrv
      RENAME COLUMN co2eq_forumla_link TO co2_eq_formula_link;
      `,
    );

    this.addSql(
      `
      ALTER TABLE meter_data
      ADD COLUMN IF NOT EXISTS source_hash varchar(255) null;
      `,
    );
  }
}
