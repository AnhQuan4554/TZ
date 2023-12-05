import { groupBy, mapValues } from 'lodash';
import { getIpfsFileContentBuffer } from '../utils/ipfs';
import {
  aggregateMRVs,
  getPolicyEntityVcsFromTopic,
  getPolicyInfoFromTopic,
  getTokenMintInfo,
  getTokenMintVpByTimestamp,
  parseVcsForDevices,
  parseVcsForInstallers,
  parseVcsForMRVs,
  parseVcsForProjects,
  parseVcsForSites,
  parseVpInfo,
  queryTokenMintInfo,
} from './guardian';
import {
  getAccountInfo as getHederaAccountInfo,
  getMessageByConsensusTimestamp,
  getTokenClasses as getHederaTokenClasses,
} from './hedera';
import type {
  IGuardianTokenMintInfo,
  IHederaAccountInfo,
  IHederaTokenClass,
  ITrustchain,
  ITokenMintInfoQuery,
} from './interfaces';

export class TrustchainV2 {
  network: string;

  constructor(network: string) {
    this.network = network || 'testnet';
  }

  async getAccountInfo(
    hederaAccountId: string,
  ): Promise<IHederaAccountInfo | undefined> {
    return getHederaAccountInfo(this.network, hederaAccountId);
  }

  async getTokenClasses(
    hederaAccountId: string,
  ): Promise<IHederaTokenClass[] | undefined> {
    return getHederaTokenClasses(this.network, hederaAccountId);
  }

  async getIpfsFileContent(cid: string): Promise<string> {
    const contentBuffer = getIpfsFileContentBuffer(this.network, cid);

    return contentBuffer && contentBuffer.toString();
  }

  async queryTokenMints(query: ITokenMintInfoQuery): Promise<{
    tokenMintInfoArray: IGuardianTokenMintInfo[];
    hasMore: boolean;
  }> {
    const {
      hederaAccountId,
      startDatetime,
      endDatetime,
      order,
      maxNumTokens,
      tokenClassIds,
    } = query;
    return await queryTokenMintInfo(
      this.network,
      hederaAccountId,
      startDatetime,
      endDatetime,
      order,
      maxNumTokens,
      tokenClassIds,
    );
  }

  async getTokenMint(
    tokenMintMsgTimestamp: string,
    includeStateProof = false,
  ): Promise<IGuardianTokenMintInfo> {
    return await getTokenMintInfo(
      this.network,
      tokenMintMsgTimestamp,
      includeStateProof,
    );
  }

  async getTokenMintTrustchainByTimestamp(
    tokenMintMsgTimestamp: string,
    decryptionKey?: string,
    includeStateProof = false,
  ): Promise<ITrustchain> {
    const message = await getMessageByConsensusTimestamp(
      this.network,
      tokenMintMsgTimestamp,
    );

    const { topic_id: topicId } = message;

    const tokenMintInfo = await this.getTokenMint(
      tokenMintMsgTimestamp,
      includeStateProof,
    );

    const policyInfo = await getPolicyInfoFromTopic(this.network, topicId);
    const entityVcs = await getPolicyEntityVcsFromTopic(
      this.network,
      topicId,
      decryptionKey,
    );
    const sites = parseVcsForSites(entityVcs);
    const projects = parseVcsForProjects(entityVcs);
    const devices = parseVcsForDevices(entityVcs);
    const installers = parseVcsForInstallers(entityVcs);

    const { cid, doc: vp } = await getTokenMintVpByTimestamp(
      this.network,
      tokenMintMsgTimestamp,
      decryptionKey,
    );

    const mrvs = parseVcsForMRVs(vp?.verifiableCredential || [], devices);

    const groupedMrvs = groupBy(mrvs, (mrv) => mrv.misc.rawData.deviceId);
    const mrvDeviceIds = mrvs.map((mrv) => mrv.misc.rawData.deviceId);
    const vpInfo = parseVpInfo(vp, cid);

    return {
      tokenMintInfo,
      policyInfo,
      site: sites?.length > 0 ? sites[0] : undefined,
      project: projects?.length > 0 ? projects[0] : undefined,
      devices: devices.filter((device) => mrvDeviceIds.includes(device.id)),
      installers,
      mrvs,
      mrvSummary: mapValues(groupedMrvs, aggregateMRVs),
      vpInfo,
    };
  }

  async getTokenMintTrustchain(
    tokenMintInfo: IGuardianTokenMintInfo,
    decryptionKey?: string,
  ): Promise<ITrustchain> {
    const tokenMintMsgTimestamp = tokenMintInfo.transaction.memo;
    const message = await getMessageByConsensusTimestamp(
      this.network,
      tokenMintMsgTimestamp,
    );

    const { topic_id: topicId } = message;

    const policyInfo = await getPolicyInfoFromTopic(this.network, topicId);
    const entityVcs = await getPolicyEntityVcsFromTopic(
      this.network,
      topicId,
      decryptionKey,
    );
    const sites = parseVcsForSites(entityVcs);
    const projects = parseVcsForProjects(entityVcs);
    const devices = parseVcsForDevices(entityVcs);
    const installers = parseVcsForInstallers(entityVcs);

    const { cid, doc: vp } = await getTokenMintVpByTimestamp(
      this.network,
      tokenMintMsgTimestamp,
      decryptionKey,
    );

    const mrvs = parseVcsForMRVs(vp?.verifiableCredential || [], devices);

    const groupedMrvs = groupBy(mrvs, (mrv) => mrv.misc.rawData.deviceId);
    const mrvDeviceIds = mrvs.map((mrv) => mrv.misc.rawData.deviceId);
    const vpInfo = parseVpInfo(vp, cid);

    return {
      tokenMintInfo,
      policyInfo,
      site: sites?.length > 0 ? sites[0] : undefined,
      project: projects?.length > 0 ? projects[0] : undefined,
      devices: devices.filter((device) => mrvDeviceIds.includes(device.id)),
      installers,
      mrvs,
      mrvSummary: mapValues(groupedMrvs, aggregateMRVs),
      vpInfo,
    };
  }
}
