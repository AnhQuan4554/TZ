import { runAll, safeJsonParse } from '@tymlez/common-libs';
import axios from 'axios';
import { orderBy, range, sortBy } from 'lodash';
import { decodeBase64, encodeBase64 } from '../utils/base64';
import { isoToNanoSecondTimestamp } from '../utils/datetime';
import { getIpfsFileContentBuffer } from '../utils/ipfs';
import type {
  IGuardianVpDocument,
  IHederaAccountInfo,
  IHederaMessage,
  IHederaMessageContent,
  IHederaStateProof,
  IHederaTokenClass,
  IHederaTokenClassDetail,
  IHederaTokenNFTInfo,
  IHederaTransaction,
  IHederaTransactionRequest,
} from './interfaces';

function getHederaAPIHost(network = 'testnet') {
  if (network === 'mainnet') {
    return 'https://mainnet-public.mirrornode.hedera.com';
  }
  return 'https://testnet.mirrornode.hedera.com';
}

async function requestHederaAPI(url: string) {
  const { data } = await axios.get(url).catch((error) => {
    throw new Error(JSON.stringify(error));
  });

  return data;
}

export async function getAccountInfo(
  network: string,
  accountId: string,
): Promise<IHederaAccountInfo | undefined> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/accounts?account.id=${accountId}`;

  const data = await requestHederaAPI(url);

  return data?.accounts.length > 0 ? data?.accounts[0] : undefined;
}

export async function getTokenClasses(
  network: string,
  accountId: string,
): Promise<IHederaTokenClass[]> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/tokens?account.id=${accountId}`;

  const data = await requestHederaAPI(url);
  return data?.tokens || [];
}

export async function getTokenClassDetail(
  network: string,
  tokenClassId: string,
): Promise<IHederaTokenClassDetail> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/tokens/${tokenClassId}`;

  return await requestHederaAPI(url);
}

function decodeTransactionMemo(rawTxn: IHederaTransaction): IHederaTransaction {
  let cleanedMemo = '';

  if (rawTxn.memo_base64) {
    const decodedMemo = decodeBase64(rawTxn.memo_base64);

    // The memo field could contain extra data such as CDN url in addition to the message timestamp
    // e.g. "1674929955.026774003 ipfs-cdn=https://testnet.data.tymlez.com"
    [cleanedMemo] = decodedMemo.split(' ');
  }

  return {
    ...rawTxn,
    memo: cleanedMemo,
  };
}

export async function getTransaction(
  network: string,
  txnId: string,
): Promise<IHederaTransaction> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/transactions/${txnId}`;

  const data = await requestHederaAPI(url);

  const txn = data?.transactions.length > 0 ? data?.transactions[0] : undefined;

  return txn && decodeTransactionMemo(txn);
}

export async function getTransactions(
  request: IHederaTransactionRequest,
): Promise<{ transactions: IHederaTransaction[]; hasMore: boolean }> {
  const { network, accountId } = request;
  const maxNumTxns = request.maxNumTxns ?? Infinity;
  const order = request.order === 'asc' ? 'asc' : 'desc';
  const startTimestampInclusive = request.startTimestampInclusive ?? false;
  const endTimestampInclusive = request.startTimestampInclusive ?? true;

  const hederaHost = getHederaAPIHost(network);
  const hederaAPIEndpoint = new URL(`${hederaHost}/api/v1/transactions`);

  const batchSize = maxNumTxns > 100 ? 100 : maxNumTxns;
  hederaAPIEndpoint.searchParams.append('account.id', accountId);
  hederaAPIEndpoint.searchParams.append('limit', String(batchSize));
  hederaAPIEndpoint.searchParams.append('order', order);
  hederaAPIEndpoint.searchParams.append('result', 'SUCCESS');

  if (request.transactionType !== undefined) {
    hederaAPIEndpoint.searchParams.append(
      'transactionType',
      request.transactionType,
    );
  }

  if (request.startTimestamp !== undefined) {
    let nanoseconds = request.startTimestamp;
    if (request.timestampFormat === 'iso') {
      nanoseconds = isoToNanoSecondTimestamp(request.startTimestamp);
    }

    const startTimestampParam = startTimestampInclusive
      ? `gte:${nanoseconds}`
      : `gt:${nanoseconds}`;
    hederaAPIEndpoint.searchParams.append('timestamp', startTimestampParam);
  }

  if (request.endTimestamp !== undefined) {
    let nanoseconds = request.endTimestamp;
    if (request.timestampFormat === 'iso') {
      nanoseconds = isoToNanoSecondTimestamp(request.endTimestamp);
    }
    const endTimestampParam = endTimestampInclusive
      ? `lte:${nanoseconds}`
      : `lt:${nanoseconds}`;
    hederaAPIEndpoint.searchParams.append('timestamp', endTimestampParam);
  }

  let transactions: IHederaTransaction[] = [];
  let hasMore = false;

  let requestURL = hederaAPIEndpoint.href;

  while (requestURL) {
    // Disable eslint because we really want to run async loop one by one;
    /* eslint-disable no-await-in-loop */
    const data = await requestHederaAPI(requestURL);

    const decodedTransactions =
      data?.transactions?.map(decodeTransactionMemo) || [];

    const filteredTxns = request.transactionFilter
      ? decodedTransactions.filter(request.transactionFilter) || []
      : decodedTransactions;

    transactions.push(...filteredTxns);

    if (transactions.length >= maxNumTxns) {
      hasMore = true;
      requestURL = '';
      transactions = transactions.slice(0, maxNumTxns);
      break;
    } else if (transactions.length === maxNumTxns) {
      hasMore = data.links?.next !== undefined;
      requestURL = '';
      break;
    }

    if (data.links?.next) {
      requestURL = `${hederaHost}${data.links?.next}`;
    } else {
      requestURL = '';
    }
  }

  const sortedTransactions = orderBy(
    transactions,
    [(txn) => txn.consensus_timestamp],
    [order],
  );

  return { transactions: sortedTransactions, hasMore };
}

