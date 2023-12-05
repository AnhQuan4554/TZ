import { Migration } from '@mikro-orm/migrations';

export class Migration20220621125500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE site
      ADD COLUMN IF NOT EXISTS meta_data json null;
      `,
    );
  }
}
