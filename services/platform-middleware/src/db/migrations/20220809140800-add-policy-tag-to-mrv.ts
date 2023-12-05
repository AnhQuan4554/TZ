import { Migration } from '@mikro-orm/migrations';

export class Migration20220809140800 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_mrv
      ADD COLUMN IF NOT EXISTS policy_tag varchar(255) default 'Tymlez_CET' null;
      `,
    );
  }
}