export async function getTransactionStateProof(
  network: string,
  transactionId: string,
): Promise<IHederaStateProof | undefined> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/transactions/${transactionId}/stateproof`;
  const data = await requestHederaAPI(url);

  return data as IHederaStateProof;
}

export async function getMessageByTopicIdAndSequenceNumber(
  network: string,
  topicId: string,
  sequenceNumber: number,
): Promise<IHederaMessage> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/topics/${topicId}/messages/${sequenceNumber}`;
  const message: IHederaMessage = await requestHederaAPI(url);

  return message;
}

export async function getMessageByConsensusTimestamp(
  network: string,
  timestamp: string,
): Promise<IHederaMessage> {
  const hederaHost = getHederaAPIHost(network);
  const url = `${hederaHost}/api/v1/topics/messages/${timestamp}`;

  const message: IHederaMessage = await requestHederaAPI(url);
  return message;
}

export async function getMessagesByTopicIdAndSequenceRange(
  network: string,
  topicId: string,
  startSeqence: number,
  numMessages: number,
): Promise<IHederaMessage[]> {
  const endSequence = startSeqence + numMessages;
  const seqences = range(startSeqence, endSequence);
  const messages: IHederaMessage[] = [];

  await runAll(seqences, async (seqNum) => {
    const message = await getMessageByTopicIdAndSequenceNumber(
      network,
      topicId,
      seqNum,
    );
    messages.push(message);
  });

  messages.sort((a, b) => a.sequence_number - b.sequence_number);

  return messages;
}

export async function getChunkedMessages(
  network: string,
  topicId: string,
  firstChunkSeqNum: number,
  totalNumChunks: number,
  initialTransactionValidStart: string,
  aggregator: IHederaMessage[] = [],
  retryCounter = 0,
): Promise<IHederaMessage[]> {
  const messages = await getMessagesByTopicIdAndSequenceRange(
    network,
    topicId,
    firstChunkSeqNum,
    totalNumChunks,
  );
  const filteredMessages = messages.filter(
    (msg) =>
      msg.chunk_info.initial_transaction_id.transaction_valid_start ===
      initialTransactionValidStart,
  );

  const resultMsgs = aggregator.concat(filteredMessages);

  if (resultMsgs.length < totalNumChunks) {
    // Note: message chunks might intersperse with other message in the same topic. Therefore we need to look further for all chunks. Here we search up to 2 times more message chunks to make sure all chunks are collected.
    if (retryCounter >= 3) {
      throw new Error(
        'Failed getting all chunks for message after extending the sequence range 3 times',
      );
    }
    const nextSeqNum = firstChunkSeqNum + totalNumChunks;
    return getChunkedMessages(
      network,
      topicId,
      nextSeqNum,
      totalNumChunks,
      initialTransactionValidStart,
      resultMsgs,
      retryCounter + 1,
    );
  }

  return resultMsgs;
}

