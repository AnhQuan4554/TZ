import { Migration } from '@mikro-orm/migrations';

export class Migration20220702225300 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE site
      DROP COLUMN IF EXISTS is_published;
      `,
    );
  }
}
