import { Migration } from '@mikro-orm/migrations';

export class Migration20230131123000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_policy
      ALTER COLUMN name TYPE varchar(255);
      `,
    );
  }
}
