import { promises as fs } from 'fs';
import { getMessageByTimestamp } from './utils';

// usage:  tymlez-cli hashgraph message  --timestamp=1655186144.959093000

const handler = async ({
  timestamp,
  network,
  output,
}: {
  timestamp: string;
  network: string;
  output: string;
}): Promise<void> => {
  const message = await getMessageByTimestamp(network, timestamp);
  console.log(message);
  if (output) {
    await fs.writeFile(output, JSON.stringify(message, null, 2));
  }
};
const command = 'message';
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

  timestamp: {
    type: 'string',
    required: true,
    description: 'Consensus timestamp(example: 1655186144.959093000)',
  },
};
const desc = 'Get VP documents from message id';
export { handler, command, builder, desc };
