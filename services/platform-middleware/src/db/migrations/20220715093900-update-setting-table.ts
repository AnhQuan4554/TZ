import { Migration } from '@mikro-orm/migrations';

export class Migration20220715093900 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE setting
      ADD COLUMN IF NOT EXISTS type varchar(10) default('string') not null;
      `,
    );

    this.addSql(
      `
      ALTER TABLE setting
      ADD COLUMN IF NOT EXISTS setting_group varchar(15) null;
      `,
    );
  }
}
