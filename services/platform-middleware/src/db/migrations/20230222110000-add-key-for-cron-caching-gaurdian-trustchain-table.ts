import { Migration } from '@mikro-orm/migrations';

export class Migration20230222110000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_trustchain
      ADD COLUMN IF NOT EXISTS caching_method varchar(255) null;
      `,
    );
  }
}
