// eslint-disable-this-file no-param-reassign
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { IDevice } from '@tymlez/platform-api-interfaces';
import { BaseService } from '../base.service';
import type {
  IBlockData,
  ITrustchainReport,
  IVerifiableCredential,
  IVpDocument,
  IVpRecord,
} from '../../interfaces/IVpRecord';
import { TymlezUser } from '../../schemas/user.schema';
import { BLOCK_TAGS, IDeviceGrid } from '../../interfaces/block';
import type { ICredentialSubject } from '../../interfaces/vc';
import type { IPagination } from '../../interfaces/IPagination';

@Injectable()
export class AuditService extends BaseService {
  constructor(
    @InjectModel(TymlezUser.name, 'tymlez')
    userModel: Model<TymlezUser>,
  ) {
    super(userModel);
  }

  async getVpDocumentsByPolicy(
    clientName: string,
    policyTag: string,
    filters: {
      page: number;
      pageSize: number;
      accumulativeFields: string[];
      showVcRecords: boolean;
    },
  ): Promise<{
    total: number;
    data: IVpRecord[];
  }> {
    const { page, pageSize, accumulativeFields, showVcRecords } = filters;
    const session = await this.loginAsRootAuthority(clientName);
    const policies = await this.getPublishedPolicies(session);

    const policy = policies.find(
      (p) => p.policyTag.includes(policyTag) || p.name.includes(policyTag),
    );
    if (!policy) {
      throw new Error(`No policy with the policy tag ${policyTag} found.`);
    }

    await this.setPolicyBlockData(
      session,
      policy.id || '',
      BLOCK_TAGS.VP_GRID_DATA,
      {
        orderField: 'createDate',
        orderDirection: 'DESC',
      },
    );

    await this.setPolicyBlockData(
      session,
      policy.id || '',
      BLOCK_TAGS.VP_GRID_PAGER,
      {
        itemsPerPage: pageSize,
        page,
      },
    );

    const result = await this.getPolicyBlockData<IBlockData>(
      session,
      policy.id || '',
      BLOCK_TAGS.VP_GRID,
    );

    const pagination = await this.getPolicyBlockData<IPagination>(
      session,
      policy.id || '',
      BLOCK_TAGS.VP_GRID_PAGER,
    );
    return {
      total: pagination.size,
      data: result.data.map((x: IVpDocument) =>
        this.extractAndFormatVp(
          x,
          'deviceType',
          { [policy.id || '']: policy.name },
          accumulativeFields,
          showVcRecords,
        ),
      ),
    };
  }

  async getVpDocumentsByDeviceId(
    clientName: string,
    deviceId: string,
    filters: { policyTag?: string; accumulativeFields?: string[] },
  ): Promise<{
    total: number;
    data: IVpRecord[];
  }> {
    const { policyTag, accumulativeFields = [] } = filters;
    const session = await this.loginAsAuditor(clientName);

    const data = (await this.api.trustchains(session).query()) as IVpDocument[];

    const raSession = await this.loginAsRootAuthority(clientName);

    const policies = await this.getPublishedPolicies(raSession);
    const policyNames = policies.reduce(
      (acc, p) => ({ ...acc, [p.id || '']: p.name }),
      {},
    );
    let devices: ICredentialSubject<IDevice>[] = [];

    for await (const policy of policies) {
      if (!policyTag || policy.policyTag.includes(policyTag)) {
        const { data: policiesDevices } =
          await this.getPolicyBlockData<IDeviceGrid>(
            raSession,
            policy.id || '',
            'device_grid',
          );

        devices = [
          ...devices,
          ...policiesDevices
            .filter(
              (d) => d.document.credentialSubject[0].deviceId === deviceId,
            )
            .map((d) => d.document.credentialSubject[0]),
        ];
      }
    }
    if (devices.length === 0) {
      throw new Error('No device found');
    }
    const policiesId = devices.flat().map((x) => x.policyId);
    const filteredVP = data.filter((x) => policiesId.includes(x.policyId));

    const { deviceType } = devices[0];

    return {
      total: filteredVP.length,
      data: filteredVP.map((x) =>
        this.extractAndFormatVp(x, deviceType, policyNames, accumulativeFields),
      ),
    };
  }

