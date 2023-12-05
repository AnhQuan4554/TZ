import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IVerification,
  IVpRecord,
  IVerificationQuery,
  IVerificationDetailQuery,
  IVcRecord,
} from '@tymlez/platform-api-interfaces';
import fs from 'fs';
import { EnumPolicyNames } from '@tymlez/common-libs';
import { GuardianService } from '../guardian/guardian.service';
import { GuardianVpDocument } from './entities/guardian-vp.entity';

@Injectable()
export class VerificationService {
  constructor(
    private readonly em: EntityManager,
    private readonly guardianService: GuardianService,
    @InjectRepository(GuardianVpDocument)
    private readonly vpDocumentRepository: EntityRepository<GuardianVpDocument>,
  ) {}

  async getVerification(
    query: IVerificationQuery,
  ): Promise<IVerification | null> {
    const { siteId, page = 1, pageSize = 10, mocked, period } = query;
    let vp: {
      total: number;
      data: IVpRecord[];
    } = { total: 0, data: [] };

    if (mocked) {
      vp = await this.getMockedVerification();
      const data: IVerification = await this.convertToIVerification(vp.data);
      return data;
    }

    if (siteId) {
      const deviceId = await this.getDevice(siteId);
      vp = await this.guardianService.makeGuardianRequestVerification(
        'get',
        deviceId,
      );
      if (vp.data.length === 0) {
        return null;
      }

      const data: IVerification = await this.convertToIVerification(vp.data);

      const filteredVp: IVpRecord[] = [];
      if (period === '24h') {
        data.records.forEach((x: IVpRecord) => {
          const msPerDay = Date.now() - 24 * 60 * 60 * 1000;
          const msMintedDay = x.mintedDate.getTime();
          if (msPerDay <= msMintedDay) {
            filteredVp.push(x);
          }
        });
        data.records = filteredVp;
      }

      data.records.sort((a, b) => {
        return (
          new Date(b.mintedDate).valueOf() - new Date(a.mintedDate).valueOf()
        );
      });

      const startOffset = page * pageSize;
      data.records = data.records.slice(startOffset, startOffset + pageSize);
      return data;
    }

    /* using policy*/
    return await this.getGuardianVerification(query);
  }

  private async getGuardianVerification(
    query: IVerificationQuery,
  ): Promise<IVerification | null> {
    const {
      page = 1,
      pageSize = 10,
      accumulativeFields,
      showVcRecords,
      policy,
    } = query;

    const vp = await this.guardianService.makeGuardianRequestVerification(
      'get',
      policy || EnumPolicyNames.Tymlez_GOO,
      page,
      pageSize,
      accumulativeFields,
      true,
      showVcRecords,
    );
    if (vp.data.length === 0) {
      return null;
    }
    const data: IVerification = await this.convertToIVerification(
      vp.data,
      accumulativeFields,
      showVcRecords,
    );
    data.num = vp.total;
    data.isRealtime = true;

    return data;
  }

  private async getDevice(siteId: string): Promise<string> {
    let data;
    try {
      data = await this.em.getConnection().execute(
        `
        select  device.device_id
        from meter, device
        where meter.site_id='${siteId}'
		          and meter.device_id is not null
		          and cast(meter.device_id as uuid)=device.id
      `,
        undefined,
        'get',
      );
    } catch (err) {
      return '';
    }
    return data ? data.device_id : '';
  }

  private async convertToIVerification(
    vp: IVpRecord[],
    accumulativeFields: string[] = [],
    showVcRecords = true,
  ): Promise<IVerification> {
    return {
      date: new Date().toISOString(),
      num: vp.length,
      records: vp.map((item: IVpRecord) => {
        return {
          ...item,
          mintedDate: new Date(item.mintedDate),
          timestamp: new Date(item.timestamp),
          vcRecords: showVcRecords
            ? item.vcRecords.map((vc: IVcRecord) => ({
                ...vc,
                intervalEndDateTime: new Date(vc.intervalEndDateTime),
                intervalStartDateTime: new Date(vc.intervalStartDateTime),
              }))
            : [],
          otherMRVData: accumulativeFields.reduce(
            (acc, fieldName) => ({
              ...acc,
              [fieldName]: (item as any)[fieldName],
            }),
            {},
          ),
        };
      }),
    };
  }

  private async getMockedVerification(): Promise<{
    total: number;
    data: IVpRecord[];
  }> {
    const clientPrefix = process.env.CLIENT_NAME || '';
    const fileName = `${__dirname}/data/verification_${clientPrefix}.json`;
    const json = await fs.promises.readFile(
      fileName.replace('/dist/', '/src/'),
      'utf8',
    );

    return JSON.parse(json);
  }

  async getVpRecord(query: IVerificationDetailQuery): Promise<IVpRecord> {
    const { policy, hash, accumulativeFields, mocked = false } = query;

    if (mocked) {
      const vp = await this.getMockedVerification();
      const data = vp.data.find((record) => record.vpId === hash);
      return data as IVpRecord;
    }

    return await this.guardianService.makeGuardianRequestVpRecord(
      'get',
      policy,
      hash,
      accumulativeFields,
    );
  }

