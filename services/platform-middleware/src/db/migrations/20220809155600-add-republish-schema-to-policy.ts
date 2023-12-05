import { Migration } from '@mikro-orm/migrations';

export class Migration20220809155600 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_policy
      ADD COLUMN IF NOT EXISTS republished_schema boolean default false null;
      `,
    );
  }
}
