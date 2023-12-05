import { promises as fs } from 'fs';
import { getMessageByTimestamp, getMessageTransaction } from './utils';

// usage:  tymlez-cli hashgraph minted-tokens  --account-id=0.0.45912672

const handler = async ({
  transaction,
  network,
  output,
}: {
  transaction: string;
  network: string;
  output: string;
}): Promise<void> => {
  const {
    data: { transactions },
  }: any = await getMessageTransaction(network, transaction);
  const message = transactions[0];
  const vpMesage = await getMessageByTimestamp(network, message.memo);
  console.log(message, vpMesage);
  if (output) {
    await fs.writeFile(output, JSON.stringify(vpMesage, null, 2));
  }
};
const command = 'vp';
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

  transaction: {
    type: 'string',
    required: true,
    description: 'transaction id (example: 0.0.45912672-1654576206-488465929)',
  },
};
const desc = 'Get VP documents from message id';
export { handler, command, builder, desc };
