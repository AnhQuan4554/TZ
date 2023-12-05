import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import {
  fromPairs,
  groupBy,
  isNull,
  omitBy,
  pick,
  round,
  sum,
  toPairs,
} from 'lodash';

import {
  METRIC_NAMES,
  reportAPMMetric,
  reportErrorToNewRelic,
  storeFileToS3,
} from '@tymlez/backend-libs';
import {
  EnumMrvAprrovedStatus,
  EnumMrvStatus,
  formatDate,
  EnumPolicyTags,
  SettingGroups,
  SettingKeys,
} from '@tymlez/common-libs';
import {
  IFindOneResult,
  IFindResult,
  IMrv,
  IMrvQuery,
  IMrvProcessRequest,
  IMutationResult,
  IPendingMrv,
  IMrvSummary,
} from '@tymlez/platform-api-interfaces';
import crypto from 'crypto';
import { MeterData } from '../meter-data/entities/meter-data.entity';
import { MeterDataService } from '../meter-data/meter-data.service';
import { SettingService } from '../settings/setting.service';
import { Mrv } from './entities/mrv.entity';
import { CreateMRVDto } from './dto/mrv.dto';
import { MeterTaskService } from '../meter-task/meter-task.service';
import { MeterJobService } from '../meter-job/meter-job.service';
import { GuardianService } from '../guardian/guardian.service';

interface ISummaryData {
  sent: Boolean;
  co2emission: number;
  readingvalue: number;
  co2reduction: number;
  policyTag: string;
}
@Injectable()
export class MrvService {
  public storageS3BucketName: string;

  constructor(
    @InjectRepository(Mrv)
    private mrvRepo: EntityRepository<Mrv>,
    private meterDataService: MeterDataService,
    private settingService: SettingService,
    private meterTaskService: MeterTaskService,
    private meterJobService: MeterJobService,
    private em: EntityManager,
    private readonly logger: PinoLogger,
    private readonly guardianService: GuardianService,
  ) {
    this.logger.setContext(MrvService.name);
    this.storageS3BucketName = process.env.ASSET_BUCKET_NAME || 'local';
  }

