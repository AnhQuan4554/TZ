import { Migration } from '@mikro-orm/migrations';

export class Migration20220809095500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_policy
      ADD COLUMN IF NOT EXISTS token_mint_value decimal(16,6) default 1.0 null;
      `,
    );
  }
}
