import { createTopic } from './utils/hedera';

// usage: tymlez-cli hashgraph create-topic --accountId=0.0.45912677  --privateKey=[]
const handler = async ({
  network,
  accountId,
  privateKey,
  memo,
}: {
  topic: string;
  network: string;
  accountId: string;
  privateKey: string;
  memo: string;
}): Promise<void> => {
  const output = await createTopic(network, accountId, privateKey, memo);
  console.log('New topic ID', output);
};
const command = 'create-topic';
const builder = {
  accountId: {
    alias: 'a',
    type: 'string',
    description: 'Account ID',
    required: false,
  },
  network: {
    type: 'string',
    required: false,
    choices: ['mainnet', 'testnet'],
    default: 'testnet',
    description: "Networks: 'mainnet' or 'testnet'",
  },

  privateKey: {
    type: 'string',
    required: true,
    description: 'Privatekey',
  },

  memo: {
    type: 'string',
    required: true,
    description: 'Topic Memo',
  },
};
const desc = 'Create an topic on the network';
export { handler, command, builder, desc };
