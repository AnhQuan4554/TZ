/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import { runAllSettled } from '@tymlez/common-libs';
import _ from 'lodash';
import { decryptBuffer, decryptJsonObject } from '../utils/ipfsDecrypt';
import {
  getTransactionByAccount,
  getTokenDetailsByTokenId,
  getMessageByTimestamp,
  getTransactionByTimestamp,
  getMessageTransaction,
  getIpfs,
  getTransactionByAccountAndDateRange,
  getTokenClassesByAccountId,
  getTransactionByAccountAndDateRangeWithPagination,
  getIpfsFromCdn,
  isJsonString,
} from '../utils';
import type {
  Options,
  TrustchainResponse,
  TokensByAccountIdResponse,
  IpfsDocumentResponse,
} from '../definitions';

// populates all relationships attached to the message
async function populateRelationships(
  network: string,
  data: any,
  stateproof: boolean,
  populateRelations: boolean,
  tymlezCdn: boolean,
  decryptionKey?: string | undefined,
) {
  if (data.decodedMessage.relationships) {
    let relationshipData: any = [];
    await runAllSettled(
      data.decodedMessage.relationships,
      async (item: any) => {
        const relationship: any = await getMessageByTimestamp(network, item);
        await runAllSettled(
          relationship.messages,
          async (message: any) => {
            message.transaction = await getTransactionByTimestamp(
              network,
              message.consensus_timestamp,
              stateproof,
            );
            if (message?.memo) {
              await populateTransactionChild(
                network,
                message.transaction,
                stateproof,
                populateRelations,
                tymlezCdn,
                decryptionKey,
              );
            }
          },
          250,
        );
        if (relationship.decodedMessage.relationships && populateRelations) {
          await populateRelationships(
            network,
            relationship,
            stateproof,
            populateRelations,
            tymlezCdn,
            decryptionKey,
          );
        }
        relationshipData.push(relationship);
      },
      250,
    );
    relationshipData = _.orderBy(relationshipData, (item) => item.timestamp, [
      'asc',
    ]);
    data.decodedMessage.relationships = relationshipData;
  }
}

// populates child transactions attached to the message
async function populateTransactionChild(
  network: string,
  data: any,
  stateproof: boolean,
  populateRelations: boolean,
  tymlezCdn: boolean,
  decryptionKey?: string | undefined,
) {
  if (data?.memo) {
    data.message = await getMessageByTimestamp(network, data.memo);
    if (decryptionKey) {
      const url =
        data.message.decodedMessage.url ||
        `https://ipfs.io/ipfs/${data.message.decodedMessage.cid}`;
      if (tymlezCdn) {
        data.message.decodedMessage.ipfsDocument = await getIpfsFromCdn(
          network,
          url,
        );
      } else {
        data.message.decodedMessage.ipfsDocument = await getIpfs(url);
      }
      if (data.message.decodedMessage.ipfsDocument) {
        if (
          Buffer.isBuffer(data.message.decodedMessage.ipfsDocument) &&
          isJsonString(data.message.decodedMessage.ipfsDocument.toString())
        ) {
          data.message.decodedMessage.ipfsDocument = decryptJsonObject(
            JSON.parse(data.message.decodedMessage.ipfsDocument.toString()),
            decryptionKey,
          );
        } else {
          data.message.decodedMessage.ipfsDocument = JSON.parse(
            decryptBuffer(
              data.message.decodedMessage.ipfsDocument,
              decryptionKey,
            ),
          );
        }
      }
    }
  }
  if (populateRelations) {
    await populateRelationships(
      network,
      data.message,
      stateproof,
      populateRelations,
      tymlezCdn,
      decryptionKey,
    );
  }
  return data;
}

/**
 * given the accountId, network, stateproof, startTimestamp, endTimestamp, options, tokenId
 * the getTokensUsingAccountIdHandler() will be able to find all the token under that account between a given timestamp
 * @param accountId( Required, Type: String)
 * @param network (Required, Type: String)
 * @param stateproof (Required, Type: Boolean)
 * @param startTimestamp (Required, Type: String)
 * @param endTimestamp (Required, Type: String)
 * @param options.transactionType (Optional, Type: String)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @param tokenId (Optional, Type: String) To filter by a token type
 * @returns trustchain in output file / trustchain reponse
 */

