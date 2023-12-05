/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { runAllSettled } from '@tymlez/common-libs';
import _ from 'lodash';
import promiseRetry from 'promise-retry';

function getUrl(network: string, endpoint: string) {
  const networkUrl =
    {
      testnet: 'https://testnet.mirrornode.hedera.com',
      mainnet: 'https://mainnet-public.mirrornode.hedera.com',
    }[network] || network;

  return `${networkUrl}${endpoint}`;
}

function getCdnUrl(network: string, endpoint: string) {
  const networkUrl =
    {
      testnet: 'https://testnet.data.tymlez.com',
      mainnet: 'https://mainnet.data.tymlez.com',
    }[network] || network;

  return `${networkUrl}${endpoint}`;
}

function patchMemoField(path: string) {
  const [truncatedPath] = path.split(' ');
  return truncatedPath;
}

async function getStateOfProof(network: string, transactionId: string) {
  const url = getUrl(
    network,
    `/api/v1/transactions/${transactionId}/stateproof`,
  );
  const { data } = await axios.get(url);
  return data;
}

async function getAsyncMessageSequence(
  network: string,
  topicId: string,
  startSequenceNumber: number,
  sequenceLength: number,
) {
  const sequenceArray = _.range(
    startSequenceNumber,
    startSequenceNumber + sequenceLength,
    1,
  );
  let messageChunks: any[] = [];
  await runAllSettled(
    sequenceArray,
    async (sequenceNumber: any) => {
      const messageChunk = await getMessageByTopicAndSequence(
        network,
        topicId,
        sequenceNumber,
      );
      messageChunks.push(messageChunk);
    },
    100,
  );
  messageChunks = _.orderBy(messageChunks, (item) => item.sequence_number, [
    'asc',
  ]);
  return {
    messageChunks,
    lastSequenceNumber: sequenceArray[sequenceArray.length - 1],
  };
}

export async function getMessageTransaction(
  network: string,
  transactionId: string,
  stateproof?: boolean,
) {
  const url = getUrl(network, `/api/v1/transactions/${transactionId}`);
  const { data } = await axios.get(url);
  await runAllSettled(data.transactions, async (m: any) => {
    if (m.memo_base64) {
      m.memo = patchMemoField(atob(m.memo_base64));
    }
    if (stateproof) {
      m.stateproof = await getStateOfProof(network, m.transaction_id);
    }
  });
  return { data };
}

async function getMessageByTopicAndSequence(
  network: string,
  topicId: string,
  sequenceNumber: number,
) {
  const url = getUrl(
    network,
    `/api/v1/topics/${topicId}/messages/${sequenceNumber}`,
  );
  const { data } = await axios.get(url);
  return data;
}

/* TODO:
 1. Modify the function for better optimisation to find the chunks rather than for checking all sequnce messages and match transaction_valid_start
*/
async function bindMessageChunks(
  network: string,
  data: any,
  messageData: any,
  initialTransactionValidStart: string,
  sequenceNumber: number,
  sequenceLength: number,
  rateLimiter: number,
) {
  const messageChunkData = await getAsyncMessageSequence(
    network,
    data.topic_id,
    sequenceNumber,
    sequenceLength,
  );
  await runAllSettled(
    messageChunkData.messageChunks,
    async (messageChunk: any) => {
      if (
        initialTransactionValidStart ===
        messageChunk?.chunk_info?.initial_transaction_id
          ?.transaction_valid_start
      ) {
        if (
          messageChunk?.chunk_info?.number < messageChunk?.chunk_info?.total
        ) {
          messageData.messages.push(messageChunk);
          messageData.decodedMessage = messageData.decodedMessage.concat(
            atob(messageChunk.message),
          );
        } else {
          messageData.messages.push(messageChunk);
          messageData.decodedMessage = messageData.decodedMessage.concat(
            atob(messageChunk.message),
          );
          messageData.decodedMessage = JSON.parse(messageData.decodedMessage);
        }
      }
    },
  );
  if (messageData.messages.length !== data.chunk_info.total) {
    if (rateLimiter >= 1) {
      await bindMessageChunks(
        network,
        data,
        messageData,
        initialTransactionValidStart,
        messageChunkData.lastSequenceNumber,
        50,
        rateLimiter + 1,
      );
    } else {
      await bindMessageChunks(
        network,
        data,
        messageData,
        initialTransactionValidStart,
        messageChunkData.lastSequenceNumber,
        sequenceLength,
        rateLimiter + 1,
      );
    }
  }
}

