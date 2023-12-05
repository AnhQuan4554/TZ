import { Migration } from '@mikro-orm/migrations';

export class Migration20221103103100 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE setting
      ADD COLUMN IF NOT EXISTS read_only boolean default false null;
      `,
    );
  }
}
