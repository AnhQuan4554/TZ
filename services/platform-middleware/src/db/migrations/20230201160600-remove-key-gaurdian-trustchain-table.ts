import { Migration } from '@mikro-orm/migrations';

export class Migration20230201160600 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            `
                ALTER TABLE guardian_trustchain
                DROP COLUMN IF EXISTS topic_messages;
            `,
        );
    }
}
