import _ from 'lodash';
import crypto from 'crypto';
import {
  Controller,
  Get,
  Query,
  Param,
  ParseEnumPipe,
  DefaultValuePipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import type {
  ITokenTotal,
  ISingleValueHttpResponse,
  ITrustChainTokenRecord,
  ITrustChainTokenRecordHashed,
  ITrustChainTopicRecord,
  ITrustChainTopicExpandedRecord,
  ITrustchainToken,
  IMultiValueHttpResponse,
  ITrustchainMRV,
} from '@tymlez/platform-api-interfaces';
import {
  FirebaseAuthGuard,
  getProxy,
  PermissionGuard,
  Permissions,
} from '@tymlez/backend-libs';
import { PERMISSIONS, safeJsonParse } from '@tymlez/common-libs';
import { TrustchainV2 } from '@tymlez/trustchain-sdk';
import type {
  IHederaAccountInfo,
  IHederaTokenClass,
} from '@tymlez/trustchain-sdk';
import { TrustchainService } from './trustchain.service';
import { SettingService } from '../settings/setting.service';
import { StorageService } from './storage/storage.service';
import { ITrustchainMRVsQuery, ITrustchainTokensQuery } from './interfaces';

@Controller('trustchain')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class TrustchainController {
  constructor(
    private trustchainService: TrustchainService,
    private readonly settingService: SettingService,
    private storageService: StorageService,
  ) {}

  @Get('/accounts/:id')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async accountInfo(
    @Param('id') accountId: string,
    @Query(
      'network',
      new DefaultValuePipe('testnet'),
      new ParseEnumPipe(
        {
          testnet: 'testnet',
          mainnet: 'mainnet',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid network value');
          },
        },
      ),
    )
    network: string,
  ): Promise<ISingleValueHttpResponse<IHederaAccountInfo>> {
    try {
      const result = await this.trustchainService.getAccountInfo(
        network,
        accountId,
      );
      return {
        success: true,
        data: result || null,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/accounts/:id/token-classes')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async accountTokenInfo(
    @Param('id') accountId: string,
    @Query(
      'network',
      new DefaultValuePipe('testnet'),
      new ParseEnumPipe(
        {
          testnet: 'testnet',
          mainnet: 'mainnet',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid network value');
          },
        },
      ),
    )
    network: string,
  ): Promise<ISingleValueHttpResponse<IHederaTokenClass[]>> {
    try {
      const result = await this.trustchainService.getAccountTokenClasses(
        network,
        accountId,
      );
      return {
        success: true,
        data: result,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/token')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async getAllTokenForAccount(
    @Query('accountId') accountId: string,
    @Query('network') network: string,
    @Query('startDateTime') startDateTime: string,
    @Query('endDateTime') endDateTime: string,
    @Query('sortBy') sortBy: string,
    @Query('type') type: string,
  ): Promise<ISingleValueHttpResponse<ITokenTotal>> {
    let startDate = startDateTime;
    let endDate = endDateTime;
    if (!startDate) {
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      startDate = start.toISOString();
    }
    if (!endDate) {
      const end = new Date();
      end.setUTCHours(23, 59, 59, 999);
      endDate = end.toISOString();
    }
    const trustchainSettings = await this.settingService.getByGroup(
      'TrustChain',
    );
    const hederaAccountId =
      accountId || trustchainSettings.TrustchainDefaultAccount;
    const hederaNetwork =
      network || trustchainSettings.TrustchainDefaultNetwork;
    const dateOrder = sortBy || 'asc';

    try {
      const result = await this.trustchainService.getAllTokenForAccount(
        hederaNetwork,
        hederaAccountId,
        startDate,
        endDate,
        dateOrder,
        type,
      );
      return {
        success: true,
        data: result,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/v2/token/:id')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async getTrustchainForParticularTokenV2(
    @Query('accountId') accountId: string,
    @Query('network') network: string,
    @Query('decryptionKey') decryptionKey: string,
    @Param('id') id: string,
  ): Promise<ISingleValueHttpResponse<ITrustChainTokenRecordHashed | null>> {
    let tokenId = id;
    const trustchainSettings = await this.settingService.getByGroup(
      'TrustChain',
    );
    let hederaAccountId =
      accountId || trustchainSettings.TrustchainDefaultAccount;
    const hederaNetwork =
      network || trustchainSettings.TrustchainDefaultNetwork;

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
              hederaAccountId = account_id;
            }
          }
        } catch (err: any) {
          return {
            success: false,
            message: err.message,
          };
        }
      }
    }

    const decryptionKeyInSettings =
      trustchainSettings.TrustchainDefaultDecryptionKey;
    const jsonDecryptionKey = safeJsonParse(decryptionKeyInSettings, {});

    const defaultDecryptionKey =
      decryptionKey ||
      jsonDecryptionKey[hederaAccountId] ||
      decryptionKeyInSettings;

    const cachedToken =
      await this.trustchainService.getGuardianTokenByTransactionId(tokenId);

    if (cachedToken) {
      try {
        const finalTransactionData = cachedToken;
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
            return {
              success: false,
              message: `${err.message} key: ${hederaAccountId}/${cachedTopic.messages} from S3 bucket.`,
            };
          }
        } else {
          let topicData;
          try {
            topicData =
              await this.trustchainService.getTopicMessagesForParticularToken(
                hederaNetwork,
                finalTransactionData.topicId,
                defaultDecryptionKey,
              );
          } catch (err: any) {
            return {
              success: false,
              message: `Error fetching the topic: ${finalTransactionData.topicId} from Gaurdian.`,
            };
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
        return {
          success: true,
          data: finalTransactionHashed || null,
        };
      } catch (err: any) {
        return {
          success: false,
          message: err.message,
        };
      }
    }
    try {
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
        cachingMethod: 'API',
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
          return {
            success: false,
            message: `${err.message} key: ${hederaAccountId}/${cachedTopic.messages} from S3 bucket.`,
          };
        }
      } else {
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
          return {
            success: false,
            message: err.message,
          };
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
      return {
        success: true,
        data: mutatedTransactionHashed || null,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  // =================================
  // Start using v2 Trustchain SDK
  // =================================
  @Get('/v2/accounts/:id')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async accountInfoV2(
    @Param('id') accountId: string,
    @Query(
      'network',
      new DefaultValuePipe('testnet'),
      new ParseEnumPipe(
        {
          testnet: 'testnet',
          mainnet: 'mainnet',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid network value');
          },
        },
      ),
    )
    network: string,
  ): Promise<ISingleValueHttpResponse<IHederaAccountInfo>> {
    try {
      const sdk = new TrustchainV2(network);
      const result = await sdk.getAccountInfo(accountId);

      return {
        success: true,
        data: result,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/v2/accounts/:id/token-classes')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async accountTokenClassesV2(
    @Param('id') accountId: string,
    @Query(
      'network',
      new DefaultValuePipe('testnet'),
      new ParseEnumPipe(
        {
          testnet: 'testnet',
          mainnet: 'mainnet',
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid network value');
          },
        },
      ),
    )
    network: string,
  ): Promise<ISingleValueHttpResponse<IHederaTokenClass[]>> {
    try {
      const sdk = new TrustchainV2(network);
      const result = await sdk.getTokenClasses(accountId);
      return {
        success: true,
        data: result,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/v2/tokens')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async tokens(
    @Query('accountId') accountId: string,
    @Query('startDatetime') startDatetime: string,
    @Query('endDatetime') endDatetime: string,
    @Query('sortOrder') sortOrder: string,
    @Query('tokenClassId') tokenClassId: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<IMultiValueHttpResponse<ITrustchainToken>> {
    const query: ITrustchainTokensQuery = {
      hederaAccountId: accountId,
      sortOrder: sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc',
    };

    if (tokenClassId) {
      query.tokenClassIds = tokenClassId.split(',');
    }

    if (startDatetime) {
      query.startDatetime = new Date(startDatetime).toISOString();
    }

    if (endDatetime) {
      query.endDatetime = new Date(endDatetime).toISOString();
    }

    try {
      const { count, data } = await this.trustchainService.getTrustchainTokens(
        query,
        page || 0,
        pageSize || 10,
      );

      return {
        success: true,
        count,
        data,
      };
    } catch (err: any) {
      return {
        count: 0,
        success: false,
        message: err.message,
        data: [],
      };
    }
  }

  @Get('/v2/tokens/:transactionId')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async tokenByTxnId(
    @Param('transactionId') transactionId: string,
  ): Promise<ISingleValueHttpResponse<ITrustchainToken>> {
    try {
      const token = await this.trustchainService.getTrustchainTokenByTxnId(
        transactionId,
      );

      return {
        success: !!token,
        data: token || undefined,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Get('/v2/mrvs')
  @Permissions(
    PERMISSIONS.ALL_RESOURCE_WRITE,
    PERMISSIONS.ALL_RESOURCE_READ,
    PERMISSIONS.TRUSTCHAIN_READ,
  )
  async mrvs(
    @Query('accountId') accountId: string,
    @Query('startDatetime') startDatetime: string,
    @Query('endDatetime') endDatetime: string,
    @Query('tokenClassId') tokenClassId: string,
    @Param('transactionId') transactionId: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 100,
  ): Promise<IMultiValueHttpResponse<ITrustchainMRV>> {
    const query: ITrustchainMRVsQuery = {
      hederaAccountId: accountId,
    };
    if (tokenClassId) {
      query.tokenClassIds = tokenClassId.split(',');
    }

    if (transactionId) {
      query.transactionId = transactionId;
    }

    if (startDatetime) {
      query.startDatetime = new Date(startDatetime).toISOString();
    }

    if (endDatetime) {
      query.endDatetime = new Date(endDatetime).toISOString();
    }

    try {
      const { count, data } = await this.trustchainService.getTrustchainMRVs(
        query,
        page || 0,
        pageSize || 100,
      );

      return {
        success: true,
        count,
        data,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
        count: 0,
      };
    }
  }
}