export async function getMessageByTimestamp(
  network: string,
  timestamp: string,
) {
  const url = getUrl(network, `/api/v1/topics/messages/${timestamp}`);
  const { data } = await axios.get(url);
  const messageData: any = {
    chunked: false,
    messages: [],
    decodedMessage: '',
    timestamp,
  };
  if (data?.chunk_info?.number < data?.chunk_info?.total) {
    messageData.chunked = true;
    messageData.messages.push(data);
    messageData.decodedMessage = messageData.decodedMessage.concat(
      atob(data.message),
    );
    await bindMessageChunks(
      network,
      data,
      messageData,
      data?.chunk_info?.initial_transaction_id?.transaction_valid_start,
      data.sequence_number + 1,
      data?.chunk_info?.total,
      0,
    );
  } else {
    messageData.messages.push(data);
    messageData.decodedMessage = JSON.parse(atob(data.message));
  }
  return messageData;
}

export async function getIpfsFromCdn(network: string, url: string) {
  const [, documentHash] = url.split('ipfs/');
  const cdnUrl = getCdnUrl(network, `/${documentHash}`);
  return await axios
    .get(cdnUrl, {
      responseType: 'arraybuffer',
    })
    .then(({ data }) => {
      return data;
    })
    .catch(async () => {
      return await getIpfs(url);
    });
}

export async function getIpfs(url: string, retries = 3) {
  const getIpfsData = async () => {
    return await axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then(({ data }) => {
        return data;
      });
  };
  return await promiseRetry(
    (retry: any) => {
      return getIpfsData().catch((err) => {
        if (err) {
          retry(err);
        }
        throw err;
      });
    },
    { retries, randomize: true },
  ).then((data: any) => {
    return data;
  });
}

export async function getIpfsUnEncryptedDocumentFromCdn(
  network: string,
  url: string,
) {
  const [, documentHash] = url.split('ipfs/');
  const cdnUrl = getCdnUrl(network, `/${documentHash}`);
  return await axios
    .get(cdnUrl, {})
    .then(({ data }) => {
      return data;
    })
    .catch(async () => {
      return await getIpfsUnEncryptedDocument(url);
    });
}

export async function getIpfsUnEncryptedDocument(url: string, retries = 3) {
  const getIpfsUnEncryptedData = async () => {
    return await axios.get(url, {}).then(({ data }) => {
      return data;
    });
  };
  return await promiseRetry(
    (retry: any) => {
      return getIpfsUnEncryptedData().catch((err) => {
        if (err) {
          retry(err);
        }
        throw err;
      });
    },
    { retries, randomize: true },
  ).then((data: any) => {
    return data;
  });
}

export async function getMessageByTopic(network: string, topic: string) {
  const url = getUrl(network, `/api/v1/topics/${topic}/messages?limit=50`);
  const { data } = await axios.get(url);
  data.messages.forEach((m: any) => {
    m.decodedMessage = JSON.parse(atob(m.message));
  });
  return data.messages;
}

export async function getTransactionByAccount(
  network: string,
  accountId: string,
  transactionType?: string,
  stateproof?: boolean,
) {
  const transactions: any[] = [];
  let nextLink;
  if (transactionType) {
    nextLink = getUrl(
      network,
      `/api/v1/transactions?account.id=${accountId}&transactionType=${transactionType}`,
    );
  } else {
    nextLink = getUrl(network, `/api/v1/transactions?account.id=${accountId}`);
  }
  while (nextLink) {
    const { data } = await axios.get(nextLink);
    await runAllSettled(data.transactions, async (m: any) => {
      if (m.memo_base64) {
        m.memo = patchMemoField(atob(m.memo_base64));
      }
      if (stateproof) {
        m.stateproof = await getStateOfProof(network, m.transaction_id);
      }
      transactions.push(m);
    });
    if (data.links?.next) {
      nextLink = getUrl(network, data.links.next);
    } else {
      nextLink = '';
    }
  }
  return transactions;
}

export async function getTransactionByAccountAndDateRange(
  network: string,
  accountId: string,
  startTimestamp: string,
  endTimestamp: string,
  limit: number,
  transactionType?: string,
  stateproof?: boolean,
) {
  const transactions: any[] = [];
  let nextLink;
  if (transactionType) {
    nextLink = getUrl(
      network,
      `/api/v1/transactions?account.id=${accountId}&transactionType=${transactionType}&timestamp=gte:${startTimestamp}&timestamp=lte:${endTimestamp}&limit=${limit}&order=asc`,
    );
  } else {
    nextLink = getUrl(
      network,
      `/api/v1/transactions?account.id=${accountId}&timestamp=gte:${startTimestamp}&timestamp=lte:${endTimestamp}&limit=${limit}&order=asc`,
    );
  }
  const { data } = await axios.get(nextLink);
  await runAllSettled(data.transactions, async (m: any) => {
    if (m.memo_base64) {
      m.memo = patchMemoField(atob(m.memo_base64));
    }
    if (stateproof) {
      m.stateproof = await getStateOfProof(network, m.transaction_id);
    }
    transactions.push(m);
  });
  return transactions;
}

