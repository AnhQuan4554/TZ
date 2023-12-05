import {
  EntityManager,
  EntityRepository,
  MikroORM,
  UseRequestContext,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import {
  EnumPolicyTags,
  runAllSettled,
  SettingKeys,
  waitFor,
} from '@tymlez/common-libs';
import { IVcRecord, IVpRecord } from '@tymlez/platform-api-interfaces';
import crypto from 'crypto';
import _ from 'lodash';
import { reportAPMMetric, reportErrorToNewRelic } from '@tymlez/backend-libs';
import { GuardianService } from '../guardian/guardian.service';
import { SettingService } from '../settings/setting.service';
import { GuardianVpDocument } from './entities/guardian-vp.entity';
import { VerificationService } from './verification.service';

const DEFAULT_PAGE_SIZE = 10;
const PROCESS_ALL_PAGES = true;
const cron = CronExpression.EVERY_10_MINUTES;
// const cron = CronExpression.EVERY_MINUTE;

@Injectable()
export class VerificationCron {
  private readonly logger = new Logger(VerificationCron.name);
  private lastPageIndex = {
    [EnumPolicyTags.Tymlez_GOO]: 1,
    [EnumPolicyTags.Tymlez_CET]: 1,
    [EnumPolicyTags.Tymlez_CRU]: 1,
    [EnumPolicyTags.Tymlez_REC]: 1,
  };

  constructor(
    private schedulerRegistry: SchedulerRegistry,

    @InjectRepository(GuardianVpDocument)
    private readonly vpDocumentRepository: EntityRepository<GuardianVpDocument>,
    public readonly orm: MikroORM,
    public readonly em: EntityManager,
    public readonly guardianService: GuardianService,
    public readonly verificationService: VerificationService,
    private readonly settingService: SettingService,
  ) {}

  @Cron(cron, { name: 'verification-cron' })
  @UseRequestContext()
  async handleCron() {
    const job = this.schedulerRegistry.getCronJob('verification-cron');
    job.stop(); // pausing the cron job

    // add some random 15 second into the interval to avoid peak
    const randSleepTimeMs = Math.floor(Math.random() * 15000);
    await waitFor(randSleepTimeMs);

    this.logger.log(
      { lastRun: this.lastPageIndex },
      'Verification cron job started',
    );
    try {
      await this.processPolicy(
        EnumPolicyTags.Tymlez_GOO,
        SettingKeys.GOO_AGGREGATION_FIELD,
      );
      reportAPMMetric(
        ['Cron_Policy', EnumPolicyTags.Tymlez_GOO, 'Success'].join('.'),
        1,
      );
    } catch (error) {
      this.logger.error(
        { error },
        'Error when running cache verification for policy %s',
        EnumPolicyTags.Tymlez_GOO,
      );
      reportErrorToNewRelic(
        error as Error,
        ['Cron_Policy', EnumPolicyTags.Tymlez_GOO, 'Error'].join('.'),
      );
    }

    try {
      await this.processPolicy(
        EnumPolicyTags.Tymlez_REC,
        SettingKeys.REC_AGGREGATION_FIELD,
      );
      reportAPMMetric(
        ['Cron_Policy', EnumPolicyTags.Tymlez_REC, 'Success'].join('.'),
        1,
      );
    } catch (error) {
      this.logger.error(
        { error },
        'Error when running cache verification for policy %s',
        EnumPolicyTags.Tymlez_REC,
      );

      reportErrorToNewRelic(
        error as Error,
        ['Cron_Policy', EnumPolicyTags.Tymlez_REC, 'Error'].join('.'),
      );
    }

    try {
      await this.processPolicy(
        EnumPolicyTags.Tymlez_CET,
        SettingKeys.CET_AGGREGATION_FIELD,
      );
      reportAPMMetric(
        ['Cron_Policy', EnumPolicyTags.Tymlez_CET, 'Success'].join('.'),
        1,
      );
    } catch (error) {
      this.logger.error(
        { error },
        'Error when running cache verification for policy %s',
        EnumPolicyTags.Tymlez_CET,
      );
      reportErrorToNewRelic(
        error as Error,
        ['Cron_Policy', EnumPolicyTags.Tymlez_CET, 'Error'].join('.'),
      );
    }

    try {
      await this.processPolicy(
        EnumPolicyTags.Tymlez_CRU,
        SettingKeys.CRU_AGGREGATION_FIELD,
      );
      reportAPMMetric(
        ['Cron_Policy', EnumPolicyTags.Tymlez_CRU, 'Success'].join('.'),
        1,
      );
    } catch (error) {
      this.logger.error(
        { error },
        'Error when running cache verification for policy %s',
        EnumPolicyTags.Tymlez_CRU,
      );
      reportErrorToNewRelic(
        error as Error,
        ['Cron_Policy', EnumPolicyTags.Tymlez_CRU, 'Error'].join('.'),
      );
    }
    this.logger.log('Verification cron job finished');
    job.start();
  }

  private async processPolicy(
    policyTag: EnumPolicyTags,
    agreegationKey: string | SettingKeys,
  ) {
    this.logger.log('Running vp cache cron for policy:%s', policyTag);
    const setting = await this.settingService.getDetailByName(agreegationKey);

    const accumulativeFields = setting?.value?.split(',') || [];
    if (accumulativeFields.length === 0) {
      this.logger.warn(
        'Cache process skip for policy %s please update setting key (%s) with aggregation keys',
        policyTag,
        agreegationKey,
      );
      return;
    }
    const processPage = async (pageIndex: number) => {
      this.logger.log(
        'Processing verification for policy :%s page %i',
        policyTag,
        pageIndex,
      );
      this.logger.log('Fetching data from guardian service page=%d', pageIndex);
      const data = await this.verificationService.getVerification({
        page: pageIndex,
        pageSize: DEFAULT_PAGE_SIZE,
        accumulativeFields,
        showVcRecords: false,
        policy: policyTag.replace('_', ''),
      });
      this.logger.log(
        { vpCount: data?.records.length },
        'Successful fetch data from guardian service page=%d',
        pageIndex,
      );

      if (data) {
        await this.persistVpDocuments(data.records, accumulativeFields);
      }
      return data;
    };

    let pageIndex = 0;
    let result = await processPage(pageIndex);

    if (result && result.num >= DEFAULT_PAGE_SIZE && PROCESS_ALL_PAGES) {
      const totalPage = Math.ceil(result.num / DEFAULT_PAGE_SIZE);
      const checkingTag = result.records[0].policy;
      const countQuery = {
        policyTag: checkingTag,
        recordType: 'VP',
      };
      pageIndex = this.lastPageIndex[policyTag];
      if (pageIndex >= totalPage) {
        pageIndex = 1;
        this.lastPageIndex[policyTag] = 1;
      }

      let countFromDb = await this.vpDocumentRepository.count(countQuery);

      let fullfilled = countFromDb >= result.num;

      this.logger.log(
        { policyTag, totalPage, count: result.num, countFromDb },
        'Total verification page to fetch: %d',
        totalPage,
      );
      while (pageIndex <= totalPage && !fullfilled) {
        try {
          // eslint-disable-next-line no-await-in-loop
          result = await processPage(pageIndex);
          this.lastPageIndex[policyTag] = pageIndex;

          pageIndex++;
          // eslint-disable-next-line no-await-in-loop
          countFromDb = await this.vpDocumentRepository.count(countQuery);
          fullfilled = !result || countFromDb >= result?.num;
          this.logger.log(
            { countFromDb, fullfilled, expectedCount: result?.num },
            'Finished process page %d',
            pageIndex,
          );
        } catch (err) {
          pageIndex++;
          console.log(err);
          this.logger.warn(
            { err },
            'Error happen when process verification page, continue processing other page until reach to final page',
          );
          // Swallow , continue process to other pages
        }
      }
    }
  }

  private async persistVpDocuments(
    data: IVpRecord[],
    accumulativeFields: string[],
  ) {
    let inserted = 0;
    let errorCount = 0;
    const insertOrSkip = async (item: IVpRecord) => {
      try {
        const existing = await this.vpDocumentRepository.findOne({
          id: item.vpId,
        });
        if (!existing) {
          this.logger.log('Saving VP record to database %s', item.vpId);
          const newVpItemToBeInsert = this.vpDocumentRepository.create({
            id: item.vpId,
            policyTag: item.policy,
            cacheDate: new Date().toISOString(),
            mintedDate: item.mintedDate,
            CO2Emissions: item.CO2Emissions,
            CO2eqEmissions: item.CO2eqEmissions,
            CO2eqEmissionsReduction: item.CO2eqEmissionsReduction,
            value: item.value,
            memo: item.messageId,
            hash: item.hash,
            tokenId: item.tokenId,
            trustchainUrl: item.onChainUrl,
            meta: item,
            recordType: 'VP',
            otherData: accumulativeFields.reduce(
              (acc, fieldName) => ({
                ...acc,
                [fieldName]: (item as any)[fieldName],
              }),
              {},
            ),
          } as any);
          const vpWithDetails = await this.fetchAllVcDocumentForVp(
            newVpItemToBeInsert,
            accumulativeFields,
            item.policy,
          );

          const countVC = await this.vpDocumentRepository.count({
            hash: vpWithDetails.hash,
          });
          // Sometime guardian hash issue may not return data, we skip this item so next interval it will process again.

          if (vpWithDetails.vcRecords.length === 0 || countVC === 0) {
            const message = `Unable to VC document list for VP : ${item.vpId} - ${item.hash}`;
            this.logger.error(message);
            throw new Error(message);
          }
          if (countVC >= vpWithDetails.vcRecords.length) {
            await this.vpDocumentRepository.persistAndFlush(
              newVpItemToBeInsert,
            );
            inserted++;
          } else {
            if (countVC > 0) {
              await this.vpDocumentRepository.persistAndFlush(
                newVpItemToBeInsert,
              );
            }
            this.logger.warn(
              { countVC, expectedCount: vpWithDetails.vcRecords.length },
              'Skipped persist vp records as vc count is not matches with expected vc count',
            );
          }
        }
      } catch (error) {
        //swallow
        errorCount++;
        this.logger.error(
          { error },
          'Unable to persist vp records %s',
          item.vpId,
        );
      }
    };
    await runAllSettled(data, insertOrSkip, 1);
    this.logger.log(
      `Inserted ${inserted} VP records, error count : ${errorCount}`,
    );
    return inserted;
  }

  async fetchAllVcDocumentForVp(
    originalVP: GuardianVpDocument,
    accumulativeFields: string[],
    policyTag: string,
  ) {
    this.logger.log(
      'Getting vp data with all vc recors hash =%s',
      originalVP.hash,
    );
    const vp = await this.verificationService.getVpRecord({
      hash: originalVP.hash,
      policy: policyTag,
      accumulativeFields,
    });
    this.logger.log(
      { count: vp.vcRecords.length },
      'Successful fetch vc records for vp hash = %s',
      originalVP.hash,
    );

    const allVC = vp.vcRecords.map((item: IVcRecord, index: number) => {
      const uniqueKey =
        item.vcId ||
        crypto
          .createHash('sha256')
          .update(
            `${index}-${vp.hash}-${item.readingId}}-${item.intervalStartDateTime}-${item.intervalEndDateTime}-${item.vcId}`,
          )
          .digest('hex');
      const newVpItemToBeInsert = this.vpDocumentRepository.create({
        id: uniqueKey,
        policyTag: vp.policy,
        intervalEndDateTime: item.intervalEndDateTime,
        intervalStartDateTime: item.intervalStartDateTime,
        intervalDuration: item.intervalDuration,
        intervalDurationUOM: item.intervalDurationUOM,
        cacheDate: new Date().toISOString(),
        mintedDate: vp.mintedDate,
        CO2Emissions: item.CO2Emissions,
        emissionsUOM: item.emissionsUOM,
        emissionsReductionUOM: item.emissionsReductionUOM,
        valueUOM: item.valueUOM,
        CO2eqEmissions: item.CO2eqEmissions,
        CO2eqEmissionsReduction: item.CO2eqEmissionsReduction,
        value: item.value,
        memo: '',
        hash: vp.hash,
        tokenId: vp.tokenId,
        meta: item,
        recordType: 'VC',
        otherData: JSON.parse(item.otherMRVData || '{}'),
      } as any);

      return newVpItemToBeInsert;
    });

    const existing = await this.vpDocumentRepository.find(
      {
        id: allVC.map((x) => x.id),
        recordType: 'VC',
      },
      { fields: ['id'] },
    );

    const notExistingItems = _.unionBy(
      allVC.filter((vc) => !existing.find((x) => x.id === vc.id)),
      'id',
    );

    this.logger.log(
      { count: vp.vcRecords.length },
      'Inserting %d vc for vp %s',
      notExistingItems.length,
      vp.vpId,
    );
    await this.vpDocumentRepository.persistAndFlush(notExistingItems);

    return vp;
  }
}
