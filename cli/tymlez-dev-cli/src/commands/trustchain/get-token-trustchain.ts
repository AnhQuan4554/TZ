import { promises as fs } from 'fs';
import { TrustchainV2 } from '@tymlez/trustchain-sdk';

const handler = async ({
  output,
  network,
  messageId,
}: {
  output: string;
  network: string;
  messageId: string;
}): Promise<void> => {
  const startDate = new Date();
  const trustchainV2Sdk = new TrustchainV2(network);

  const result = await trustchainV2Sdk.getTokenMintTrustchainByTimestamp(
    messageId,
  );
  console.log(
    `Request Time Taken: ${
      (new Date().getTime() - startDate.getTime()) / 1000
    } seconds`,
  );

  if (output) {
    await fs.writeFile(output, JSON.stringify(result, null, 2));
  }
};

const command = 'get-token-trustchain';
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
  messageId: {
    type: 'string',
    required: true,
    description: 'token messageId (ex: 1677639826.063267003)',
  },
};
const desc = '';
export { handler, command, builder, desc };
