import { getTokensUsingAccountIdHandler, getTrustChainUsingTokenIdHandler, getTrustChainUsingTransactionIdHandler, getTrustChainUsingTransactionIdWithGroupingHandler, getTokensUsingAccountIdWithPaginationHandler, getDeviceCertificationDocumentHandler } from './trustchain';
import { getNftTrustChainHandler } from './trustchain-nfts';
import { getTopicTrustChainHandler } from './topic-message';
import type { GenericServiceCallback, Options, TrustchainResponse, TokensByAccountIdResponse, IpfsDocumentResponse } from '../definitions';


export class Trustchain {

  private readonly network: string;
  private readonly stateproof: boolean;

  constructor(network: string, stateproof: boolean) {
    this.network = network || "testnet";
    this.stateproof = stateproof || false;
  };

  /**
   * given the accountId, startTimestamp, endTimestamp, options, tokenId
   * the getTokensUsingAccountIdHandler() will be able to find all the token under that account between a given timestamp
   * @param accountId( Required, Type: String)
   * @param startTimestamp( Required, Type: String)
   * @param endTimestamp( Required, Type: String)
   * @param options.transactionType (Optional, Type: String)
   * @param options.decryptionKey (Optional, Type: String)
   * @param options.output (Optional, Type: String) Absolute path of the file
   * @param tokenId( Optional, Type: String)
   */

  async getTokensUsingAccountId(
    accountId: string,
    startTimestamp: string,
    endTimestamp: string,
    options: Options,
    limit: number,
    tokenId?: string,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TrustchainResponse>)
  ) {
    try {
      const startDate = Math.floor(new Date(startTimestamp).getTime() / 1000).toString();
      const endDate = Math.floor(new Date(endTimestamp).getTime() / 1000).toString();
      const result = await getTokensUsingAccountIdHandler({ accountId, network: this.network, stateproof: this.stateproof, startTimestamp: startDate, endTimestamp: endDate, options, limit, tokenId });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  async getTokensUsingAccountIdWithPagination(
    accountId: string,
    startTimestamp: string,
    endTimestamp: string,
    options: Options,
    orderBy: string,
    tokenId?: string,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TokensByAccountIdResponse>)
  ) {
    try {
      const startDate = Math.floor(new Date(startTimestamp).getTime() / 1000).toString();
      const endDate = Math.floor(new Date(endTimestamp).getTime() / 1000).toString();
      const result = await getTokensUsingAccountIdWithPaginationHandler({ accountId, network: this.network, stateproof: this.stateproof, startTimestamp: startDate, endTimestamp: endDate, orderBy, options, tokenId });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  /**
   * given the tokenId, transactionType, decryptionKey, output
   * the getTrustChainUsingTokenId() will be able to provide the n-level trustchain for a list of tokenminted under a particular
   * token on the Hedera Blockchain
   * @param tokenId( Required, Type: String)
   * @param options.transactionType (Optional, Type: String)
   * @param options.decryptionKey (Optional, Type: String)
   * @param options.output (Optional, Type: String) Absolute path of the file
   */

  async getTrustChainUsingTokenId(
    tokenId: string,
    options: Options,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TrustchainResponse>)
  ) {
    try {
      const result = await getTrustChainUsingTokenIdHandler({ tokenId, network: this.network, stateproof: this.stateproof, options });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  /**
  * given the transactionId, decryptionKey, output
  * the getTrustChainUsingTransactionId() will be able to provide the n-level trustchain for single token minted
  * on the Hedera Blockchain
  * @param transactionId( Required, Type: String)
  * @param options.decryptionKey (Optional, Type: String)
  * @param options.output (Optional, Type: String) Absolute path of the file
  */

  async getTrustChainUsingTransactionId(
    transactionId: string,
    options: Options,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TrustchainResponse>)
  ) {
    try {
      const result = await getTrustChainUsingTransactionIdHandler({ transactionId, network: this.network, stateproof: this.stateproof, options });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  /**
  * given the transactionId, decryptionKey, output
  * the getTrustChainUsingTransactionIdWithGrouping() will be able to provide the n-level trustchain for single token minted
  * and groups the vc documents by a grouping key on the Hedera Blockchain
  * @param transactionId( Required, Type: String)
  * @param options.decryptionKey (Optional, Type: String)
  * @param options.output (Optional, Type: String) Absolute path of the file
  */

  async getTrustChainUsingTransactionIdWithGrouping(
    transactionId: string,
    options: Options,
    groupBy: string,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TrustchainResponse>)
  ) {
    try {
      const result = await getTrustChainUsingTransactionIdWithGroupingHandler({ transactionId, network: this.network, stateproof: this.stateproof, options, groupBy });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  /**
   * given the network,tokenId, accountId, stateproof, decryptionKey, output
   * the getNftTraceChain() will be able to provide the n-level trustchain for all the NFT transactions happened under a given token and account
   * on the Hedera Blockchain
   * @param accountId (Required, Type: String)
   * @param tokenId (Required, Type: String)
   * @param options.decryptionKey (Optional, Type: String)
   * @param options.output (Optional, Type: String) Absolute path of the file
   */

  async getNftTrustChain(
    tokenId: string,
    accountId: string,
    options: Options,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TrustchainResponse>)
  ) {
    try {
      const result = await getNftTrustChainHandler({ tokenId, accountId, network: this.network, stateproof: this.stateproof, options });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  /**
   * given the network,topic, stateproof, decryptionKey, output
   * the getTopicTraceChainHandler() will be able to provide the n-level trustchain for all the topic messages under a given topic
   * on the Hedera Blockchain
   * @param topic (Required, Type: String)
   * @param options.decryptionKey (Optional, Type: String)
   * @param options.output (Optional, Type: String) Absolute path of the file
   */

  async getTopicTrustChain(
    topic: string,
    options: Options,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<TrustchainResponse>)
  ) {
    try {
      const result = await getTopicTrustChainHandler({ topic, network: this.network, stateproof: this.stateproof, options });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };

  /**
   * given the ipfsUrl, options
   * the getDeviceCertificationDocument() will be able to return the details of the Device Certification Document
   * @param ipfsUrl( Required, Type: String)
   * @param options.tymlezCdn (Required, Type: Boolean)
   * @param options.decryptionKey (Optional, Type: String)
   * @param options.output (Optional, Type: String) Absolute path of the file
   */

  async getDeviceCertificationDocument(
    ipfsUrl: string,
    options: Options,
    callback?: GenericServiceCallback | ((err?: Error | null | undefined, result?: unknown) => Promise<IpfsDocumentResponse>)
  ) {
    try {
      const result = await getDeviceCertificationDocumentHandler({ network: this.network, ipfsUrl, options });
      if (!callback) { return result; }
      return callback(null, result);
    } catch (error) {
      if (!callback) { throw error; }
    }
  };
};
