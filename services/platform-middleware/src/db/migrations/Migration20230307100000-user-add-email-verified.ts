import { Migration } from '@mikro-orm/migrations';

export class Migration20230307100000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS email_verified boolean default false;
      `,
    );
  }
}