  public async prepareMrvAt(request: IMrvProcessRequest) {
    const scopedEm = this.em.fork();
    const result = {
      success: true,
      message: '',
      data: {
        markAsDone: false,
      },
    };
    try {
      const meterJob = await this.getMeterJob(request);
      const meter = meterJob?.meter;

      if (!meter?.device) {
        throw new Error('Meter has no linked device');
      }

      if (!meter?.device?.isPublished) {
        throw new Error('Device linked to the meter has not been published');
      }

      const policyTag = meterJob.tags?.[0] || EnumPolicyTags.Tymlez_CET;
      const jobSettings =
        typeof meterJob.settings === 'object'
          ? meterJob.settings
          : JSON.parse((meterJob.settings as any) || '{}');

      const [
        readingMetricName,
        readingConversionRate = 1,
        emissionMetricName,
        co2EQEmissionMetricName,
        ch4MetricName,
        no2MetricName,
        reductionMetricName,
        otherMRVDataMetricNames,
        skipMeterAssociation,
        carbonEmissionConversionRate = 1,
        CarbonReductionConversionRate = 1,
        defaultOtherMRVData = {},
      ] = [
        SettingKeys.READING_METRIC_NAME,
        SettingKeys.READING_CONVERSION_RATE,
        SettingKeys.CARBON_EMISSION_METRIC_NAME,
        SettingKeys.CARBON_EQ_EMISSION_METRIC_NAME,
        SettingKeys.CH4_METRIC_NAME,
        SettingKeys.NO2_METRIC_NAME,
        SettingKeys.CARBON_REDUSSION_METRIC_NAME,
        SettingKeys.OTHER_MRV_DATA_METRIC_NAME,
        SettingKeys.SKIP_METER_ASSOCIATION,
        SettingKeys.CARBON_EMISSION_CONVERSION_RATE,
        SettingKeys.CARBON_REDUCTION_CONVERSION_RATE,
        SettingKeys.DEFAULT_OTHER_MRV_DATA,
      ].map((name) => jobSettings[name]);

      if (
        !readingMetricName ||
        (policyTag === EnumPolicyTags.Tymlez_CET && !emissionMetricName) ||
        (policyTag === EnumPolicyTags.Tymlez_CRU && !reductionMetricName)
      ) {
        throw new Error(`No metric name setting for policy:  ${policyTag}`);
      }

      const [
        readingDataSource,
        emissionDataSource,
        reductionDataSource,
        otherMrvDataSource,
        co2EqEmissionDataSource,
        ch4DataSource,
        no2DataSource,
      ] = (await Promise.all(
        [
          readingMetricName,
          emissionMetricName,
          reductionMetricName,
          otherMRVDataMetricNames,
          co2EQEmissionMetricName,
          ch4MetricName,
          no2MetricName,
        ].map((metricName) =>
          this.meterDataService.findAllByMeter(
            skipMeterAssociation ? undefined : meter?.key,
            request.isoDateTime,
            metricName?.split(','),
            [],
          ),
        ),
      )) as Array<MeterData[]>;

      if (
        readingDataSource.length === 0 ||
        (emissionDataSource.length === 0 &&
          policyTag === EnumPolicyTags.Tymlez_CET) ||
        (reductionDataSource.length === 0 &&
          policyTag === EnumPolicyTags.Tymlez_CRU)
      ) {
        throw new Error(
          `No meter data found at: ${meter?.key}#${request.isoDateTime}`,
        );
      }
      const readingId = `${readingDataSource.map((x) => x.id).join('_')}_${
        meterJob?.name
      }`;

      const existing = await this.mrvRepo.findOne({
        readingId,
        policyTag,
      });

      if (existing) {
        // check for status and update
        if (existing.sent) {
          this.logger.warn(
            {
              meterKey: meter?.key,
              isoDate: request.isoDateTime,
              mrvId: existing.id,
            },
            'MRV has been submitted for this timestamp interval',
          );

          result.message = `Task was skip because there was an MRV in "sent" status match (${meter?.key}#${request.isoDateTime})`;
          reportAPMMetric(METRIC_NAMES.MRV_PREPARE_DUPLICATE_PROCESS_MRV, 1);
          result.data.markAsDone = true;
          return result;
        }

        Object.assign(existing, { validated: false });
        await scopedEm.persistAndFlush(existing);
      } else {
        const getCommonMrvFields = async (
          data: MeterData[],
          otherReading: MeterData[],
        ) => {
          const defaultValues = await this.settingService.getByGroup(
            SettingGroups.COMMON_MRV,
          );
          const [meterData] = data;

          let totalReadingValue = sum(data.map((i) => +i.metricValue));

          totalReadingValue *= readingConversionRate;

          const otherMRVDataArray = [
            ...otherMrvDataSource,
            ...readingDataSource,
          ];

          const mrvDataGroupedByMetric = groupBy(
            otherMRVDataArray,
            (i) => i.metricName,
          );

          // MRV value field can only hold 5 decimal places.
          // Here MRV values are rounded to match the precision.
          const otherMRVData = fromPairs(
            toPairs(mrvDataGroupedByMetric).map(([metricName, mrvs]) => [
              metricName,
              round(sum(mrvs.map((mrv) => +mrv.metricValue)), 5),
            ]),
          );

          return {
            readingId,
            deviceId: meter.device?.deviceId,
            readingDate: meterData.isoDateTime.substring(0, 10),
            intervalStartDateTime: new Date(
              new Date(meterData.isoDateTime).getTime() -
                meterData.interval * 1000,
            ).toISOString(),
            intervalEndDateTime: meterData.isoDateTime,
            intervalDuration: meterData.interval,
            value: totalReadingValue,
            intervalDurationUOM: 's',
            valueUOM: 'Kwh',
            quality: 'HIGH - REAL TIME IOT DEVICE READINGS',

            sourceData: [...otherReading, ...data].map((reading) => ({
              readingId: `${reading.meterKey}-${reading.metricName}-${reading.isoDateTime}`,
              hashId: reading.sourceHash || 'NA',
            })),
            otherMRVData: {
              ...otherMRVData,
              ...defaultOtherMRVData,
            },
            ...defaultValues,
          };
        };

        const getCETFields = async (
          data: MeterData[],
          co2EQ: MeterData[],
          ch4Data: MeterData[] = [],
          no2Data: MeterData[] = [],
        ) => {
          const totalCo2 = sum(data.map((i) => +i.metricValue));
          const totalCo2Eq = sum(co2EQ.map((i) => +i.metricValue));
          const defaultCETMrvAttributes = {
            ...(await this.settingService.getByGroup(SettingGroups.CET_MRV)),
            ...jobSettings.defaultMRVFields,
          };
          if (data.length === 0 && co2EQ.length === 0) {
            return {};
          }
          return {
            greenhouseGasEmissionsScope: 'Scope 1',
            greenhouseGasEmissionsSource: 'DIRECT - STATIONARY COMBUSTION',
            CO2Emissions: totalCo2 * carbonEmissionConversionRate,
            CO2eqEmissions: totalCo2Eq * carbonEmissionConversionRate,
            CO2eqEmissionsTYMLEZ: 0,
            CH4Emissions: sum(ch4Data.map((i) => +i.metricValue)),
            N2OEmissions: sum(no2Data.map((i) => +i.metricValue)),
            emissionsUOM: 't',
            CO2eqFormula: '$CO2Emissions',
            // CO2eqFormulaLink: '', Not use
            ...defaultCETMrvAttributes,
          };
        };

        const getCRUFields = async (data: MeterData[]) => {
          if (data.length === 0) {
            return {};
          }
          const totalCo2Reduce = sum(data.map((i) => +i.metricValue));
          const defaultCETMrvAttributes = {
            ...(await this.settingService.getByGroup(SettingGroups.CRU_MRV)),
            ...jobSettings.defaultMRVFields,
          };

          return {
            CO2eqEmissionsReduction:
              totalCo2Reduce * CarbonReductionConversionRate,
            emissionsReductionUOM: 't',
            CO2eqEmissionsReductionFormula: '$CO2eqEmissionsReduction',
            CO2eqEmissionsReductionTYMLEZ: 0,
            // CO2eqEmissionsReductionFormulaLink: '', Not use
            ...defaultCETMrvAttributes,
          };
        };

        const getCommonPolicyFields = async (tag: string) => {
          if (tag === EnumPolicyTags.Tymlez_GOO) {
            const defaultValues = {
              ...(await this.settingService.getByGroup(SettingGroups.GOO_MRV)),
              ...jobSettings.defaultMRVFields,
            };

            return { ...defaultValues, policyTag: tag };
          }

          if (tag === EnumPolicyTags.Tymlez_REC) {
            const defaultValues = {
              ...(await this.settingService.getByGroup(SettingGroups.REC_MRV)),
              ...jobSettings.defaultMRVFields,
            };

            return { ...defaultValues, policyTag: tag };
          }

          return {
            policyTag: tag,
          };
        };
        const mrv = this.mrvRepo.create({
          ...(await getCommonMrvFields(readingDataSource, [
            ...emissionDataSource,
            ...reductionDataSource,
            ...otherMrvDataSource,
          ])),
          ...(await getCETFields(
            emissionDataSource,
            co2EqEmissionDataSource,
            ch4DataSource,
            no2DataSource,
          )),
          ...(await getCRUFields(reductionDataSource)),
          ...(await getCommonPolicyFields(policyTag)),
          validated: false,
        } as any);

        await scopedEm.persistAndFlush(mrv);
      }
    } catch (err: any) {
      this.logger.error({ err }, 'Prepare mrv task error');
      result.success = false;
      result.message = err.message;
      reportErrorToNewRelic(err, METRIC_NAMES.MRV_PREPARE_ERROR);
    }
    return result;
  }

