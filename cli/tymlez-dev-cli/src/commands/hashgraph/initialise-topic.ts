import { createFile, createTopic } from './utils/hedera';

// usage: tymlez-cli hashgraph initialise-topic --accountId=0.0.45912677  --privateKey=[]
const handler = async ({
  network,
  accountId,
  privateKey,
  count,
}: {
  topic: string;
  network: string;
  accountId: string;
  privateKey: string;
  count: number;
}): Promise<void> => {
  const outputs: { [x: string]: string } = {};
  for (let index = 1; index <= count; index++) {
    const memo = `ESG Hello World ${index}`;
    // eslint-disable-next-line no-await-in-loop
    const topicId = await createTopic(network, accountId, privateKey, memo);
    if (topicId) {
      outputs[topicId] = `${topicId}\t${memo}\tCarbon / ESG\tTYMLEZ`;
    }
  }
  const fileContent = Object.values(outputs).join('\n');
  const fileID = await createFile(network, accountId, privateKey, fileContent);

  console.log('Output', { fileID, topicIds: Object.keys(outputs) });
  console.log(fileContent);
};
const command = 'initialise-topic';
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
  count: {
    type: 'number',
    required: false,
    default: 2,
    description: 'Number of topic to created',
  },
  publicKey: {
    type: 'string',
    required: false,
    default: '',
    description: 'Public key to attach to file content',
  },
};
const desc = 'Create initialise topic id and file-id';
export { handler, command, builder, desc };