export const getTokensUsingAccountIdHandler = async ({
  accountId,
  network,
  stateproof,
  startTimestamp,
  endTimestamp,
  options,
  limit,
  tokenId,
}: {
  accountId: string;
  network: string;
  stateproof: boolean;
  startTimestamp: string;
  endTimestamp: string;
  options: Options;
  limit: number;
  tokenId?: string;
}): Promise<TrustchainResponse> => {
  const tokenClasses: any = await getTokenClassesByAccountId(
    network,
    accountId,
  );
  let transactions: any = await getTransactionByAccountAndDateRange(
    network,
    accountId,
    startTimestamp,
    endTimestamp,
    limit,
    options.transactionType,
    stateproof,
  );
  if (tokenId) {
    transactions = transactions.filter((x: any) => x.entity_id === tokenId);
  }
  let transactionData: any[] = [];
  transactions.forEach((mintedTransaction: any) => {
    const tokenClass = _.find(tokenClasses?.tokens, {
      token_id: mintedTransaction.entity_id,
    });
    const mutatedTransaction = { ...mintedTransaction, ...tokenClass };
    mutatedTransaction.root_authority = accountId;
    transactionData.push(mutatedTransaction);
  });
  transactionData = _.orderBy(
    transactionData,
    (item) => item.consensus_timestamp,
    ['asc'],
  );
  const dataToOutput: any = {
    transactions: transactionData,
  };
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput;
};

export const getTokensUsingAccountIdWithPaginationHandler = async ({
  accountId,
  network,
  stateproof,
  startTimestamp,
  endTimestamp,
  options,
  orderBy,
  tokenId,
}: {
  accountId: string;
  network: string;
  stateproof: boolean;
  startTimestamp: string;
  endTimestamp: string;
  options: Options;
  orderBy: string;
  tokenId?: string;
}): Promise<TokensByAccountIdResponse> => {
  const tokenClasses: any = await getTokenClassesByAccountId(
    network,
    accountId,
  );
  const resultData: any =
    await getTransactionByAccountAndDateRangeWithPagination(
      network,
      accountId,
      startTimestamp,
      endTimestamp,
      orderBy,
      options.transactionType,
      stateproof,
    );
  let transactions = resultData?.transactions;
  if (tokenId) {
    transactions = transactions.filter((x: any) => x.entity_id === tokenId);
  }
  let transactionData: any[] = [];
  transactions.forEach((mintedTransaction: any) => {
    const tokenClass = _.find(tokenClasses?.tokens, {
      token_id: mintedTransaction.entity_id,
    });
    const mutatedTransaction = { ...mintedTransaction, ...tokenClass };
    mutatedTransaction.root_authority = accountId;
    transactionData.push(mutatedTransaction);
  });
  if (orderBy === 'desc') {
    transactionData = _.orderBy(
      transactionData,
      (item) => item.consensus_timestamp,
      ['desc'],
    );
  } else {
    transactionData = _.orderBy(
      transactionData,
      (item) => item.consensus_timestamp,
      ['asc'],
    );
  }
  const dataToOutput: any = {
    transactions: transactionData,
    nextStartDate: resultData?.nextStartDate,
    previousStartDate: resultData?.previousStartDate,
    endDate: resultData?.endDate,
  };
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput;
};

/**
 * given the tokenId, network, stateproof, options
 * the getTrustChainUsingTokenIdHandler() will be able to provide the n-level trustchain for a given transaction or a list of transactions under a particular
 * token on the Hedera Blockchain
 * @param tokenId( Required, Type: String)
 * @param network (Required, Type: String)
 * @param stateproof (Required, Type: Boolean)
 * @param options.transactionType (Optional, Type: String)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @returns trustchain in output file / trustchain reponse
 */

export const getTrustChainUsingTokenIdHandler = async ({
  tokenId,
  network,
  stateproof,
  options,
}: {
  tokenId: string;
  network: string;
  stateproof: boolean;
  options: Options;
}): Promise<TrustchainResponse> => {
  const tokenData: any = await getTokenDetailsByTokenId(network, tokenId);
  let transactions: any = [];
  if (tokenData?.treasury_account_id) {
    transactions = await getTransactionByAccount(
      network,
      tokenData.treasury_account_id,
      options.transactionType,
      stateproof,
    );
  }
  const mintedTransactions = transactions.filter(
    (x: any) => x.entity_id === tokenId,
  );
  const transactionData: any[] = [];
  await runAllSettled(
    mintedTransactions,
    async (mintedTransaction: any) => {
      const populatedTransaction = await populateTransactionChild(
        network,
        mintedTransaction,
        stateproof,
        options.populateRelationships,
        options.tymlezCdn,
        options.decryptionKey,
      );
      transactionData.push(populatedTransaction);
    },
    250,
  );
  const dataToOutput: any = {
    token: tokenData,
    transactions: transactionData,
  };
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput;
};

