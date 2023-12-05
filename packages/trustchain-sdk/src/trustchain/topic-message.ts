/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import { runAllSettled } from '@tymlez/common-libs';
import _ from 'lodash';
import { decryptBuffer, decryptJsonObject } from '../utils/ipfsDecrypt';
import {
  getMessageByTopic,
  getTransactionByTimestamp,
  getMessageByTimestamp,
  getIpfs,
  getIpfsUnEncryptedDocument,
  getIpfsFromCdn,
  getIpfsUnEncryptedDocumentFromCdn,
  isJsonString
} from '../utils';
import type { Options, TrustchainResponse } from "../definitions"

// populates all relationships attached to the message
async function populateRelationships(network: string, data: any, stateproof: boolean, populateRelations: boolean, tymlezCdn: boolean, decryptionKey?: string | undefined) {
  if (data.decodedMessage.relationships) {
    let relationshipData: any = [];
    await runAllSettled(data.decodedMessage.relationships, async (item: any) => {
      const relationship: any = await getMessageByTimestamp(network, item);
      await runAllSettled(relationship.messages, async (message: any) => {
        message.transaction = await getTransactionByTimestamp(network, message.consensus_timestamp, stateproof);
      }, 250);
      if (relationship.decodedMessage.relationships && populateRelations) {
        await populateRelationships(network, relationship, stateproof, populateRelations, tymlezCdn, decryptionKey);
      }
      relationshipData.push(relationship);
    }, 250);
    relationshipData = _.orderBy(relationshipData, item => item.timestamp, ["asc"])
    data.decodedMessage.relationships = relationshipData;
  }
}

// populates child transactions attached to the message
async function populateTransactionChild(network: string, data: any, stateproof: boolean, populateRelations: boolean, tymlezCdn: boolean, decryptionKey?: string | undefined) {
  if (data?.memo) {
    data.message = await getMessageByTimestamp(network, data.memo);
    if (decryptionKey && (data.decodedMessage.url || data.decodedMessage.cid)) {
      const url = data.decodedMessage.url || `https://ipfs.io/ipfs/${data.decodedMessage.cid}`;
      if (data.decodedMessage.type !== "DID-Document") {
        if (tymlezCdn) {
          data.decodedMessage.ipfsDocument = await getIpfsFromCdn(network, url);
        }
        else {
          data.decodedMessage.ipfsDocument = await getIpfs(url);
        }
        if (data.decodedMessage.ipfsDocument) {
          if (Buffer.isBuffer(data.decodedMessage.ipfsDocument) && isJsonString(data.decodedMessage.ipfsDocument.toString())) {
            data.decodedMessage.ipfsDocument = decryptJsonObject(JSON.parse(data.decodedMessage.ipfsDocument.toString()), decryptionKey);
          }
          else {
            data.decodedMessage.ipfsDocument = JSON.parse(decryptBuffer(data.decodedMessage.ipfsDocument, decryptionKey));
          }
        }
      }
      else if (tymlezCdn) {
        data.decodedMessage.ipfsDocument = await getIpfsUnEncryptedDocumentFromCdn(network, url);
      }
      else {
        data.decodedMessage.ipfsDocument = await getIpfsUnEncryptedDocument(url);
      }
    }
    await runAllSettled(data.message.messages, async (message: any) => {
      message.transaction = await getTransactionByTimestamp(network, message.consensus_timestamp, stateproof);
    }, 250);
  };
  if (populateRelations) {
    await populateRelationships(network, data.message, stateproof, populateRelations, tymlezCdn, decryptionKey);
  }
  return data;
}

// populates topic messages
async function populateTopicMessage(network: string, message: any, stateproof: boolean, populateRelations: boolean, tymlezCdn: boolean, decryptionKey?: string | undefined) {
  message.transaction = await getTransactionByTimestamp(network, message.consensus_timestamp)
  if (decryptionKey && (message.decodedMessage.url || message.decodedMessage.cid)) {
    const url = message.decodedMessage.url || `https://ipfs.io/ipfs/${message.decodedMessage.cid}`;
    if (message.decodedMessage.type !== "DID-Document") {
      if (tymlezCdn) {
        message.decodedMessage.ipfsDocument = await getIpfsFromCdn(network, url);
      }
      else {
        message.decodedMessage.ipfsDocument = await getIpfs(url);
      }
      if (message.decodedMessage.ipfsDocument) {
        if (Buffer.isBuffer(message.decodedMessage.ipfsDocument) && isJsonString(message.decodedMessage.ipfsDocument.toString())) {
          message.decodedMessage.ipfsDocument = decryptJsonObject(JSON.parse(message.decodedMessage.ipfsDocument.toString()), decryptionKey);
        }
        else {
          message.decodedMessage.ipfsDocument = JSON.parse(decryptBuffer(message.decodedMessage.ipfsDocument, decryptionKey));
        }
      }
    }
  }
  if (message?.memo) {
    await populateTransactionChild(network, message.transaction, stateproof, populateRelations, tymlezCdn, decryptionKey);
  }
  if (message?.decodedMessage?.childId) {
    message.decodedMessage.childTopic = await getMessageByTopic(network, message.decodedMessage.childId);
    await runAllSettled(message.decodedMessage.childTopic, async (x: any) => {
      await populateTopicMessage(network, x, stateproof, populateRelations, tymlezCdn, decryptionKey);
    }, 250)
  }
}

/**
 * given the network,topic, stateproof, decryptionKey, output
 * the getTopicTrustChainHandler() will be able to provide the n-level trustchain for all the topic messages under a given topic
 * on the Hedera Blockchain
 * @param topic (Required, Type: String)
 * @param network (Optional, Type: String, default: Testnet)
 * @param stateproof (Optional, Type: Boolean, Default: false)
 * @param options.decryptionKey (Optional, Type: String)
 * @param options.output (Optional, Type: String) Absolute path of the file
 * @returns trustchain in output file / trustchain reponse
 */

export const getTopicTrustChainHandler = async ({
  topic,
  network,
  stateproof,
  options,
}: {
  topic: string;
  network: string;
  stateproof: boolean;
  options: Options;
}): Promise<TrustchainResponse> => {

  const messages: any = await getMessageByTopic(network, topic);

  await runAllSettled(messages, async (message: any) => {
    await populateTopicMessage(network, message, stateproof, options.populateRelationships, options.tymlezCdn, options.decryptionKey);
  }, 250)
  const dataToOutput: any = {
    transactions: messages
  };

  if (options.output) {
    await fs.writeFile(options.output, JSON.stringify(dataToOutput, null, 2));
  }
  return dataToOutput
};