  public async validateMrv(request: IMrvProcessRequest) {
    const scopedEm = this.em.fork();
    const result = {
      success: true,
      message: '',
    };
    try {
      const meterJob = await this.getMeterJob(request);
      const policyTag = meterJob?.tags?.[0] || EnumPolicyTags.Tymlez_CET;

      const mrv = await this.mrvRepo.findOne({
        policyTag,
        intervalEndDateTime: request.isoDateTime,
      });

      if (!mrv) {
        throw new Error(
          `No MRV data found for timestamp  = ${request.isoDateTime}`,
        );
      }
      mrv.validated = true;
      await scopedEm.persistAndFlush(mrv);
    } catch (err: any) {
      this.logger.error(
        { err },
        'validate mrv task error %s#%s',
        request.isoDateTime,
        request.jobId || request.taskId,
      );
      result.success = false;
      result.message = err.message;
      reportErrorToNewRelic(err);
    }
    return result;
  }

  public async submitMrv(request: IMrvProcessRequest) {
    const scopedEm = this.em.fork();
    const result = {
      success: true,
      message: '',
    };
    const meterJob = await this.getMeterJob(request);
    const policyTag = meterJob?.tags?.[0] || EnumPolicyTags.Tymlez_CET;
    const jobSettings = JSON.parse(meterJob?.settings as any);

    try {
      const mrv = await this.mrvRepo.findOne({
        intervalEndDateTime: request.isoDateTime,
        sent: false,
        policyTag,
      });

      if (!mrv) {
        throw new Error(
          `No MRV data found for timestamp  = ${request.isoDateTime}`,
        );
      }

      let valueToCheck = mrv?.value;
      switch (mrv?.policyTag) {
        case EnumPolicyTags.Tymlez_CET:
          valueToCheck = mrv?.CO2eqEmissions;
          break;
        case EnumPolicyTags.Tymlez_CRU:
          valueToCheck = mrv.CO2eqEmissionsReduction;
          break;
      }

      if (
        jobSettings[SettingKeys.SKIP_ZERO_MRV_SUBMISSION] &&
        Number(valueToCheck) === 0
      ) {
        this.logger.warn(
          `Skip MRV request to guardian: readingId =${mrv.readingId} TS = ${mrv.intervalEndDateTime} because is empty`,
        );
        mrv.sent = true;
        mrv.sendError = 'Skipped guardian submission because mrv is empty';
        await scopedEm.persistAndFlush(mrv);
        return result;
      }
      try {
        this.logger.info(
          `Sending MRV request to guardian: readingId =${mrv.readingId} TS = ${mrv.intervalEndDateTime}`,
        );
        await this.submitToGuardian(
          mrv,
          jobSettings[SettingKeys.SENSITIVE_FIELD_NAMES],
        );
        mrv.sent = true;
        await scopedEm.persistAndFlush(mrv);
        reportAPMMetric(METRIC_NAMES.MRV_SUBMISSION_SUCCESS, 1, policyTag);
      } catch (guardianError: any) {
        mrv.sendError = guardianError.message;
        await scopedEm.persistAndFlush(mrv);
        throw guardianError;
      }
    } catch (err: any) {
      this.logger.error(
        { err },
        'Submission mrv task error %s#%s',
        request.isoDateTime,
        request.jobId || request.taskId,
      );
      result.success = false;
      result.message = err.message;
      reportErrorToNewRelic(err, METRIC_NAMES.MRV_SUBMISSION_ERROR, policyTag);
    }
    return result;
  }

