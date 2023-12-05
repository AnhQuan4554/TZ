/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import { runAllSettled } from '@tymlez/common-libs';
import _ from 'lodash';
import { decryptBuffer, decryptJsonObject } from '../utils/ipfsDecrypt';
import {
  getTokenDetailsByTokenId,
  getNFTsByToken,
  getMessageByTimestamp,
  getTransactionByTimestamp,
  getIpfs,
  isJsonString
} from '../utils';
import type { Options, TrustchainResponse } from "../definitions"

// populates all relationships attached to the message
async function populateRelationships(network: string, data: any, stateproof: boolean, decryptionKey?: string | undefined) {
  if (data.decodedMessage.relationships) {
    let relationshipData: any = [];
    await runAllSettled(data.decodedMessage.relationships, async (item: any) => {
      const relationship: any = await getMessageByTimestamp(network, item);
      await runAllSettled(relationship.messages, async (message: any) => {
        message.transaction = await getTransactionByTimestamp(network, message.consensus_timestamp, stateproof);
        if (message?.memo) {
          await populateTransactionChild(network, message.transaction, stateproof, decryptionKey);
        }
      }, 250)
      if (relationship.decodedMessage.relationships) {
        await populateRelationships(network, relationship, stateproof, decryptionKey);
      }
      relationshipData.push(relationship);
    }, 250);
    relationshipData = _.orderBy(relationshipData, item => item.timestamp, ["asc"])
    data.decodedMessage.relationships = relationshipData;
  }
}

// populates child transactions attached to the message
async function populateTransactionChild(network: string, data: any, stateproof: boolean, decryptionKey?: string | undefined) {
  if (data?.metadata) {
    data.metadataInfo = await getMessageByTimestamp(network, data.metadata);
    if (decryptionKey) {
      const url = data.message.decodedMessage.url || `https://ipfs.io/ipfs/${data.message.decodedMessage.cid}`;
      data.metadataInfo.decodedMessage.ipfsDocument = await getIpfs(url);
      if (data.metadataInfo.decodedMessage.ipfsDocument) {
        if (Buffer.isBuffer(data.metadataInfo.decodedMessage.ipfsDocument) && isJsonString(data.metadataInfo.decodedMessage.ipfsDocument.toString())) {
          data.metadataInfo.decodedMessage.ipfsDocument = decryptJsonObject(JSON.parse(data.metadataInfo.decodedMessage.ipfsDocument.toString()), decryptionKey);
        }
        else {
          data.metadataInfo.decodedMessage.ipfsDocument = JSON.parse(decryptBuffer(data.metadataInfo.decodedMessage.ipfsDocument, decryptionKey));
        }
      }
    }
    await runAllSettled(data.metadataInfo.messages, async (message: any) => {
      message.transaction = await getTransactionByTimestamp(network, message.consensus_timestamp, stateproof);
      if (message?.memo) {
        await populateTransactionChild(network, message.transaction, stateproof, decryptionKey);
      }
    }, 250)
  }
  await populateRelationships(network, data.metadataInfo, stateproof, decryptionKey)
  return data
}

/**
 * given the network,tokenId, accountId, stateproof, decryptionKey, output
 * the getNftTrustChainHandler() will be able to provide the n-level trustchain for all the NFT transactions happened under a given token and account
 * on the Hedera Blockchain
 * @param accountId (Required, Type: String)
 * @param tokenId (Required, Type: String)
 * @param network (Optional, Type: String, default: Testnet)
 * @param stateproof (Optional, Type: Boolean, Default: false)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @returns trustchain in output file / trustchain reponse
 */

export const getNftTrustChainHandler = async ({
  tokenId,
  accountId,
  network,
  stateproof,
  options
}: {
  tokenId: string;
  accountId: string;
  network: string;
  stateproof: boolean;
  options: Options
}): Promise<TrustchainResponse> => {
  const tokenData: any = await getTokenDetailsByTokenId(network, tokenId);
  const NFTtransactions: any[] = await getNFTsByToken(network, tokenId, accountId);
  const transactionData: any[] = [];
  await runAllSettled(NFTtransactions, async (nftTransaction: any) => {
    const populatedTransaction = await populateTransactionChild(network, nftTransaction, stateproof, options.decryptionKey);
    transactionData.push(populatedTransaction)
  }, 250)
  const dataToOutput: any = {
    token: tokenData,
    transactions: transactionData
  };

  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput
};
