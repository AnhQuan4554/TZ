/* eslint-disable camelcase */
import { promises as fs } from 'fs';
import { getTransactionByAccount } from './utils';

const handler = async ({
  accountId,
  network,
  output,
}: {
  accountId: string;
  network: string;
  output: string;
}): Promise<void> => {
  const mintedTransactions: any = await getTransactionByAccount(network, accountId, "TOKENMINT");
  console.log(mintedTransactions);
  console.table(
    mintedTransactions.map(
      ({ name, transaction_id, consensus_timestamp }: any) => ({
        name,
        transaction_id,
        consensus_timestamp,
      }),
    ),
  );
  if (output) {
    await fs.writeFile(output, JSON.stringify(mintedTransactions, null, 2));
  }
};
const command = 'minted-tokens';
const builder = {
  output: {
    alias: 'o',
    type: 'string',
    required: false,
  },
  network: {
    type: 'string',
    required: false,
    choices: ['mainnet', 'testnet'],
    default: 'testnet',
    description: "Networks: 'mainnet' or 'testnet'",
  },
  accountId: {
    type: 'string',
    required: true,
    description: 'Account ID of root authority (ex: 0.0.45912672)',
  },
};
const desc = 'List all minted token by user account id';
export { handler, command, builder, desc };
