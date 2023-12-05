import { Migration } from '@mikro-orm/migrations';

export class Migration20230220124100 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE public.role_users (
        role_name varchar(255) NOT NULL,
        user_id uuid NOT NULL
      );
      `,
    );
  }
}
