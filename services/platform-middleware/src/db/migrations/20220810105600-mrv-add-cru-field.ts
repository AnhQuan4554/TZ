import { Migration } from '@mikro-orm/migrations';

export class Migration20220810105600 extends Migration {
  async up(): Promise<void> {
    console.log('Add CRU columns');
    this.addSql(
      `
      ALTER TABLE guardian_mrv
      ADD COLUMN IF NOT EXISTS co2_eq_emissions_reduction decimal(16,6) NULL;
      `,
    );

    this.addSql(
      `
        ALTER TABLE guardian_mrv
        ADD COLUMN IF NOT EXISTS co2_eq_emissions_reduction_tymlez decimal(16,6) NULL;
        `,
    );

    this.addSql(
      `
        ALTER TABLE guardian_mrv
        ADD COLUMN IF NOT EXISTS emissions_reduction_uom VARCHAR(255)  NULL;
        `,
    );

    this.addSql(
      `
        ALTER TABLE guardian_mrv
        ADD COLUMN IF NOT EXISTS co2_eqemissions_reduction_formula VARCHAR(255)  NULL;
        `,
    );

    this.addSql(
      `
        ALTER TABLE guardian_mrv
        ADD COLUMN IF NOT EXISTS co2_eq_emissions_reduction_formulalink VARCHAR(255)  NULL;
        `,
    );

    console.log('change CET columns to optional');

    this.addSql(`
        ALTER TABLE public.guardian_mrv ALTER COLUMN green_house_gas_emissions_scope DROP NOT NULL;
        ALTER TABLE public.guardian_mrv ALTER COLUMN green_house_gas_emissions_source DROP NOT NULL;
        ALTER TABLE public.guardian_mrv ALTER COLUMN co2_emissions DROP NOT NULL;
        ALTER TABLE public.guardian_mrv ALTER COLUMN co2_emissions_tymlez DROP NOT NULL;
        ALTER TABLE public.guardian_mrv ALTER COLUMN emissions_uom DROP NOT NULL;
    `);

    this.addSql(
      'CREATE INDEX idx_mrv_policy_tag ON public.guardian_mrv (policy_tag);',
    );
  }
}
