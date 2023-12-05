import { promises as fs } from 'fs';
import { getFile } from './utils/hedera';

// usage: tymlez-cli hashgraph get-file --fileId 0.0.46846927 --accountId=0.0.45912677  --privateKey=[]
const handler = async ({
  network,
  accountId,
  privateKey,
  fileId,
  output,
}: {
  network: string;
  accountId: string;
  privateKey: string;
  fileId: string;
  output: string;
}): Promise<void> => {
  const content = await getFile(network, accountId, privateKey, fileId);

  console.log(content);
  if (output) {
    await fs.writeFile(output, content);
  }
};
const command = 'get-file';
const builder = {
  accountId: {
    alias: 'a',
    type: 'string',
    description: 'Account ID',
    required: false,
  },
  fileId: {
    alias: 'f',
    type: 'string',
    description: 'File ID',
    required: true,
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
};
const desc = 'Create initialise topic id and file-id';
export { handler, command, builder, desc };