  private async getMeterJob(request: IMrvProcessRequest) {
    const { taskId, jobId } = request;
    let meterJob;

    if (jobId !== undefined) {
      meterJob = await this.meterJobService.findOne(jobId, ['meter.device']);
    } else if (taskId !== undefined) {
      const task = await this.meterTaskService.findOne(taskId, [
        'meterJob.meter.device',
      ]);
      meterJob = task?.meterJob;
    }

    if (!meterJob || !meterJob?.meter?.key) {
      throw new Error(`No Job or missing meter key for job ID  = ${jobId}`);
    }

    return meterJob;
  }

  private async submitToGuardian(inputMrv: Mrv, sensitiveFields: string[]) {
    const mrv: any = omitBy(inputMrv, isNull);
    const commonFields = [
      'readingId',
      'deviceId',
      'readingDate',
      'intervalStartDateTime',
      'intervalEndDateTime',
      'intervalDuration',
      'intervalDurationUOM',
      'value',
      'valueUOM',
      'quality',
      'sourceData',
      'otherMRVData',
    ];
    const cetFields = [
      'greenhouseGasEmissionsScope',
      'greenhouseGasEmissionsSource',
      'CO2Emissions',
      'CH4Emissions',
      'N2OEmissions',
      'CO2eqEmissions',
      'CO2eqEmissionsTYMLEZ',
      'emissionsUOM',
      'emissionsFactorsLink',
      'CO2eqFormula',
      'CO2eqFormulaLink',
    ];
    const cruFields = [
      'CO2eqEmissionsReduction',
      'CO2eqEmissionsReductionTYMLEZ',
      'emissionsReductionUOM',
      'CO2eqEmissionsReductionFormula',
      'CO2eqEmissionsReductionFormulaLink',
    ];
    const gooFields = [...cetFields, ...cruFields];

    const numberFields = [
      'value',
      'CO2Emissions',
      'CO2eqEmissions',
      'CO2eqEmissionsTYMLEZ',
      'CO2eqEmissionsReduction',
      'CO2eqEmissionsReductionTYMLEZ',
    ];

    // Note REC policy only use common fields;
    const mrvDataForGuardian: any = {
      ...pick(mrv, commonFields),

      ...(mrv.policyTag === EnumPolicyTags.Tymlez_CET
        ? pick(mrv, cetFields)
        : {}),

      ...(mrv.policyTag === EnumPolicyTags.Tymlez_CRU
        ? pick(mrv, cruFields)
        : {}),

      ...(mrv.policyTag === EnumPolicyTags.Tymlez_GOO
        ? pick(mrv, gooFields)
        : {}),

      otherMRVData:
        typeof mrv.otherMRVData === 'object'
          ? JSON.stringify(mrv.otherMRVData)
          : mrv.otherMRVData,
      __sensitiveFields:
        sensitiveFields?.length > 0 ? sensitiveFields : undefined,
    };

    numberFields.forEach((field) => {
      if (mrvDataForGuardian[field]) {
        mrvDataForGuardian[field] = +mrvDataForGuardian[field];
      }
    });

    try {
      await this.guardianService.makeGuardianRequestMrv(
        'generate-mrv',
        'POST',
        {
          deviceId: mrv.deviceId,
          policyTag: mrv.policyTag,
          data: mrvDataForGuardian,
        },
      );
    } catch (err: any) {
      if (err.response?.status === 422) {
        this.logger.error(
          { response: err.response },
          'Error during submission mrv to guardian - code 422',
          err,
        );
        return;
      }
      if (err.response) {
        this.logger.error(
          { response: err.response },
          'Error during submission mrv to guardian',
          err,
        );
      }
      throw err;
    }
  }

