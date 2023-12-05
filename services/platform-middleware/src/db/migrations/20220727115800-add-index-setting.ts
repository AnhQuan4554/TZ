import { Migration } from '@mikro-orm/migrations';

export class Migration20220727115800 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_setting_name ON setting(name);`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_setting_setting_group ON setting(setting_group);`,
    );
  }
}
