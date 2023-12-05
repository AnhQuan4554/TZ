import { runAllSettled, safeJsonParse } from '@tymlez/common-libs';
import { max, min, orderBy, pick, round, sortBy, uniq, uniqBy } from 'lodash';
import crypto from 'crypto';
import { decodeBase64 } from '../utils/base64';
import {
  nanoSecondTimestampToIso,
  shiftNanoSecondTimestamp,
} from '../utils/datetime';
import { decryptObject, decryptString } from '../utils/decryption';
import { parseGPSLocationString } from '../utils/geolocation';
import { getIpfsFileContentBuffer } from '../utils/ipfs';
import { mapValuesRecursively } from '../utils/object';
import {
  getAccountInfo,
  getMessageByConsensusTimestamp,
  getMessageByTopicIdAndSequenceNumber,
  getMessagesByTopicIdAndSequenceRange,
  getTokenClasses,
  getTransaction,
  getTransactions,
  getTransactionStateProof,
  getHederaDocumentByConsensusTimestamp,
  getAllTokenNFTInfoArray,
} from './hedera';
import type {
  IGuardianDevice,
  IGuardianInstaller,
  IGuardianMRV,
  IGuardianMRVSummary,
  IGuardianPolicyInfo,
  IGuardianProject,
  IGuardianSite,
  IGuardianTokenMintInfo,
  IGuardianVcDocument,
  IHederaMessage,
  IHederaMessageContent,
  IHederaTransaction,
  IHederaTransactionRequest,
  IGuardianVPInfo,
  IGuardianVpDocument,
  IIsoDatetime,
  IHederaTokenNFTInfo,
} from './interfaces';

async function populateTokenMintInfoWithStateProof(
  network: string,
  infoArray: IGuardianTokenMintInfo[],
  order: 'asc' | 'desc',
): Promise<IGuardianTokenMintInfo[]> {
  const infoArrayWithStateProof: IGuardianTokenMintInfo[] = [];
  await runAllSettled(infoArray, async (txn) => {
    const stateProof = await getTransactionStateProof(
      network,
      txn.transaction.transaction_id,
    );
    infoArrayWithStateProof.push({
      ...txn,
      stateProof,
    });
  });

  const sortedInfoArray = orderBy(
    infoArrayWithStateProof,
    [(tokenMintInfo) => tokenMintInfo.transaction.consensus_timestamp],
    [order],
  );

  return sortedInfoArray;
}

async function buildTokenMintInfoArray(
  network: string,
  hederaAccountId: string,
  transactions: IHederaTransaction[],
  includeStateProof = false,
  order: 'asc' | 'desc' = 'asc',
) {
  const accountInfo = await getAccountInfo(network, hederaAccountId);

  if (accountInfo === undefined) {
    throw new Error(
      `Failed to get account info: ${hederaAccountId}@${network}`,
    );
  }

  const tokenClasses = (await getTokenClasses(network, hederaAccountId)) || [];
  const tokenClassMap = Object.fromEntries(
    tokenClasses.map((tokenClass) => [tokenClass.token_id, tokenClass]),
  );

  let tokenMintInfoArray: IGuardianTokenMintInfo[] = transactions.map(
    (transaction: IHederaTransaction) => {
      const tokenClass = tokenClassMap[transaction.entity_id];

      if (tokenClass === undefined) {
        throw new Error(`Unknown token with id ${transaction.entity_id}`);
      }

      return {
        transaction,
        accountInfo,
        tokenClass,
      };
    },
  );

  const relevantTokenClasseIds = tokenMintInfoArray.map(
    (info) => info.tokenClass.token_id,
  );

  const nftTokenClasses = tokenClasses.filter(
    (tokenClass) =>
      relevantTokenClasseIds.includes(tokenClass.token_id) &&
      tokenClass.type === 'NON_FUNGIBLE_UNIQUE',
  );

  if (nftTokenClasses.length > 0) {
    const allNfts: Record<string, IHederaTokenNFTInfo[]> = {};
    await runAllSettled(nftTokenClasses, async (tokenClass) => {
      const nft = await getAllTokenNFTInfoArray(network, tokenClass.token_id);
      allNfts[tokenClass.token_id] = nft;
    });

    tokenMintInfoArray = tokenMintInfoArray.map((info) => {
      const nftInfoArray = allNfts[info.tokenClass.token_id] || [];
      const nftInfo = nftInfoArray.find(
        (nft) => decodeBase64(nft.metadata) === info.transaction.memo,
      );
      return {
        ...info,
        nftInfo,
      };
    });
  }

  if (includeStateProof) {
    tokenMintInfoArray = await populateTokenMintInfoWithStateProof(
      network,
      tokenMintInfoArray,
      order,
    );
  }

  return tokenMintInfoArray;
}