  public async submitApprovedHistoricalData() {
    const data = await this.mrvRepo.find({
      isApproved: true,
      dataSourceType: 'manually',
      sent: false,
    });

    if (data.length > 0) {
      const pendingMrv = await this.getPendingMrv();
      const mrvCET = this.getPendingMrvByPolicy(
        pendingMrv,
        EnumPolicyTags.Tymlez_CET,
      );
      if (mrvCET === 0) {
        const messages: string[] = [];
        for await (const approvedMrv of data) {
          try {
            await this.submitToGuardian(approvedMrv, []);

            approvedMrv.sent = true;
          } catch (err: any) {
            approvedMrv.sendError = err.message;
            messages.push(err.message);
          }
          await this.mrvRepo.persistAndFlush(approvedMrv);
        }
        if (messages.length > 0) {
          return { success: false, message: messages.join(', ') };
        }
      }
    }

    return {
      message: 'No pending data',
      success: true,
    };
  }

  public async getAll(
    pageSize: number,
    page: number,
    mrvQuery: IMrvQuery,
  ): Promise<IFindResult<IMrv>> {
    const filterQuery = this.getFilterQuery(mrvQuery);

    try {
      const [mrvs, count] = await this.mrvRepo.findAndCount(filterQuery, {
        orderBy: { id: 'DESC' },
        limit: pageSize,
        offset: page * pageSize,
        populate: true,
      });
      return { count, data: mrvs };
    } catch (err) {
      this.logger.error({ err }, 'Get all mrv failed!');
      return { count: 0, data: [] };
    }
  }

  private getFilterQuery(mrvQuery: IMrvQuery) {
    const {
      startDateTime,
      endDateTime,
      status,
      dataSourceType,
      isApproved,
      policyTag,
    } = mrvQuery;

    const filterQuery = this.getFilterDateRangeQuery(
      startDateTime,
      endDateTime,
    );

    switch (status) {
      case EnumMrvStatus.success: {
        filterQuery.sent = true;
        break;
      }
      case EnumMrvStatus.error:
        filterQuery.sent = false;
        break;
    }

    if (dataSourceType !== 'all') {
      filterQuery.dataSourceType = dataSourceType;
    }
    if (policyTag !== 'all') {
      filterQuery.policyTag = policyTag;
    }

    switch (isApproved) {
      case EnumMrvAprrovedStatus.true: {
        filterQuery.isApproved = true;
        break;
      }
      case EnumMrvAprrovedStatus.false:
        filterQuery.isApproved = false;
        break;
    }

    return filterQuery;
  }

  private getFilterDateRangeQuery(from: string, to: string) {
    const filterQuery: any = {};
    if (from) {
      filterQuery.intervalStartDateTime = { $gte: from };
    }
    if (to) {
      filterQuery.intervalEndDateTime = { $lte: to };
    }
    return filterQuery;
  }

