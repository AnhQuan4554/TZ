import { Migration } from '@mikro-orm/migrations';

export class Migration20221107110900 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS guardian_trustchain
        (            
            transaction_id varchar(255) PRIMARY KEY,           
            transaction_hash varchar(255) not null,
            name varchar(255) not null,
            entity_id varchar(255) not null,
            memo varchar(255) not null,
            consensus_timestamp varchar(255) not null,
            symbol varchar(255) not null,
            token_id varchar(255) not null,
            type varchar(255) not null,
            root_authority varchar(255) not null,
            admin_key json not null,
            vp_document varchar(255) not null,
            minted_token json not null,
            cached_timestamp timestamptz(0) not null,
            topic_id varchar(255) not null,
            topic_messages varchar(255) not null
        );
      `,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS idx_guardian_trustchain_transaction_id ON guardian_trustchain(transaction_id);`,
    );
  }
}
