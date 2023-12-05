import { Migration } from '@mikro-orm/migrations';

export class Migration0606000000 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
        SET search_path TO public;
        DROP EXTENSION IF EXISTS "uuid-ossp";
        CREATE EXTENSION "uuid-ossp" SCHEMA public;

        DROP EXTENSION IF EXISTS "pgcrypto";
        CREATE EXTENSION "pgcrypto" SCHEMA public;
    `);
  }
}