export async function getTransactionByAccountAndDateRangeWithPagination(
  network: string,
  accountId: string,
  startTimestamp: string,
  endTimestamp: string,
  orderBy: string,
  transactionType?: string,
  stateproof?: boolean,
) {
  const transactions: any[] = [];
  let nextLink;
  let nextStartDate;
  let nextEndDate;
  if (transactionType) {
    nextLink = getUrl(
      network,
      `/api/v1/transactions?account.id=${accountId}&transactionType=${transactionType}&timestamp=gte:${startTimestamp}&timestamp=lte:${endTimestamp}&limit=10&order=${orderBy}`,
    );
  } else {
    nextLink = getUrl(
      network,
      `/api/v1/transactions?account.id=${accountId}&timestamp=gte:${startTimestamp}&timestamp=lte:${endTimestamp}&limit=10&order=${orderBy}`,
    );
  }
  const { data } = await axios.get(nextLink);
  await runAllSettled(data.transactions, async (m: any) => {
    if (m.memo_base64) {
      m.memo = patchMemoField(atob(m.memo_base64));
    }
    if (stateproof) {
      m.stateproof = await getStateOfProof(network, m.transaction_id);
    }
    transactions.push(m);
  });
  if (data.links?.next) {
    if (orderBy === 'desc') {
      const [, result] = data.links.next.split('lt:');
      const [finalResult] = result.split('&');
      nextEndDate = new Date(
        Math.ceil(Number(finalResult) * 1000),
      ).toISOString();
      nextStartDate = new Date(
        Math.ceil(Number(startTimestamp) * 1000),
      ).toISOString();
    } else {
      const [, result] = data.links.next.split('gt:');
      const [finalResult] = result.split('&');
      nextStartDate = new Date(
        Math.ceil(Number(finalResult) * 1000),
      ).toISOString();
      nextEndDate = new Date(
        Math.ceil(Number(endTimestamp) * 1000),
      ).toISOString();
    }
  } else if (orderBy === 'desc') {
    nextStartDate = new Date(
      Math.ceil(Number(startTimestamp) * 1000),
    ).toISOString();
    nextEndDate = '';
  } else {
    nextStartDate = '';
    nextEndDate = new Date(
      Math.ceil(Number(endTimestamp) * 1000),
    ).toISOString();
  }
  return {
    transactions,
    nextStartDate,
    previousStartDate: new Date(
      Math.ceil(Number(startTimestamp) * 1000),
    ).toISOString(),
    endDate: nextEndDate,
  };
}

export async function getTokenDetailsByTokenId(
  network: string,
  tokenId: string,
) {
  const url = getUrl(network, `/api/v1/tokens/${tokenId}`);
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getTransactionByTimestamp(
  network: string,
  timestamp: string,
  stateproof?: boolean,
) {
  const url = getUrl(network, `/api/v1/transactions?timestamp=${timestamp}`);
  try {
    const transactions: any[] = [];
    const { data } = await axios.get(url);
    await runAllSettled(data.transactions, async (m: any) => {
      if (m.memo_base64) {
        m.memo = patchMemoField(atob(m.memo_base64));
      }
      if (stateproof) {
        m.stateproof = await getStateOfProof(network, m.transaction_id);
      }
      transactions.push(m);
    });
    return transactions[0];
  } catch (error) {
    return error;
  }
}

export async function getNFTsByToken(
  network: string,
  tokenId: string,
  accountId: string,
) {
  const transactions: any[] = [];
  let nextLink;
  nextLink = getUrl(
    network,
    `/api/v1/tokens/${tokenId}/nfts?account.id=${accountId}`,
  );
  while (nextLink) {
    const { data } = await axios.get(nextLink);
    data.nfts.forEach((m: any) => {
      if (m.metadata) {
        m.metadata = atob(m.metadata);
      }
      transactions.push(m);
    });
    if (data.links?.next) {
      nextLink = getUrl(network, data.links.next);
    } else {
      nextLink = '';
    }
  }
  return transactions;
}

export async function getTokenClassesByAccountId(
  network: string,
  accountId: string,
) {
  const url = getUrl(network, `/api/v1/tokens?account.id=${accountId}`);
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
}

export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
