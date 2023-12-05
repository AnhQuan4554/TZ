/* eslint-disable no-param-reassign */
import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  IGuardianMRV,
  ITrustchain,
  ITokenMintInfoQuery,
  IHederaAccountInfo,
  Trustchain,
  TrustchainV2,
  IHederaTokenClass,
} from '@tymlez/trustchain-sdk';
import { EntityRepository, EntityManager, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import _ from 'lodash';
import type {
  ITokenTotal,
  IMutationResult,
  ITrustChainTokenRecord,
  ITrustChainTopicRecord,
  IIsoDate,
  ITrustChainCommonResult,
  ITrustchainToken,
  IFindResult,
} from '@tymlez/platform-api-interfaces';
import { nanoSecondTimestampToIso, runAllSettled } from '@tymlez/common-libs';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { GuardianToken } from './entities/guardian_token.entity';
import { GuardianTopic } from './entities/guardian_topic.entity';
import { TrustchainToken } from './entities/trustchain_token.entity';
import { TrustchainMRV } from './entities/trustchain_mrv.entity';
import { CreateTrustchainTokenDto } from './dto/create-trustchain-token.dto';
import { CreateTrustchainMRVDto } from './dto/create-trustchain-mrv.dto';
import { ITrustchainMRVsQuery, ITrustchainTokensQuery } from './interfaces';

@Injectable()
export class TrustchainService {
  private readonly logger = new Logger(TrustchainService.name);

  constructor(
    @InjectRepository(GuardianToken)
    private readonly guardianTokenRepository: EntityRepository<GuardianToken>,
    @InjectRepository(GuardianTopic)
    private readonly guardianTopicRepository: EntityRepository<GuardianTopic>,
    @InjectRepository(TrustchainToken)
    private readonly trustchainTokenRepository: EntityRepository<TrustchainToken>,
    @InjectRepository(TrustchainMRV)
    private readonly trustchainMrvRepository: EntityRepository<TrustchainMRV>,
    private readonly em: EntityManager,
  ) {}

  public async getGuardianTokenByTransactionId(
    transactionId: string,
  ): Promise<ITrustChainTokenRecord | null> {
    return await this.guardianTokenRepository.findOne(
      { transactionId },
      { populate: true },
    );
  }

  public async getGuardianTokenByCachingMethod(): Promise<ITrustChainTokenRecord | null> {
    return await this.guardianTokenRepository.findOne(
      { cachingMethod: 'CRON' },
      { populate: true, orderBy: { consensusTimestamp: 'DESC' } },
    );
  }

  public async getGuardianTopicByTopicId(
    topicId: string,
  ): Promise<ITrustChainTopicRecord | null> {
    return await this.guardianTopicRepository.findOne(
      { topicId },
      { populate: true },
    );
  }

  public async addGuardianToken(
    gaurdianToken: ITrustChainTokenRecord,
  ): Promise<IMutationResult> {
    const newGaurdianToken = this.em.create(GuardianToken, {
      ...gaurdianToken,
    } as any);

    try {
      await this.em.persistAndFlush(newGaurdianToken);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  public async addGuardianTopic(
    gaurdianTopic: ITrustChainTopicRecord,
  ): Promise<IMutationResult> {
    const newGaurdianTopic = this.em.create(GuardianTopic, {
      ...gaurdianTopic,
    } as any);

    try {
      await this.em.persistAndFlush(newGaurdianTopic);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  public async getUrl(network: string, endpoint: string): Promise<string> {
    const networkUrl =
      {
        testnet: 'https://testnet.mirrornode.hedera.com',
        mainnet: 'https://mainnet-public.mirrornode.hedera.com',
      }[network] || network;

    return `${networkUrl}${endpoint}`;
  }

  public async getDragonGlassLink(
    network: string,
    endpoint: string,
  ): Promise<string> {
    const networkUrl =
      {
        testnet: 'https://testnet.dragonglass.me',
        mainnet: 'https://app.dragonglass.me',
      }[network] || network;

    return `${networkUrl}${endpoint}`;
  }

  public async getLedgerWorksLink(
    network: string,
    endpoint: string,
  ): Promise<string> {
    const networkUrl =
      {
        testnet: 'https://explore.lworks.io/testnet',
        mainnet: 'https://explore.lworks.io/mainnet',
      }[network] || network;

    return `${networkUrl}${endpoint}`;
  }

  public async getAccountInfo(
    network: string,
    accountId: string,
  ): Promise<IHederaAccountInfo> {
    const url = await this.getUrl(
      network,
      `/api/v1/accounts?account.id=${accountId}`,
    );
    const { data } = await axios.get(url);

    return data?.accounts?.length > 0 ? data?.accounts[0] : undefined;
  }

  public async getAccountTokenClasses(
    network: string,
    accountId: string,
  ): Promise<IHederaTokenClass[]> {
    const url = await this.getUrl(
      network,
      `/api/v1/tokens?account.id=${accountId}`,
    );
    const { data } = await axios.get(url);

    return data?.tokens || [];
  }

  public async getAllTokenForAccount(
    network: string,
    accountId: string,
    startDate: string,
    endDate: string,
    orderBy: string,
    type?: string,
  ): Promise<ITokenTotal> {
    const trustchainSdk = new Trustchain(network, false);
    const result = await trustchainSdk.getTokensUsingAccountIdWithPagination(
      accountId,
      startDate,
      endDate,
      {
        transactionType: 'TOKENMINT',
        populateRelationships: false,
        tymlezCdn: false,
      },
      orderBy,
      type,
    );
    result?.transactions.forEach(async (m: any) => {
      const mintedToken = {
        amount: 1,
        metadata: await this.getTokenMintedValueUOM(m.symbol),
      };
      m.mintedToken = mintedToken;
    });
    return {
      tokens: result?.transactions || [],
      nextStartDate: result?.nextStartDate || '',
      previousStartDate: result?.previousStartDate || '',
      endDate: result?.endDate || '',
    };
  }

  public async getAllTokensUsingRAaccountForCron(
    network: string,
    accountId: string,
    startDate: string,
    endDate: string,
    limit: number,
    type?: string,
  ): Promise<ITokenTotal> {
    const trustchainSdk = new Trustchain(network, false);
    const result = await trustchainSdk.getTokensUsingAccountId(
      accountId,
      startDate,
      endDate,
      {
        transactionType: 'TOKENMINT',
        populateRelationships: false,
        tymlezCdn: true,
      },
      limit,
      type,
    );
    return {
      tokens: result?.transactions || [],
      nextStartDate: '',
      previousStartDate: '',
      endDate: '',
    };
  }

  public async getTrustchainForParticularToken(
    network: string,
    tokenId: string,
    decryptionKey?: string,
  ): Promise<ITrustChainCommonResult> {
    const trustchainSdk = new Trustchain(network, false);
    let result: any;
    if (decryptionKey) {
      result = await trustchainSdk.getTrustChainUsingTransactionId(tokenId, {
        decryptionKey,
        populateRelationships: false,
        tymlezCdn: true,
      });
    } else {
      result = await trustchainSdk.getTrustChainUsingTransactionId(tokenId, {
        populateRelationships: false,
        tymlezCdn: true,
      });
    }

    return {
      transactions: result.transactions || [],
    };
  }

  public async groupTrustchainData(
    data: any,
    groupBy: string,
    messageData: any[],
  ): Promise<any> {
    const dataToMutate = { ...data };
    const vc = dataToMutate.verifiableCredential;
    const tokenMinted = vc.pop();
    const result = _(vc)
      .groupBy((x) => x.credentialSubject[0][groupBy])
      .map((value, key) => ({ [groupBy]: key, vc: value }))
      .value();
    const finalResult: any[] = [];
    result.forEach((element: any) => {
      const deviceData: any = _.find(
        messageData,
        (el: any) =>
          _.get(el, 'ipfsDocument.credentialSubject[0].id') ===
          element.deviceId,
      );
      if (deviceData) {
        finalResult.push({
          ...element,
          ...{
            deviceName: deviceData.ipfsDocument.credentialSubject[0].deviceName,
          },
        });
      } else {
        finalResult.push({
          ...element,
        });
      }
    });
    finalResult.push({
      [groupBy]: tokenMinted.credentialSubject[0].type,
      vc: [tokenMinted],
      deviceName: tokenMinted.credentialSubject[0].type,
    });
    dataToMutate.verifiableCredential = finalResult;
    return dataToMutate;
  }

  public async getTopicMessagesForParticularToken(
    network: string,
    topicId: string,
    decryptionKey?: string,
  ): Promise<ITrustChainCommonResult> {
    const trustchainSdk = new Trustchain(network, false);
    let result: any;
    if (decryptionKey) {
      result = await trustchainSdk.getTopicTrustChain(topicId, {
        decryptionKey,
        populateRelationships: false,
        tymlezCdn: true,
      });
    } else {
      result = await trustchainSdk.getTopicTrustChain(topicId, {
        populateRelationships: false,
        tymlezCdn: true,
      });
    }

    return {
      transactions: result.transactions || [],
    };
  }

  public async filterTopicMessages(data: any): Promise<any> {
    const result: any[] = [];
    const filteredData: any = _.filter(data, { type: 'VC-Document' });
    filteredData.forEach((element: any) => {
      if ('ipfsDocument' in element) {
        const ipfsDocumentData = element.ipfsDocument;
        if ('credentialSubject' in ipfsDocumentData) {
          if ('projectName' in ipfsDocumentData.credentialSubject[0]) {
            result.push({
              category: 'PROJECT',
              name: ipfsDocumentData.credentialSubject[0].projectName,
              date: ipfsDocumentData.issuanceDate,
              input: 'Manual',
              misc: {
                description:
                  ipfsDocumentData.credentialSubject[0].projectDescription,
                type: ipfsDocumentData.credentialSubject[0].projectType,
                id: ipfsDocumentData.credentialSubject[0].projectId,
                standard: ipfsDocumentData.credentialSubject[0].standard,
                country: ipfsDocumentData.credentialSubject[0].country,
              },
            });
          } else if ('siteName' in ipfsDocumentData.credentialSubject[0]) {
            const locationString =
              ipfsDocumentData.credentialSubject[0].GPSLocation;
            let long = '';
            let lat = '';
            const [longitude, ...rest] = locationString.split('-');
            if (locationString.charAt(0) !== '-') {
              lat = rest.join('-');
              long = longitude;
            } else {
              long = `-${rest[0]}`;
              if (rest.length > 2) {
                lat = `-${rest[2]}`;
              } else {
                lat = `${rest[1]}`;
              }
            }
            result.push({
              category: 'SITE',
              name: ipfsDocumentData.credentialSubject[0].siteName,
              date: ipfsDocumentData.issuanceDate,
              input: 'Manual',
              misc: {
                id: ipfsDocumentData.credentialSubject[0].siteId,
                location: `${lat},${long}`,
              },
            });
          } else if ('groupName' in ipfsDocumentData.credentialSubject[0]) {
            result.push({
              category: 'INSTALLER',
              name: ipfsDocumentData.credentialSubject[0].groupName,
              date: ipfsDocumentData.issuanceDate,
              input: 'Manual',
              misc: {
                id: ipfsDocumentData.credentialSubject[0].id,
                owner: ipfsDocumentData.credentialSubject[0].groupOwner,
              },
            });
          } else if ('deviceName' in ipfsDocumentData.credentialSubject[0]) {
            if (
              _.findIndex(result, {
                name: ipfsDocumentData.credentialSubject[0].deviceName,
              }) < 0
            ) {
              result.push({
                category: 'DEVICE',
                name: ipfsDocumentData.credentialSubject[0].deviceName,
                date: ipfsDocumentData.issuanceDate,
                input: 'Manual',
                misc: ipfsDocumentData.credentialSubject[0],
              });
            }
          }
        }
      }
    });
    return result;
  }

  public async getTokenMintedValueUOM(type: string): Promise<any> {
    let valueUOM = '';
    switch (type) {
      case 'TYM_CET':
        valueUOM = 't';
        break;
      case 'TYM_CRU':
        valueUOM = 't';
        break;
      case 'TYM_GOO':
        valueUOM = 't';
        break;
      case 'TYM_REC':
        valueUOM = 'MWh';
        break;
      default:
        break;
    }
    return {
      valueUOM,
    };
  }

  // Start of v2 sdk services
  async fetchTrustchainFromHedera(
    hederaNetwork: string,
    hederaAccountId: string,
    startDatetime: IIsoDate,
    maxNumTokens = 10,
  ) {
    const sdk = new TrustchainV2(hederaNetwork);
    const endDatetime = new Date().toISOString();
    const tokenQuery: ITokenMintInfoQuery = {
      hederaAccountId,
      startDatetime,
      endDatetime,
      order: 'asc',
      maxNumTokens,
      tokenClassIds: undefined,
      includeStateProof: false,
    };
    const { tokenMintInfoArray } = await sdk.queryTokenMints(tokenQuery);
    const truschains: ITrustchain[] = [];

    const results = await runAllSettled(
      tokenMintInfoArray,
      async (tokenMintInfo) => {
        const trustchain = await sdk.getTokenMintTrustchain(tokenMintInfo);
        truschains.push(trustchain);
      },
    );

    const errors = results.filter((res) => res instanceof Error);
    if (errors.length > 0) {
      const errorMsg = errors.map((e) => (e as Error).stack).join('; ');
      throw new Error(errorMsg);
    }

    return truschains;
  }

  public async ingestTrustchains(truschains: ITrustchain[]) {
    const results = await runAllSettled(
      truschains,
      async (truschain) => {
        await this.ingestOneTokenTrustchain(truschain);
        await this.ingestTrustchainMRVs(truschain);
      },
      5,
    );

    const errors = results.filter((res) => res instanceof Error);

    if (errors.length === 0) {
      return {
        success: true,
        message: `Token Ingestion: done`,
      };
    }

    const errorMsg = errors.map((e) => (e as Error).stack).join('; ');
    return {
      success: false,
      message: `Token Ingestion Error: ${errorMsg}`,
    };
  }

  private async ingestOneTokenTrustchain(trustchain: ITrustchain) {
    const txn = trustchain.tokenMintInfo.transaction;
    const valueUom =
      trustchain.tokenMintInfo.tokenClass.symbol === 'TYM_REC' ? 'MWh' : 't';
    const transactionDatetime = nanoSecondTimestampToIso(
      txn.valid_start_timestamp,
    );
    const consensusDatetime = nanoSecondTimestampToIso(txn.consensus_timestamp);

    const tokenDto: CreateTrustchainTokenDto = {
      tokenClassId: trustchain.tokenMintInfo.tokenClass.token_id,
      tokenSymbol: trustchain.tokenMintInfo.tokenClass.symbol,
      value: 1,
      valueUOM: valueUom,
      accountId: trustchain.tokenMintInfo.accountInfo.account,
      transactionDatetime,
      consensusDatetime,
      consensusTimestamp: txn.consensus_timestamp,
      messageId: txn.memo,
      transactionId: txn.transaction_id,
      tokenMintInfo: trustchain.tokenMintInfo,
      site: trustchain.site,
      project: trustchain.project,
      policyInfo: trustchain.policyInfo,
      devices: { count: trustchain.devices.length, items: trustchain.devices },
      installers: {
        count: trustchain.installers.length,
        items: trustchain.installers,
      },
      mrvSummary: trustchain.mrvSummary,
      vpInfo: trustchain.vpInfo,
      createdBy: 'CRON',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['cron'],
    };

    return await (this.em as SqlEntityManager)
      .fork()
      .upsert(TrustchainToken, tokenDto);
  }

  private async ingestTrustchainMRVs(trustchain: ITrustchain) {
    const mrvs = trustchain.mrvs || [];

    const results = await runAllSettled(
      mrvs,
      async (mrv) => {
        await this.ingestOneTrustchainMRV(mrv, trustchain);
      },
      5,
    );

    const errors = results.filter((res) => res instanceof Error);

    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }

    return true;
  }

  private async ingestOneTrustchainMRV(
    mrv: IGuardianMRV,
    trustchain: ITrustchain,
  ) {
    const siteId = trustchain.site?.misc.siteId;
    const tokenClassId = trustchain.tokenMintInfo.tokenClass.token_id;
    const accountId = trustchain.tokenMintInfo.accountInfo.account;
    const transactionId = trustchain.tokenMintInfo.transaction.transaction_id;
    const normalisedMrvId = mrv.id.substring(mrv.id.lastIndexOf(':') + 1);

    const mrvDto: CreateTrustchainMRVDto = {
      id: normalisedMrvId,
      name: mrv.name,
      datetime: mrv.datetime,
      deviceDid: mrv.misc.rawData.deviceId,
      deviceId: mrv.misc.databaseId,
      readingHashes: mrv.misc.readingHashes?.join(','),
      intervalStartDatetime: mrv.misc.rawData.intervalStartDateTime,
      intervalEndDatetime: mrv.misc.rawData.intervalEndDateTime,
      intervalDuration: mrv.misc.rawData.intervalDuration,
      intervalDurationUOM: mrv.misc.rawData.intervalDurationUOM,
      value: mrv.misc.rawData.value,
      valueUOM: mrv.misc.rawData.valueUOM,
      emission: mrv.misc.rawData.CO2eqEmissions,
      emissionUOM: mrv.misc.rawData.emissionsUOM,
      otherMRVData: mrv.misc.otherMRVData,
      rawData: mrv.misc.rawData,
      transactionId,
      tokenClassId,
      siteId,
      accountId,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['cron'],
    };

    return await (this.em as SqlEntityManager)
      .fork()
      .upsert(TrustchainMRV, mrvDto);
  }

  private async getMostRecentTokenFromDB(hederaAccountId: string) {
    try {
      const token = await this.trustchainTokenRepository.findOne(
        { accountId: hederaAccountId, createdBy: 'CRON' },
        {
          orderBy: { consensusTimestamp: QueryOrder.DESC },
        },
      );

      return token || null;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  public async downloadTrustchainData(
    hederaNetwork: string,
    hederaAccountId: string,
  ) {
    const lastDownloadedToken = await this.getMostRecentTokenFromDB(
      hederaAccountId,
    );
    let startDatetime = null;

    if (lastDownloadedToken) {
      startDatetime = lastDownloadedToken.consensusDatetime;
      this.logger.log(
        `fetching token trustchains for account ${hederaAccountId} from last token @ ${startDatetime}`,
      );
    } else {
      const sdk = new TrustchainV2(hederaNetwork);
      const accountInfo = await sdk.getAccountInfo(hederaAccountId);

      if (!accountInfo) {
        throw new Error(`Invalid account id: ${hederaAccountId}`);
      }
      startDatetime = nanoSecondTimestampToIso(accountInfo.created_timestamp);

      this.logger.log(
        `fetching token trustchains for account ${hederaAccountId} from account creation @ ${startDatetime}`,
      );
    }

    const trustchains = await this.fetchTrustchainFromHedera(
      hederaNetwork,
      hederaAccountId,
      startDatetime,
    );

    this.logger.log(
      `fetched ${trustchains.length} token trustchains for account ${hederaAccountId} from ${startDatetime}`,
    );

    if (trustchains.length > 0) {
      const result = await this.ingestTrustchains(trustchains);
      return result;
    }

    return {
      success: false,
      message: 'No new trustchains found',
    };
  }

  public async getTrustchainTokens(
    query: ITrustchainTokensQuery,
    page = 0,
    pageSize = 10,
  ): Promise<IFindResult<ITrustchainToken>> {
    const filterQuery: any = {
      accountId: query.hederaAccountId,
    };
    if (query.startDatetime) {
      filterQuery.consensusDatetime = { $gt: query.startDatetime };
    }
    if (query.endDatetime) {
      filterQuery.consensusDatetime = { $lte: query.endDatetime };
    }
    if (query.tokenClassIds && query.tokenClassIds.length > 0) {
      filterQuery.tokenClassId = { $in: query.tokenClassIds };
    }

    try {
      const [data, count] = await this.trustchainTokenRepository.findAndCount(
        filterQuery,
        {
          orderBy: { consensusDatetime: query.sortOrder.toUpperCase() },
          limit: pageSize,
          offset: page * pageSize,
        },
      );

      return { count, data };
    } catch (err) {
      this.logger.error({ err }, 'Failed getting trustchain tokens');
      return { count: 0, data: [] };
    }
  }

  public async getTrustchainTokenByTxnId(
    txnId: string,
  ): Promise<ITrustchainToken | null> {
    try {
      const txn = await this.trustchainTokenRepository.findOne({
        transactionId: txnId,
      });

      return txn;
    } catch (err) {
      this.logger.error({ err }, 'Failed getting trustchain tokens');
      return null;
    }
  }

  public async getTrustchainMRVs(
    query: ITrustchainMRVsQuery,
    page = 0,
    pageSize = 10,
  ): Promise<IFindResult<TrustchainMRV>> {
    const filterQuery: any = {};

    if (query.hederaAccountId) {
      filterQuery.accountId = query.hederaAccountId;
    }

    if (query.startDatetime) {
      filterQuery.datetime = { $gt: query.startDatetime };
    }
    if (query.endDatetime) {
      filterQuery.datetime = { $lte: query.endDatetime };
    }
    if (query.tokenClassIds && query.tokenClassIds.length > 0) {
      filterQuery.tokenClassId = { $in: query.tokenClassIds };
    }
    if (query.siteId) {
      filterQuery.siteId = query.siteId;
    }
    if (query.transactionId) {
      filterQuery.transactionId = query.transactionId;
    }
    if (query.deviceId) {
      filterQuery.deviceId = query.deviceId;
    }

    try {
      const [data, count] = await this.trustchainMrvRepository.findAndCount(
        filterQuery,
        {
          limit: pageSize,
          offset: page * pageSize,
        },
      );

      return { count, data };
    } catch (err) {
      this.logger.error({ err }, 'Failed getting trustchain MRVs');
      return { count: 0, data: [] };
    }
  }
}
