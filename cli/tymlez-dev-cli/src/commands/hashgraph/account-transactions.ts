import { promises as fs } from 'fs';
import { getTransactionByAccount } from './utils';
// usage: ymlez-cli hashgraph account-transactions --account-id=0.0.45912672

const handler = async ({
  accountId,
  network,
  output,
}: {
  accountId: string;
  network: string;
  output: string;
}): Promise<void> => {
  const messages: any = await getTransactionByAccount(network, accountId);
  console.log(messages);
  console.table(
    messages.map(
      ({
        transaction_id,
        name,
        consensus_timestamp,
        result,
        charged_tx_fee,
      }: any) => ({
        transaction_id,
        name,
        consensus_timestamp,
        result,
        charged_tx_fee,
      }),
    ),
  );
  if (output) {
    await fs.writeFile(output, JSON.stringify(messages, null, 2));
  }
};
const command = 'account-transactions';
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
    description: 'Account ID',
  },
};
const desc = 'List all transaction for  given account';
export { handler, command, builder, desc };
