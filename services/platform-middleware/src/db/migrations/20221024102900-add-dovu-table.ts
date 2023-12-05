import { Migration } from '@mikro-orm/migrations';

export class Migration20221024102900 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      CREATE TABLE IF NOT EXISTS dovu
        (            
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),           
            signature varchar(255) not null,
            partner_identifier varchar(255) not null,
            customer_reference varchar(255) null,
            retirement_tx varchar(255) not null,
            retired_kgs integer not null,
            reserve_remaining_kg integer not null,
            created_at timestamptz(0) not null,
            state_proof varchar(255)
        );
      `,
    );
  }
}
