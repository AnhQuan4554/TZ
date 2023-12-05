import { promises as fs } from 'fs';
import { TrustchainV2 } from '@tymlez/trustchain-sdk';

const handler = async ({
  output,
  network,
  hederaAccountId,
  startDatetime,
  endDatetime,
  maxNumTokens,
  tokenClassIds,
  includeStateProof,
}: {
  output: string;
  network: string;
  hederaAccountId: string;
  startDatetime: string;
  endDatetime: string;
  maxNumTokens: number;
  tokenClassIds: string;
  includeStateProof: boolean;
}): Promise<void> => {
  const startDate = new Date();
  const trustchainV2Sdk = new TrustchainV2(network);
  let tokenClasses;
  if (tokenClassIds) {
    tokenClasses = tokenClassIds.split(',');
  }
  const result = await trustchainV2Sdk.queryTokenMints({
    hederaAccountId,
    startDatetime,
    endDatetime,
    order: 'asc',
    maxNumTokens,
    tokenClassIds: tokenClasses || undefined,
    includeStateProof,
  });
  console.log(
    `Request Time Taken: ${
      (new Date().getTime() - startDate.getTime()) / 1000
    } seconds`,
  );

  if (output) {
    await fs.writeFile(output, JSON.stringify(result, null, 2));
  }
};

const command = 'get-tokens';
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
  hederaAccountId: {
    type: 'string',
    required: true,
    description: 'hedera account ID of the root authority',
  },
  startDatetime: {
    type: 'string',
    required: true,
    description: 'iso string (ex: 2023-02-01T00:00:00.000Z)',
  },
  endDatetime: {
    type: 'string',
    required: true,
    description: 'iso string (ex: 2023-02-01T00:00:00.000Z)',
  },
  maxNumTokens: {
    type: 'number',
    required: true,
    description: 'max number of tokens to be returned (ex: 2)',
  },
  tokenClassIds: {
    type: 'string',
    required: false,
    description:
      'Token class Id to filter tokens of particular class. Pass them comma seperated string (ex: "0.0.1234,0.0.1235")',
  },
  includeStateProof: {
    type: 'boolean',
    required: false,
    default: false,
    description: 'Boolean if state proof is required or not',
  },
};
const desc = '';
export { handler, command, builder, desc };
