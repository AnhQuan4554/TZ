import { Migration } from '@mikro-orm/migrations';

export class Migration20220621104000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE meter
      Add COLUMN IF NOT EXISTS official_carbon_factor decimal default 0,
      Add COLUMN IF NOT EXISTS custom_carbon_factor decimal default 0;
      `,
    );
  }
}