/**
 * given the transactionId, network, stateproof, options
 * the getTrustChainUsingTransactionIdHandler() will be able to provide the n-level trustchain for a given transaction or a list of transactions under a particular
 * token on the Hedera Blockchain
 * @param transactionId( Required, Type: String)
 * @param network (Required, Type: String)
 * @param stateproof (Required, Type: Boolean)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @returns trustchain in output file / trustchain reponse
 */

export const getTrustChainUsingTransactionIdHandler = async ({
  transactionId,
  network,
  stateproof,
  options,
}: {
  transactionId: string;
  network: string;
  stateproof: boolean;
  options: Options;
}): Promise<TrustchainResponse> => {
  let transactionData: any = await getMessageTransaction(
    network,
    transactionId,
    stateproof,
  );
  transactionData = transactionData.data.transactions;
  const populatedTransactionData: any[] = [];
  await runAllSettled(transactionData, async (transaction: any) => {
    const populatedTransaction = await populateTransactionChild(
      network,
      transaction,
      stateproof,
      options.populateRelationships,
      options.tymlezCdn,
      options.decryptionKey,
    );
    populatedTransactionData.push(populatedTransaction);
  });
  const dataToOutput: any = {
    transactions: populatedTransactionData,
  };
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput;
};

/**
 * given the transactionId, network, stateproof, options
 * the getTrustChainUsingTransactionIdWithGroupingHandler() will be able to provide the n-level trustchain for a given transaction or a list of transactions under a particular
 * token and groups the vc documents by a grouping key on the Hedera Blockchain
 * @param transactionId( Required, Type: String)
 * @param network (Required, Type: String)
 * @param stateproof (Required, Type: Boolean)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @param groupBy (Required, Type: String)
 * @returns trustchain in output file / trustchain reponse
 */

export const getTrustChainUsingTransactionIdWithGroupingHandler = async ({
  transactionId,
  network,
  stateproof,
  options,
  groupBy,
}: {
  transactionId: string;
  network: string;
  stateproof: boolean;
  options: Options;
  groupBy: string;
}): Promise<TrustchainResponse> => {
  let transactionData: any = await getMessageTransaction(
    network,
    transactionId,
    stateproof,
  );
  transactionData = transactionData.data.transactions;
  const populatedTransactionData: any[] = [];
  await runAllSettled(transactionData, async (transaction: any) => {
    const populatedTransaction = await populateTransactionChild(
      network,
      transaction,
      stateproof,
      options.populateRelationships,
      options.tymlezCdn,
      options.decryptionKey,
    );
    if (groupBy) {
      if (populatedTransaction.message.decodedMessage.ipfsDocument) {
        const vc =
          populatedTransaction.message.decodedMessage.ipfsDocument
            .verifiableCredential;
        const tokenMinted = vc[vc.length - 1];
        vc.splice(-1);
        const result = _(vc)
          .groupBy((x) => x.credentialSubject[0][groupBy])
          .map((value, key) => ({ [groupBy]: key, vc: value }))
          .value();
        result.push({
          [groupBy]: tokenMinted.credentialSubject[0].type,
          vc: [tokenMinted],
        });
        populatedTransaction.message.decodedMessage.ipfsDocument.verifiableCredential =
          result;
      }
    }
    populatedTransactionData.push(populatedTransaction);
  });
  const dataToOutput: any = {
    transactions: populatedTransactionData,
  };
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput;
};

/**
 * given the accountId, network, stateproof, startTimestamp, endTimestamp, options, tokenId
 * the getDeviceCertificationDocumentHandler() will be able to find all the token under that account between a given timestamp
 * @param network (Required, Type: String)
 * @param ipfsUrl (Required, Type: String)
 * @param options.tymlezCdn (Required, Type: Boolen)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @returns ipfs document details in output file / Ipfs Document Response
 */

export const getDeviceCertificationDocumentHandler = async ({
  network,
  ipfsUrl,
  options,
}: {
  network: string;
  ipfsUrl: string;
  options: Options;
}): Promise<IpfsDocumentResponse> => {
  let ipfsDocument: any;
  let ipfsDocumentDecoded: any = '';
  if (options.decryptionKey) {
    if (options.tymlezCdn) {
      ipfsDocument = await getIpfsFromCdn(network, ipfsUrl);
    } else {
      ipfsDocument = await getIpfs(ipfsUrl);
    }
    if (ipfsDocument) {
      if (Buffer.isBuffer(ipfsDocument)) {
        ipfsDocumentDecoded = decryptBuffer(
          ipfsDocument,
          options.decryptionKey,
        );
      } else {
        ipfsDocumentDecoded = decryptJsonObject(
          ipfsDocument,
          options.decryptionKey,
        );
      }
    }
  }
  const dataToOutput: any = {
    ipfsDocument: ipfsDocumentDecoded,
  };
  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput;
};
