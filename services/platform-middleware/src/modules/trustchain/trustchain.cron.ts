import { EntityManager, MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { runAll, runAllSettled } from '@tymlez/common-libs';
import crypto from 'crypto';
import _ from 'lodash';
import type {
  ITrustChainTokenRecord,
  ITrustChainTokenRecordHashed,
  ITrustChainTopicRecord,
  ITrustChainTopicExpandedRecord,
} from '@tymlez/platform-api-interfaces';
import { getProxy } from '@tymlez/backend-libs';
import { TrustchainService } from './trustchain.service';
import { SettingService } from '../settings/setting.service';
import { StorageService } from './storage/storage.service';

const cron = CronExpression.EVERY_5_MINUTES;
// const cron = CronExpression.EVERY_MINUTE;

@Injectable()
export class TrustchainCron {
  private readonly logger = new Logger(TrustchainCron.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly settingService: SettingService,
    private trustchainService: TrustchainService,
    private storageService: StorageService,
    public readonly orm: MikroORM,
    public readonly em: EntityManager,
  ) {}

  @Cron(cron, { name: 'trustchain-cron' })
  @UseRequestContext()
  async handleCron() {
    const job = this.schedulerRegistry.getCronJob('trustchain-cron');
    job.stop(); // pausing the cron job

    this.logger.log('Trustchain cron job started');
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    let endDate = new Date();
    try {
      const cachedCronResult =
        await this.trustchainService.getGuardianTokenByCachingMethod();
      if (cachedCronResult) {
        startDate = new Date(
          Math.ceil(Number(cachedCronResult.consensusTimestamp) * 1000),
        );
        endDate = new Date();
      }
      await this.getAllTokenForAccount(
        new Date(startDate).toISOString(),
        new Date(endDate).toISOString(),
      );
    } catch (error) {
      this.logger.error(
        { error },
        'Error while collecting tokens between %s and %s',
        new Date(startDate).toISOString(),
        new Date(endDate).toISOString(),
      );
      //
    }

    this.logger.log(
      'Trustchain cron job finished for %s and %s',
      new Date(startDate).toISOString(),
      new Date(endDate).toISOString(),
    );
    job.start();
  }

  private async getAllTokenForAccount(startDate: string, endDate: string) {
    this.logger.log('Running getAllTokenForAccount function');
    const executionStartTime = new Date();
    const trustchainSettings = await this.settingService.getByGroup(
      'TrustChain',
    );
    const hederaAccountId =
      trustchainSettings.TrustchainDefaultAccount.split(',');
    const hederaNetwork = trustchainSettings.TrustchainDefaultNetwork;
    try {
      const tokensProcessed: string[] = [];
      await runAllSettled(hederaAccountId, async (accountId: string) => {
        this.logger.log(`for accountId: %s`, JSON.stringify(accountId));
        const result =
          await this.trustchainService.getAllTokensUsingRAaccountForCron(
            hederaNetwork,
            accountId,
            startDate,
            endDate,
            50,
          );
        this.logger.log(
          `number of tokens: %s`,
          JSON.stringify(result.tokens.length),
        );
        if (result.tokens.length > 0) {
          await runAllSettled(
            result.tokens,
            async (token: any) => {
              const tokenData = await this.getTrustchainForParticularTokenV2(
                token.transaction_id,
                token.root_authority,
              );
              tokensProcessed.push(tokenData.transactionId);
            },
            10,
          );
        }
      });
      this.logger.log(`tokensProcessed: %s`, JSON.stringify(tokensProcessed));
      const executionTime =
        (new Date().getTime() - executionStartTime.getTime()) / 1000;
      this.logger.log(
        `executionTime: %s seconds`,
        JSON.stringify(executionTime),
      );
      return tokensProcessed;
    } catch (err: any) {
      const executionTime =
        (new Date().getTime() - executionStartTime.getTime()) / 1000;
      this.logger.log(
        `executionTime: %s seconds`,
        JSON.stringify(executionTime),
      );
      throw new Error(err.message);
    }
  }

  private async getTrustchainForParticularTokenV2(
    id: string,
    accountId: string,
  ) {
    let tokenId = id;
    const trustchainSettings = await this.settingService.getByGroup(
      'TrustChain',
    );
    const hederaAccountId = accountId;
    const hederaNetwork = trustchainSettings.TrustchainDefaultNetwork;
    const defaultDecryptionKey =
      JSON.parse(trustchainSettings.TrustchainDefaultDecryptionKey)[
        hederaAccountId
      ] || trustchainSettings.TrustchainDefaultDecryptionKey;

    if (id && !id.includes('-')) {
      const url = await this.trustchainService.getUrl(
        hederaNetwork,
        `/api/v1/topics/messages/${id}`,
      );
      const data = await getProxy<any>(url, '', '');
      if (data) {
        const { account_id, transaction_valid_start } =
          data.chunk_info.initial_transaction_id;
        const getTransactionsUrl = await this.trustchainService.getUrl(
          hederaNetwork,
          `/api/v1/transactions/?account.id=${account_id}&timestamp=gt:${transaction_valid_start}&transactionType=TOKENMINT`,
        );
        try {
          const transactionsData = await getProxy<any>(
            getTransactionsUrl,
            '',
            '',
          );
          if (transactionsData) {
            const { transactions } = transactionsData;
            if (transactions && transactions.length > 0) {
              const tokenMint = transactions[0];
              tokenId = tokenMint.transaction_id;
            }
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      }
    }

    const cachedToken =
      await this.trustchainService.getGuardianTokenByTransactionId(tokenId);

    if (cachedToken) {
      this.logger.log(`Already cached token: ${tokenId}`);
      try {
        cachedToken.cachingMethod = 'CRON';
        this.logger.log(`cachedToken: ${tokenId}, data: ${cachedToken}`);
        await this.trustchainService.addGuardianToken(cachedToken);
        const finalTransactionData = { ...cachedToken };
        const vpDataFromS3 = await this.storageService.getDocumentDataFromS3(
          `${hederaAccountId}/${finalTransactionData.vpDocument}`,
        );
        finalTransactionData.vpDocument = vpDataFromS3;
        const cachedTopic =
          await this.trustchainService.getGuardianTopicByTopicId(
            finalTransactionData.topicId,
          );
        const cachedTopicExpanded: ITrustChainTopicExpandedRecord = {
          topicId: '',
          messages: [],
          cachedTimestamp: null,
        };
        if (cachedTopic) {
          this.logger.log(`Already cached topic: ${cachedTopic.topicId}`);
          try {
            const topicDataFromS3 =
              await this.storageService.getDocumentDataFromS3(
                `${hederaAccountId}/${cachedTopic.messages}`,
              );
            topicDataFromS3.forEach((element: any) => {
              if (
                !element.decodedMessage.ipfsDocument?.credentialSubject?.[0]
                  ?.readingId
              ) {
                cachedTopicExpanded.messages.push(element.decodedMessage);
              }
            });
            cachedTopicExpanded.topicId = cachedTopic.topicId;
            cachedTopicExpanded.cachedTimestamp = cachedTopic.cachedTimestamp;
          } catch (err: any) {
            throw new Error(
              `${err.message} key: ${hederaAccountId}/${cachedTopic.messages} from S3 bucket.`,
            );
          }
        } else {
          let topicData;
          try {
            this.logger.log(
              `Caching new topic: ${finalTransactionData.topicId}`,
            );
            topicData =
              await this.trustchainService.getTopicMessagesForParticularToken(
                hederaNetwork,
                finalTransactionData.topicId,
                defaultDecryptionKey,
              );
          } catch (err: any) {
            throw new Error(
              `Error fetching the topic: ${finalTransactionData.topicId} from Gaurdian.`,
            );
          }
          const topicS3DocumentData =
            await this.storageService.saveDocumentDataToS3(
              `${hederaAccountId}/${finalTransactionData.topicId}`,
              topicData.transactions,
            );
          const guardianTopicDataToCache: ITrustChainTopicRecord = {
            topicId: finalTransactionData.topicId,
            messages: topicS3DocumentData.name,
            cachedTimestamp: new Date().toISOString(),
          };
          await this.trustchainService.addGuardianTopic(
            guardianTopicDataToCache,
          );
          topicData.transactions.forEach((element: any) => {
            if (
              !element.decodedMessage.ipfsDocument?.credentialSubject?.[0]
                ?.readingId
            ) {
              cachedTopicExpanded.messages.push(element.decodedMessage);
            }
          });
          cachedTopicExpanded.topicId = guardianTopicDataToCache.topicId;
          cachedTopicExpanded.cachedTimestamp =
            guardianTopicDataToCache.cachedTimestamp;
        }
        finalTransactionData.vpDocument =
          await this.trustchainService.groupTrustchainData(
            finalTransactionData.vpDocument,
            'deviceId',
            cachedTopicExpanded.messages,
          );
        const filteredTopicMessageData =
          await this.trustchainService.filterTopicMessages(
            cachedTopicExpanded.messages,
          );
        const finalTransactionHashed: ITrustChainTokenRecordHashed = {
          ...finalTransactionData,
          ...{
            hashId: crypto
              .createHash('md5')
              .update(JSON.stringify(finalTransactionData))
              .digest('hex'),
            topicMessages: cachedTopicExpanded.messages,
            filteredTopicMessages: filteredTopicMessageData,
            dragonGlassLink: await this.trustchainService.getDragonGlassLink(
              hederaNetwork,
              `/hedera/search?q=${finalTransactionData.memo}`,
            ),
            ledgerWorksLink: await this.trustchainService.getLedgerWorksLink(
              hederaNetwork,
              `/transactions/${finalTransactionData.transactionId}`,
            ),
          },
        };
        return finalTransactionHashed;
      } catch (err: any) {
        throw new Error(err.message);
      }
    }
    try {
      this.logger.log(`Caching new token: ${tokenId}`);
      const accountTokenClasses =
        await this.trustchainService.getAccountTokenClasses(
          hederaNetwork,
          hederaAccountId,
        );
      const result =
        await this.trustchainService.getTrustchainForParticularToken(
          hederaNetwork,
          tokenId,
          defaultDecryptionKey,
        );
      if (result?.transactions.length === 0) {
        throw new Error(
          `Error fetching details of token: ${tokenId} from Gaurdian.`,
        );
      }
      const tokenClass = _.find(accountTokenClasses, {
        // todo: this logic is problematic
        token_id: result?.transactions[0]?.entity_id,
      });
      if (!tokenClass) {
        throw new Error(
          `Transaction token id does not match the Hedera account.`,
        );
      }
      const mutatedTransaction: ITrustChainTokenRecord = {
        name: result?.transactions[0].name,
        entityId: result?.transactions[0].entity_id,
        memo: result?.transactions[0].memo,
        consensusTimestamp: result?.transactions[0].consensus_timestamp,
        transactionHash: result?.transactions[0].transaction_hash,
        transactionId: result?.transactions[0].transaction_id,
        rootAuthority: hederaAccountId,
        adminKey: tokenClass.admin_key,
        symbol: tokenClass.symbol,
        tokenId: tokenClass.token_id,
        type: tokenClass?.type,
        mintedToken: null,
        vpDocument: '',
        cachedTimestamp: new Date().toISOString(),
        topicId: result?.transactions[0]?.message.messages[0].topic_id,
        cachingMethod: 'CRON',
      };
      const cachedTopic =
        await this.trustchainService.getGuardianTopicByTopicId(
          mutatedTransaction.topicId,
        );
      const cachedTopicExpanded: ITrustChainTopicExpandedRecord = {
        topicId: '',
        messages: [],
        cachedTimestamp: null,
      };
      if (cachedTopic) {
        this.logger.log(`Already cached topic: ${cachedTopic.topicId}`);
        try {
          const topicDataFromS3 =
            await this.storageService.getDocumentDataFromS3(
              `${hederaAccountId}/${cachedTopic.messages}`,
            );
          topicDataFromS3.forEach((element: any) => {
            if (
              !element.decodedMessage.ipfsDocument?.credentialSubject?.[0]
                ?.readingId
            ) {
              cachedTopicExpanded.messages.push(element.decodedMessage);
            }
          });
          cachedTopicExpanded.topicId = cachedTopic.topicId;
          cachedTopicExpanded.cachedTimestamp = cachedTopic.cachedTimestamp;
        } catch (err: any) {
          throw new Error(
            `${err.message} key: ${hederaAccountId}/${cachedTopic.messages} from S3 bucket.`,
          );
        }
      } else {
        this.logger.log(`Caching new topic: ${mutatedTransaction.topicId}`);
        try {
          const topicData =
            await this.trustchainService.getTopicMessagesForParticularToken(
              hederaNetwork,
              mutatedTransaction.topicId,
              defaultDecryptionKey,
            );
          const topicS3DocumentData =
            await this.storageService.saveDocumentDataToS3(
              `${hederaAccountId}/${mutatedTransaction.topicId}`,
              topicData.transactions,
            );
          const guardianTopicDataToCache: ITrustChainTopicRecord = {
            topicId: mutatedTransaction.topicId,
            messages: topicS3DocumentData.name,
            cachedTimestamp: new Date().toISOString(),
          };
          await this.trustchainService.addGuardianTopic(
            guardianTopicDataToCache,
          );
          topicData.transactions.forEach((element: any) => {
            if (
              !element.decodedMessage.ipfsDocument?.credentialSubject?.[0]
                ?.readingId
            ) {
              cachedTopicExpanded.messages.push(element.decodedMessage);
            }
          });
          cachedTopicExpanded.topicId = guardianTopicDataToCache.topicId;
          cachedTopicExpanded.cachedTimestamp =
            guardianTopicDataToCache.cachedTimestamp;
        } catch (err: any) {
          throw new Error(err.message);
        }
      }
      if (result.transactions[0].message.decodedMessage.ipfsDocument) {
        const vpDocumentData =
          result.transactions[0].message.decodedMessage.ipfsDocument;
        vpDocumentData.verifiableCredential[
          vpDocumentData.verifiableCredential.length - 1
        ].credentialSubject[0].metadata =
          await this.trustchainService.getTokenMintedValueUOM(
            mutatedTransaction.symbol,
          );
        const vpS3DocumentData = await this.storageService.saveDocumentDataToS3(
          `${hederaAccountId}/${mutatedTransaction.transactionId}`,
          vpDocumentData,
        );
        mutatedTransaction.vpDocument = vpS3DocumentData.name;
        mutatedTransaction.mintedToken =
          vpDocumentData.verifiableCredential[
            vpDocumentData.verifiableCredential.length - 1
          ];
        await this.trustchainService.addGuardianToken(mutatedTransaction);
        mutatedTransaction.vpDocument = vpDocumentData;
        mutatedTransaction.vpDocument =
          await this.trustchainService.groupTrustchainData(
            mutatedTransaction.vpDocument,
            'deviceId',
            cachedTopicExpanded.messages,
          );
      }
      const filteredTopicMessageData =
        await this.trustchainService.filterTopicMessages(
          cachedTopicExpanded.messages,
        );
      const mutatedTransactionHashed: ITrustChainTokenRecordHashed = {
        ...mutatedTransaction,
        ...{
          hashId: crypto
            .createHash('md5')
            .update(JSON.stringify(mutatedTransaction))
            .digest('hex'),
          topicMessages: cachedTopicExpanded.messages,
          filteredTopicMessages: filteredTopicMessageData,
          dragonGlassLink: await this.trustchainService.getDragonGlassLink(
            hederaNetwork,
            `/hedera/search?q=${mutatedTransaction.memo}`,
          ),
          ledgerWorksLink: await this.trustchainService.getLedgerWorksLink(
            hederaNetwork,
            `/transactions/${mutatedTransaction.transactionId}`,
          ),
        },
      };
      return mutatedTransactionHashed;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  // New cron for v2
  @Cron(cron, { name: 'trustchain-fetch-cron' })
  @UseRequestContext()
  async fetchTrustchain() {
    const job = this.schedulerRegistry.getCronJob('trustchain-fetch-cron');
    job.stop(); // pausing any running cron job just in case
    try {
      this.logger.log('V2 Trustchain fetch cron job started');
      const trustchainSettings = await this.settingService.getByGroup(
        'TrustChain',
      );

      const hederaAccountIds: string[] =
        trustchainSettings.TrustchainActiveAccounts?.split(',') || [];
      const hederaNetwork = trustchainSettings.TrustchainDefaultNetwork;

      if (hederaAccountIds.length === 0) {
        this.logger.log(
          'V2 Trustchain: No "TrustchainActiveAccounts" set for the cron job',
        );
      }

      await runAll(hederaAccountIds, async (hederaAccountId: string) => {
        this.logger.log(
          `V2 Trustchain: Downloading trustchain for account:${hederaAccountId}`,
        );
        const result = await this.trustchainService.downloadTrustchainData(
          hederaNetwork,
          hederaAccountId,
        );
        this.logger.log(result);
      });
    } catch (err: any) {
      this.logger.error(err.message);
    }

    job.start();
  }
}
