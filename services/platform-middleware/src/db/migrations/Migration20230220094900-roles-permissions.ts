import { Migration } from '@mikro-orm/migrations';

export class Migration20230220094900 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE public.role (
        name varchar(255) NOT NULL PRIMARY KEY,
        description varchar(255) NOT NULL ,
        tags text[] NOT NULL,
        permissions text[] NULL ,
        created_at timestamp NOT NULL,
        updated_at timestamp NOT NULL
      );
      `,
    );
  }
}
