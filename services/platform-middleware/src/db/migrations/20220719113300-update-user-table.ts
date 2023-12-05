import { Migration } from '@mikro-orm/migrations';

export class Migration20220719113300 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS timeout int default 1800 null;
      `,
    );

    this.addSql(
      `
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS last_login timestamptz(0) null;
      `,
    );
  }
}