  async getDatabaseVpRecord(
    query: IVerificationDetailQuery,
  ): Promise<IVpRecord> {
    const { policy, hash, accumulativeFields } = query;
    const databaseVp = await this.vpDocumentRepository.findOne(
      { recordType: 'VP', policyTag: policy, hash },
      {
        orderBy: { id: 'DESC' },
      },
    );

    if (databaseVp) {
      return await this.convertToVp(
        databaseVp,
        policy,
        true,
        accumulativeFields,
      );
    }
    //get from guardian
    return await this.getVpRecord(query);
  }

  async getDatabaseVerification(
    query: IVerificationQuery,
  ): Promise<IVerification | null> {
    const {
      from,
      to,
      page = 1,
      pageSize = 10,
      policy = EnumPolicyNames.Tymlez_GOO,
      accumulativeFields,
      showVcRecords = false,
    } = query;

    if (from && to) {
      const [vp, count] = await this.vpDocumentRepository.findAndCount(
        {
          mintedDate: {
            $gte: from,
            $lt: to,
          },
          recordType: 'VP',
          policyTag: [policy, policy.replace('Tymlez', 'Tymlez ')],
        },
        {
          orderBy: { mintedDate: 'DESC' },
          limit: pageSize,
          offset: page * pageSize,
          populate: true,
        },
      );
      if (count > 0) {
        const data: IVerification = {
          isRealtime: false,
          date: new Date().toISOString(),
          num: count,
          records: await Promise.all(
            vp.map(async (x) => {
              return await this.convertToVp(
                x,
                policy,
                showVcRecords,
                accumulativeFields,
              );
            }),
          ),
        };

        return data;
      }
    }
    //if no data in the certain period, or not having period, will get all from database
    const [vp, count] = await this.vpDocumentRepository.findAndCount(
      {
        recordType: 'VP',
        policyTag: [policy, policy.replace('Tymlez', 'Tymlez ')],
      },
      {
        orderBy: { mintedDate: 'DESC' },
        limit: pageSize,
        offset: page * pageSize,
        populate: true,
      },
    );

    if (count > 0) {
      const data: IVerification = {
        isRealtime: true,
        date: new Date().toISOString(),
        num: count,
        records: await Promise.all(
          vp.map(async (x) => {
            return await this.convertToVp(
              x,
              policy,
              showVcRecords,
              accumulativeFields,
            );
          }),
        ),
      };

      return data;
    }

    //if no data from database, get from guardian
    return await this.getGuardianVerification(query);
  }

  private async getVcRecords(
    hash: string,
    policy: string,
    accumulativeFields: string[] = [],
  ): Promise<IVcRecord[]> {
    const data = await this.vpDocumentRepository.find(
      { recordType: 'VC', hash },
      {
        orderBy: { intervalStartDateTime: 'DESC' },
      },
    );

    if (!data) {
      const vp = await this.getVpRecord({ hash, policy, accumulativeFields });
      return vp.vcRecords;
    }
    return data.map((x) => {
      const { meta } = x;
      return {
        vcId: x.id,
        CO2eqEmissions: +x.CO2eqEmissions,
        CO2Emissions: +x.CO2Emissions,
        value: +x.value,
        CO2eqEmissionsReduction: +x.CO2eqEmissionsReduction,
        otherMRVData: x.otherData,

        CH4Emissions: +meta.CH4Emissions,
        N2OEmissions: +meta.N2OEmissions,
        emissionsUOM: meta.emissionsUOM,
        intervalEndDateTime: meta.intervalEndDateTime,
        intervalStartDateTime: meta.intervalStartDateTime,
        intervalDuration: meta.intervalDuration,
        intervalDurationUOM: meta.intervalDurationUOM,
        valueUOM: meta.valueUOM,
        emissionsReductionUOM: meta.emissionsReductionUOM,
      };
    });
  }

  private async convertToVp(
    x: GuardianVpDocument,
    policy: string,
    showVcRecords: boolean,
    accumulativeFields: string[] = [],
  ): Promise<IVpRecord> {
    const { meta } = x;
    const vp: IVpRecord = {
      hash: x.hash,
      vpId: x.id,
      mintedDate: x.mintedDate,
      tokenId: x.tokenId,
      onChainUrl: x.trustchainUrl,
      policy: x.policyTag,
      CO2eqEmissions: +x.CO2eqEmissions,
      CO2Emissions: +x.CO2Emissions,
      value: +x.value,
      CO2eqEmissionsReduction: +x.CO2eqEmissionsReduction,
      otherMRVData: x.otherData,
      messageId: meta.messageId || x.memo,
      energyType: meta.energyType,
      timestamp: meta.timestamp,
      CH4Emissions: +meta.CH4Emissions,
      N2OEmissions: +meta.N2OEmissions,

      vcRecords: showVcRecords
        ? await this.getVcRecords(x.hash, policy, accumulativeFields)
        : [],
    };
    return vp;
  }

  async getDatabaseVerificationCount(
    query: IVerificationQuery,
  ): Promise<number> {
    const { from, to, policy = EnumPolicyNames.Tymlez_GOO } = query;

    const count =
      from && to
        ? await this.vpDocumentRepository.count({
            mintedDate: {
              $gte: from,
              $lt: to,
            },
            recordType: 'VP',
            policyTag: [policy, policy.replace('Tymlez', 'Tymlez ')],
          })
        : await this.vpDocumentRepository.count({
            recordType: 'VP',
            policyTag: [policy, policy.replace('Tymlez', 'Tymlez ')],
          });

    return count;
  }
}
