import {
  Client,
  TopicCreateTransaction,
  FileCreateTransaction,
  FileContentsQuery,
  TokenInfoQuery,
} from '@hashgraph/sdk';

export async function createTopic(
  network: string,
  accountId: string,
  privateKey: string,
  memo: string,
) {
  let client: Client;
  if (network === 'mainnet') {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }
  client.setOperator(accountId, privateKey);

  const transaction = new TopicCreateTransaction({ topicMemo: memo });
  const txResponse = await transaction.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const newTopicId = receipt.topicId;
  console.log(`The new topic ID is ${newTopicId}`);
  // create topic

  return newTopicId?.toString();
}

export async function createFile(
  network: string,
  accountId: string,
  privateKey: string,
  contents: string,
) {
  let client: Client;
  if (network === 'mainnet') {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }
  client.setOperator(accountId, privateKey);

  const transaction = new FileCreateTransaction({
    contents,
    fileMemo: 'TYMLEZ Hedera ESG Ecosystem Discovery',
  });
  const txResponse = await transaction.execute(client);
  const receipt = await txResponse.getReceipt(client);
  // create topic
  return receipt.fileId?.toString();
}

export async function getFile(
  network: string,
  accountId: string,
  privateKey: string,
  fileId: string,
) {
  let client: Client;
  if (network === 'mainnet') {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }
  client.setOperator(accountId, privateKey);

  const transaction = new FileContentsQuery({ fileId });
  const txResponse = await transaction.execute(client);
  return Buffer.from(txResponse).toString();
}

export async function getTokenDetailsByTokenId(
  network: string,
  accountId: string,
  tokenId: string,
  privateKey: string
) {
  let client: Client;
  if (network === 'mainnet') {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }
  client.setOperator(accountId, privateKey);

  const tokenQuery = new TokenInfoQuery().setTokenId(tokenId);
  const tokenDetails = await tokenQuery.execute(client);

  return tokenDetails;
}