  private extractAndFormatVp(
    vpDocument: IVpDocument,
    deviceType: string,
    nameMap: { [x: string]: string },
    accumulativeFields: string[] = [],
    showVcRecords = true,
  ): IVpRecord {
    const fields = [
      'readingId',
      'CO2eqEmissions',
      'CO2Emissions',
      'CH4Emissions',
      'N2OEmissions',
      'emissionsUOM',
      'intervalEndDateTime',
      'intervalStartDateTime',
      'intervalDuration',
      'intervalDurationUOM',
      'value',
      'valueUOM',
      'CO2eqEmissionsReduction',
      'emissionsReductionUOM',
      'otherMRVData',
    ];
    const vcRecords: any[] = vpDocument.document.verifiableCredential
      .slice(0, vpDocument.document.verifiableCredential.length - 1)
      .map((vc: IVerifiableCredential) => {
        return vc.credentialSubject.map((cs: any) => {
          return fields.reduce(
            (acc, item) => ({ ...acc, [item]: cs[item] }),
            {},
          );
        });
      })
      .flat();
    const testnet = vpDocument.owner.includes('testnet') ? 'testnet' : 'app';
    const vpAccumulates = [
      'CO2eqEmissions',
      'CO2Emissions',
      'CH4Emissions',
      'N2OEmissions',
      'CO2eqEmissionsReduction',
      'value',
      ...accumulativeFields,
    ].reduce((acc, prop) => {
      vcRecords.forEach((item) => {
        if (item[prop] !== undefined) {
          acc[prop] = acc[prop] || 0;
          acc[prop] += item[prop];
        }

        if (item.otherMRVData !== undefined) {
          try {
            let otherMRVData = JSON.parse(item.otherMRVData);
            if (typeof otherMRVData === 'string') {
              otherMRVData = JSON.parse(otherMRVData);
            }

            if (otherMRVData[prop] !== undefined) {
              acc[prop] = acc[prop] || 0;
              acc[prop] += +otherMRVData[prop];
            }
          } catch (e) {
            //swallow
          }
        }
      });

      return acc;
    }, {} as any);

    const mintedVC =
      vpDocument.document.verifiableCredential[
        vpDocument.document.verifiableCredential.length - 1
      ];

    return {
      hash: vpDocument.hash,
      vpId: vpDocument.document.id,
      mintedDate: mintedVC.credentialSubject[0].date,
      tokenId: mintedVC.credentialSubject[0].tokenId,
      energyType: deviceType,
      ...vpAccumulates,
      onChainUrl: `https://${testnet}.dragonglass.me/hedera/search?q="${vpDocument.messageId}"`,
      policy: nameMap[vpDocument.policyId],
      vcRecords: showVcRecords ? vcRecords : [],
      timestamp: vpDocument.createDate,
      messageId: vpDocument.messageId,
    } as IVpRecord;
  }

  async getVpDocumentByHash(
    clientName: string,
    policyTag: string,
    filters: {
      hash: string;
      accumulativeFields: string[];
    },
  ): Promise<IVpRecord> {
    const { hash, accumulativeFields } = filters;
    const session = await this.loginAsRootAuthority(clientName);
    const policies = await this.getPublishedPolicies(session);

    const policy = policies.find(
      (p) =>
        p.policyTag.includes(policyTag) ||
        p.name === policyTag ||
        p.policyTag === policyTag ||
        p.id === policyTag,
    );
    if (!policy) {
      throw new Error(`No policy with the policy tag ${policyTag} found.`);
    }

    await this.setPolicyBlockData(
      session,
      policy.id || '',
      BLOCK_TAGS.TRUST_CHAIN_REPORT,
      {
        filterValue: hash,
      },
    );

    const result = await this.getPolicyBlockData<ITrustchainReport>(
      session,
      policy.id || '',
      BLOCK_TAGS.TRUST_CHAIN_REPORT,
    );

    return this.extractAndFormatVp(
      result.data.vpDocument.document,
      'deviceType',
      { [policy.id || '']: policy.name },
      accumulativeFields,
    );
  }
}