export async function queryTokenMintInfo(
  network: string,
  hederaAccountId: string,
  startDatetime: IIsoDatetime,
  endDatetime: IIsoDatetime,
  order: 'asc' | 'desc',
  maxNumTxns = 100,
  tokenClassIds: string[] | undefined = undefined,
  includeStateProof = false,
): Promise<{
  tokenMintInfoArray: IGuardianTokenMintInfo[];
  hasMore: boolean;
}> {
  const txnRequest: IHederaTransactionRequest = {
    network,
    accountId: hederaAccountId,
    startTimestamp: startDatetime,
    endTimestamp: endDatetime,
    transactionType: 'TOKENMINT',
    order,
    maxNumTxns,
    startTimestampInclusive: order === 'desc',
    endTimestampInclusive: order === 'asc',
    timestampFormat: 'iso',
    transactionFilter: (txn: IHederaTransaction): boolean =>
      tokenClassIds === undefined || tokenClassIds.includes(txn.entity_id),
  };

  const { transactions, hasMore } = await getTransactions(txnRequest);
  const tokenMintInfoArray = await buildTokenMintInfoArray(
    network,
    hederaAccountId,
    transactions,
    includeStateProof,
    order,
  );

  return { tokenMintInfoArray, hasMore };
}

export async function getTokenMintInfo(
  network: string,
  tokenMintMsgTimestamp: string,
  includeStateProof = false,
): Promise<IGuardianTokenMintInfo> {
  const message = await getMessageByConsensusTimestamp(
    network,
    tokenMintMsgTimestamp,
  );
  const accountId = message.payer_account_id;
  const txnRequest: IHederaTransactionRequest = {
    network,
    accountId,
    startTimestamp: tokenMintMsgTimestamp,
    endTimestamp: shiftNanoSecondTimestamp(tokenMintMsgTimestamp, 60),
    transactionType: 'TOKENMINT',
    maxNumTxns: 1,
    order: 'asc',
    startTimestampInclusive: false,
    timestampFormat: 'nanosecond',
    transactionFilter: (txn: IHederaTransaction) =>
      txn.memo === tokenMintMsgTimestamp,
  };

  const { transactions } = await getTransactions(txnRequest);

  const [tokenMintInfo] = await buildTokenMintInfoArray(
    network,
    accountId,
    transactions,
    includeStateProof,
    'asc',
  );

  return tokenMintInfo;
}

export async function getTokenMintVpByTimestamp(
  network: string,
  VpConsensusTimestamp: string,
  decryptionKey?: string,
) {
  const { cid, doc } = await getHederaDocumentByConsensusTimestamp(
    network,
    VpConsensusTimestamp,
  );

  const decryptedVpDocument =
    decryptionKey && doc ? decryptGuardianDocument(doc, decryptionKey) : doc;

  return { cid, doc: decryptedVpDocument };
}

// Note: not in use yet
export async function getTokenMintVpByTransactionId(
  network: string,
  transactionId: string,
  decryptionKey?: string,
) {
  const txn = await getTransaction(network, transactionId);

  if (txn?.name !== 'TOKENMINT') {
    throw new Error(
      `Transaction with Id(${transactionId}) is not a TOKENMINT transaction`,
    );
  }

  const timestamp = txn.memo;
  return getTokenMintVpByTimestamp(network, timestamp, decryptionKey);
}

async function fetchVcDocument(
  network: string,
  cid: string,
  decryptionKey?: string,
): Promise<IGuardianVcDocument | undefined> {
  const vcDocumentBuff = await getIpfsFileContentBuffer(network, cid);
  let vcDocumentObj: IGuardianVcDocument | undefined = safeJsonParse(
    vcDocumentBuff.toString(),
    undefined,
  );

  if (vcDocumentObj && decryptionKey) {
    vcDocumentObj = decryptGuardianDocument(vcDocumentObj, decryptionKey);
  }

  return vcDocumentObj;
}