export async function getDecodedMessageByConsensusTimestamp(
  network: string,
  timestamp: string,
): Promise<{
  message: IHederaMessage;
  decodedMessageContent: IHederaMessageContent | undefined;
}> {
  const message = await getMessageByConsensusTimestamp(network, timestamp);
  const isMessageChunked =
    message?.chunk_info?.number < message?.chunk_info?.total;

  let decodedMessageContent: IHederaMessageContent | undefined;
  if (isMessageChunked) {
    const firstChunkSeqNum =
      message.sequence_number - message.chunk_info.number + 1;
    const totalChunks = message.chunk_info?.total;
    const initalTxnStart =
      message.chunk_info?.initial_transaction_id?.transaction_valid_start;
    const messageChunks = await getChunkedMessages(
      network,
      message?.topic_id,
      firstChunkSeqNum,
      totalChunks,
      initalTxnStart,
    );
    const sortedMsgChunks = sortBy(
      messageChunks,
      (chunk) => chunk.sequence_number,
    );
    const jointMessages = sortedMsgChunks
      .map((chunk) => decodeBase64(chunk.message), '')
      .join('');

    decodedMessageContent = safeJsonParse(
      jointMessages,
      undefined,
    ) as unknown as IHederaMessageContent;
  } else {
    decodedMessageContent = safeJsonParse(
      decodeBase64(message.message),
      undefined,
    ) as unknown as IHederaMessageContent;
  }

  return { message, decodedMessageContent };
}

export async function getHederaDocumentByConsensusTimestamp(
  network: string,
  docCreateMsgTimestamp: string,
): Promise<{ cid?: string; doc?: IGuardianVpDocument }> {
  const { decodedMessageContent } = await getDecodedMessageByConsensusTimestamp(
    network,
    docCreateMsgTimestamp,
  );

  if (decodedMessageContent !== undefined) {
    const { cid } = decodedMessageContent;
    const ipfsBuffer = await getIpfsFileContentBuffer(network, cid);

    const ipfsString = ipfsBuffer?.toString();

    return { cid, doc: safeJsonParse(ipfsString, undefined) };
  }

  return {};
}

export async function getTokenNFTInfoArray(
  network: string,
  tokenId: string,
  maxSerialNumber?: number | undefined,
): Promise<IHederaTokenNFTInfo[]> {
  const hederaHost = getHederaAPIHost(network);

  const hederaAPIEndpoint = new URL(
    `${hederaHost}/api/v1/tokens/${tokenId}/nfts`,
  );
  hederaAPIEndpoint.searchParams.append('order', 'desc');
  hederaAPIEndpoint.searchParams.append('limit', '100'); // max limit 100

  if (maxSerialNumber !== undefined) {
    hederaAPIEndpoint.searchParams.append(
      'serialnumber',
      `lt:${maxSerialNumber}`,
    );
  }

  const requestURL = hederaAPIEndpoint.href;
  const data = await requestHederaAPI(requestURL);

  return data?.nfts as IHederaTokenNFTInfo[];
}

export async function getTokenNFTInfoByTimestamp(
  network: string,
  tokenId: string,
  tokenMintMsgTimestamp: string,
): Promise<IHederaTokenNFTInfo | undefined> {
  const base64TokenMintMsgTimestamp = encodeBase64(tokenMintMsgTimestamp);

  let found: IHederaTokenNFTInfo | undefined;
  let hasNext = true;
  let lastSerialNumber: number | undefined;

  while (!found && hasNext) {
    const nfts = await getTokenNFTInfoArray(network, tokenId, lastSerialNumber);
    const nftSerialNumbers = nfts.map((nft) => nft.serial_number);
    lastSerialNumber = Math.min(...nftSerialNumbers);
    hasNext = lastSerialNumber > 1;

    found = nfts.find(
      (nft: IHederaTokenNFTInfo) =>
        nft.metadata === base64TokenMintMsgTimestamp,
    );
  }

  return found;
}

export async function getAllTokenNFTInfoArray(
  network: string,
  tokenId: string,
): Promise<IHederaTokenNFTInfo[]> {
  let allNfts: IHederaTokenNFTInfo[] = [];
  let hasNext = true;
  let lastSerialNumber: number | undefined;

  while (hasNext) {
    const nfts = await getTokenNFTInfoArray(network, tokenId, lastSerialNumber);
    const nftSerialNumbers = nfts.map((nft) => nft.serial_number);
    lastSerialNumber = Math.min(...nftSerialNumbers);
    hasNext = nfts.length > 0 && lastSerialNumber > 1;
    allNfts = allNfts.concat(nfts);
  }

  return allNfts;
}