  public async getSummary(from: string, to: string): Promise<IMrvSummary[]> {
    const filterQuery = this.getFilterDateRangeQuery(from, to);
    const qb = (this.em as SqlEntityManager)
      .createQueryBuilder(Mrv)
      .select(
        `sent, sum(value) as readingvalue, sum(co2_eq_emissions) as co2emission, sum(co2_eq_emissions_reduction) as co2reduction, policy_tag`,
      )
      .where(filterQuery)
      .groupBy(['sent', 'policy_tag']);

    const summaryData = await qb.execute<Array<ISummaryData>>('all');
    const dataSent = summaryData.filter((item) => item.sent);
    // const dataError = data.filter((item) => !item.sent);
    const pendingMrvCount = await this.getPendingMrv();

    const uniquePolicies = dataSent.map((x) => x.policyTag);

    return uniquePolicies.map((policy) => {
      const dataByPolicy = dataSent.find((item) => item.policyTag === policy);
      return dataByPolicy
        ? {
            policyTag: policy,
            totalCO2Emission: +dataByPolicy.co2emission,
            totalCO2Reduction: +dataByPolicy.co2reduction,
            readingValue: +dataByPolicy.readingvalue,
            mrvAggregation: this.getPendingMrvByPolicy(
              pendingMrvCount,
              policy as any,
            ),
          }
        : {
            policyTag: policy,
            totalCO2Emission: 0,
            totalCO2Reduction: 0,
            readingValue: 0,
            mrvAggregation: this.getPendingMrvByPolicy(
              pendingMrvCount,
              policy as any,
            ),
          };
    });
  }

  public async addMRV(mrv: CreateMRVDto): Promise<IMutationResult> {
    let newOtherMRVData = { submissionType: 'manually' };
    if (mrv.otherMRVData) {
      if (this.isJson(mrv.otherMRVData)) {
        newOtherMRVData = {
          ...newOtherMRVData,
          ...JSON.parse(mrv.otherMRVData),
        };
      } else {
        return {
          success: false,
          message: 'otherMRVData value must be json type.',
        };
      }
    }
    const newMeter = this.em.create(Mrv, {
      ...mrv,
      readingDate: formatDate(new Date(mrv.readingDate)),
      dataSourceType: 'manually',
      isApproved: false,
      sourceData: [
        {
          readingId: mrv.readingId,
          hashId: crypto
            .createHash('md5')
            .update(JSON.stringify(mrv.documentProof))
            .digest('hex'),
        },
      ],
      documentProof: await this.storeFile(
        mrv.readingId,
        mrv.documentProof.name,
        mrv.documentProof.content as string,
      ),
      otherMRVData: newOtherMRVData,
      policyTag: EnumPolicyTags.Tymlez_CET,
      createdAt: new Date(),
    } as any);

    try {
      await this.em.persistAndFlush(newMeter);
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

  private isJson(value: string) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  private async storeFile(
    readingId: string,
    filename: string,
    content: string,
  ) {
    return await storeFileToS3(
      this.storageS3BucketName,
      `historical-carbon/${readingId}/${filename}`,
      Buffer.from(content, 'base64'),
    );
  }

  public async approveMrv(id: number): Promise<IMutationResult> {
    const mrv = await this.mrvRepo.findOne({
      id,
    });

    if (!mrv) {
      return {
        success: false,
        message: `Mrv does not exist!`,
      };
    }

    mrv.isApproved = true;
    mrv.sent = false;

    try {
      await this.mrvRepo.persistAndFlush(mrv);
    } catch (err: any) {
      return {
        success: false,
        message: `Update mrv failed ${err.message}`,
      };
    }
    return { success: true };
  }

  public async findOne(id: number): Promise<IFindOneResult<IMrv>> {
    return await this.mrvRepo.findOne({ id });
  }

  public async update(id: number, mrv: CreateMRVDto): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'MRV does not exist. No MRV to update',
      };
    }

    wrap(existing).assign({
      ...mrv,
      documentProof: mrv.documentProof.content
        ? await this.storeFile(
            mrv.readingId,
            mrv.documentProof.name,
            mrv.documentProof.content as string,
          )
        : mrv.documentProof,
    });

    try {
      await this.mrvRepo.persistAndFlush(existing);
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

  public async remove(id: number): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'MRV does not exist. No MRV to remove',
      };
    }
    try {
      await this.mrvRepo.removeAndFlush(existing);
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

  private async getPendingMrv(): Promise<IPendingMrv[]> {
    return await this.guardianService.makeGuardianRequestMrv(
      'pending-mrv',
      'get',
    );
  }

  private getPendingMrvByPolicy(
    pendingMrvCount: IPendingMrv[],
    policy: EnumPolicyTags,
  ) {
    return (
      pendingMrvCount.find((p) => p.tag.includes(policy.replace('_', '')))
        ?.count || 0
    );
  }
}
