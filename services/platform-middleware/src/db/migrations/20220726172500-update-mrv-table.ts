import { Migration } from '@mikro-orm/migrations';

export class Migration20220726172500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      ALTER TABLE guardian_mrv
      ADD COLUMN IF NOT EXISTS data_source_type varchar(255) default 'realtime' null;
      `,
    );

    this.addSql(
      `ALTER TABLE guardian_mrv
      ADD COLUMN IF NOT EXISTS document_proof json null;
    `,
    );

    this.addSql(
      `
        ALTER TABLE guardian_mrv
        ADD COLUMN IF NOT EXISTS is_approved boolean default false null;
        `,
    );
  }
}