export async function getPolicyEntityVcsFromTopic(
  network: string,
  topicId: string,
  decryptionKey?: string,
) {
  // The initial N messages are for setting up Policy Entities
  const numOfMessageToScan = 50;
  const messages = await getMessagesByTopicIdAndSequenceRange(
    network,
    topicId,
    1,
    numOfMessageToScan,
  );

  // Note: We assume VCs for site, device, etc will not be chunked
  const isNotChunked = (message: IHederaMessage) =>
    message.chunk_info.total === 1;

  // Note: mrv messages have releationship array. We don't want MRVs
  const isEntityVcMsgContent = (msgContent: IHederaMessageContent) =>
    msgContent.type === 'VC-Document' && !msgContent.relationships;

  const cids = messages
    .filter(isNotChunked)
    .map((message) => decodeBase64(message.message))
    .map((message) => safeJsonParse(message, {}))
    .filter(isEntityVcMsgContent)
    .map((message) => message.cid)
    .filter((cid) => cid !== undefined);

  const vcDocuments: IGuardianVcDocument[] = [];
  await runAllSettled(cids, async (cid) => {
    const vcDocumentObj = await fetchVcDocument(network, cid, decryptionKey);

    if (vcDocumentObj !== undefined) {
      vcDocuments.push(vcDocumentObj);
    }
  });

  return sortBy(vcDocuments, ['issuanceDate'], ['asc']);
}

export async function getPolicyInfoFromTopic(
  network: string,
  topicId: string,
): Promise<IGuardianPolicyInfo | undefined> {
  const message = await getMessageByTopicIdAndSequenceNumber(
    network,
    topicId,
    1, // Policy create is the first message in the topic
  );
  const msgContent = decodeBase64(message.message);

  const { name, description, rationale } = safeJsonParse(msgContent, {});
  // Note: from rationale timestamp we can also get the helloworld policy message and get the full policy docs in zip
  // if (rationale !== undefined) {
  //   return await getDecodedMessageByConsensusTimestamp(network, rationale);
  // }

  if (name !== undefined) {
    return {
      name,
      description,
      datetime: nanoSecondTimestampToIso(rationale),
    };
  }

  return undefined;
}

export function parseVcsForSites(
  inputVcs: IGuardianVcDocument[],
): IGuardianSite[] {
  const vcs = inputVcs.filter((vc) => {
    const [subject] = vc.credentialSubject;
    return 'siteName' in subject;
  });

  return vcs.map((vc) => {
    const [site] = vc.credentialSubject;
    const geolocation = parseGPSLocationString(site.GPSLocation);
    return {
      category: 'SITE',
      id: site.id,
      name: site.siteName,
      datetime: vc.issuanceDate,
      misc: {
        siteId: site.siteId,
        projectId: site.projectId,
        location: geolocation,
      },
    };
  });
}

export function parseVcsForInstallers(
  inputVcs: IGuardianVcDocument[],
): IGuardianInstaller[] {
  const vcs = inputVcs.filter((vc) => {
    const [subject] = vc.credentialSubject;
    return 'groupName' in subject;
  });
  const result = vcs?.map((vc) => {
    const [installer] = vc.credentialSubject;

    return {
      category: 'INSTALLER',
      id: installer.userId,
      name: installer.groupName,
      datetime: vc.issuanceDate,
      misc: {
        installerId: installer.id,
      },
    };
  });
  return uniqBy(result, 'id');
}

export function parseVcsForDevices(
  inputVcs: IGuardianVcDocument[],
): IGuardianDevice[] {
  const vcs = inputVcs.filter((vc) => {
    const [subject] = vc.credentialSubject;
    return 'deviceName' in subject;
  });
  const result = vcs?.map((vc) => {
    const [device] = vc.credentialSubject;

    return {
      category: 'DEVICE',
      id: device.id,
      name: device.deviceName,
      datetime: vc.issuanceDate,
      misc: pick(device, [
        'siteId',
        'deviceId',
        'deviceName',
        'deviceType',
        'make',
        'model',
        'serialNumber',
        'policyId',
        'certification',
        'certificationExpiryDate',
      ]),
    };
  });

  return uniqBy(result, 'id');
}

export function parseVcsForMRVs(
  inputVcs: IGuardianVcDocument[],
  devices: IGuardianDevice[],
): IGuardianMRV[] {
  const deviceIdMap = Object.fromEntries(
    devices.map((device) => [device.id, device.misc.deviceId]),
  );
  const vcs = inputVcs.filter((vc) => {
    const [subject] = vc.credentialSubject;
    return 'readingId' in subject;
  });
  return vcs?.map((vc) => {
    const [mrv] = vc.credentialSubject;
    const readingHashes = uniq(
      mrv.sourceData.map((sourceData) => sourceData.hashId),
    );
    return {
      category: 'MRV',
      id: vc.id,
      name: mrv.readingId,
      datetime: vc.issuanceDate,
      misc: {
        rawData: mrv,
        databaseId: deviceIdMap[mrv.deviceId],
        readingHashes,
        otherMRVData: safeJsonParse(mrv.otherMRVData, {}),
      },
    };
  });
}

export function parseVpInfo(
  vp: IGuardianVpDocument | undefined,
  cid: string | undefined,
): IGuardianVPInfo | undefined {
  if (!vp || !cid) {
    return undefined;
  }

  const inputVcs = vp.verifiableCredential || [];
  const mintTokenVcs = inputVcs
    .filter((vc) => {
      const [subject] = vc.credentialSubject;
      return 'tokenId' in subject;
    })
    .map((vc) => {
      const [subjectData] = vc.credentialSubject;
      return pick(subjectData, ['date', 'tokenId', 'amount', 'type']);
    });

  const mintTokenVc = mintTokenVcs?.length ? mintTokenVcs[0] : null;

  return {
    md5: crypto.createHash('md5').update(JSON.stringify(vp)).digest('hex'),
    id: vp?.id,
    datetime: mintTokenVc?.date,
    tokenId: mintTokenVc?.tokenId,
    tokenType: mintTokenVc?.type,
    cid,
  };
}

export function parseVcsForProjects(
  inputVcs: IGuardianVcDocument[],
): IGuardianProject[] {
  const vcs = inputVcs.filter((vc) => {
    const [subject] = vc.credentialSubject;
    return 'projectName' in subject;
  });
  return vcs?.map((vc) => {
    const [project] = vc.credentialSubject;

    return {
      category: 'PROJECT',
      id: project.id,
      name: project.projectName,
      datetime: vc.issuanceDate,
      misc: pick(project, [
        'projectId',
        'projectType',
        'projectDescription',
        'standard',
        'country',
      ]),
    };
  });
}

export function aggregateMRVs(
  mrvs: ReturnType<typeof parseVcsForMRVs>,
): IGuardianMRVSummary {
  const aggregator: {
    value: number;
    CO2eqEmissions: number;
    otherMRVData: Record<string, number>;
  } = {
    value: 0,
    CO2eqEmissions: 0,
    otherMRVData: {},
  };

  mrvs.forEach((mrv) => {
    aggregator.value += +mrv.misc.rawData.value;
    aggregator.CO2eqEmissions += +mrv.misc.rawData.CO2eqEmissions;

    Object.keys(mrv.misc.otherMRVData).forEach((k) => {
      if (k in aggregator.otherMRVData) {
        aggregator.otherMRVData[k] += +mrv.misc.otherMRVData[k];
      } else {
        aggregator.otherMRVData[k] = +mrv.misc.otherMRVData[k];
      }
    });
  });

  const roundedAggregator = mapValuesRecursively(aggregator, (value) =>
    !isNaN(value) ? round(value, 5) : value,
  );

  const [firstMRV] = mrvs;
  const mrvStartDates = mrvs.map(
    (mrv) => mrv.misc.rawData.intervalStartDateTime,
  );
  const mrvEndDates = mrvs.map((mrv) => mrv.misc.rawData.intervalEndDateTime);
  const minDate = min(mrvStartDates);
  const maxDate = max(mrvEndDates);

  return {
    ...roundedAggregator,
    valueUOM: firstMRV?.misc.rawData.valueUOM,
    emissionsUOM: firstMRV?.misc.rawData.emissionsUOM,
    startDatetime: minDate,
    endDatetime: maxDate,
    interval: firstMRV.misc.rawData.intervalDuration,
  };
}

export function decryptGuardianDocument<T>(vpDoc: T, decryptionKey: string): T {
  const decryptFunc = (input: string) => decryptString(input, decryptionKey);
  return decryptObject(vpDoc, '__sensitiveFields', decryptFunc);
}
