export type IIsoDatetime = string;

export interface IHederaAccountBalance {
  balance: number;
  timestamp: string;
  tokens: {
    token_id: string;
    balance: number;
  }[];
}

export interface IHederaAccountInfo {
  account: string;
  balance: IHederaAccountBalance;
  created_timestamp: string;
}

export interface IHederaTokenClass {
  admin_key: string;
  freeze_key: string;
  kyc_key: string;
  supply_key: string;
  wipe_key: string;
  symbol: string;
  token_id: string;
  type: string;
}
export interface IHederaTokenNFTInfo {
  account_id: string;
  created_timestamp: string;
  deleted: boolean;
  metadata: string;
  modified_timestamp: string;
  serial_number: number;
  token_id: string;
  delegating_spender: string | null;
  spender: string | null;
}

export interface IHederaTokenClassDetail extends IHederaTokenClass {
  treasury_account_id: string;
}

export interface IHederaTransaction {
  name: string;
  consensus_timestamp: string;
  valid_start_timestamp: string;
  entity_id: string;
  charged_tx_fee: number;
  transaction_hash: string;
  transaction_id: string;
  memo_base64: string | null;
  memo: string; // decoded memo_base64
}

export interface IHederaStateProof {
  address_book: string[];
  record_file: {
    head: string;
    start_running_hash_object: string;
    hashes_before: string[];
    record_stream_object: string;
    hashes_after: string[];
    end_running_hash_object: string;
    block_number: string;
  };
  signature_files: Record<string, string>;
  version: number;
}

export interface IHederaTransactionRequest {
  network: string;
  accountId: string;
  startTimestamp?: string;
  endTimestamp?: string;
  transactionType?: string;
  maxNumTxns?: number;
  order?: string;
  startTimestampInclusive?: boolean;
  endTimestampInclusive?: boolean;
  transactionFilter?: (txn: IHederaTransaction) => boolean;
  timestampFormat?: string;
}

export interface IHederaMessage {
  chunk_info: {
    initial_transaction_id: {
      account_id: string;
      transaction_valid_start: string;
    };
    number: number;
    total: number;
  };
  consensus_timestamp: string;
  message: string;
  payer_account_id: string;
  running_hash: string;
  running_hash_version: number;
  sequence_number: number;
  topic_id: string;
}

export interface IHederaMessageContent {
  id: string;
  type: string;
  status: string;
  issuer: string;
  action: string;
  relationships: string[] | null;
  cid: string;
  uri: string;
}

export interface IGuardianTokenMintInfo {
  transaction: IHederaTransaction;
  accountInfo: IHederaAccountInfo;
  tokenClass: IHederaTokenClass;
  stateProof?: IHederaStateProof;
  nftInfo?: IHederaTokenNFTInfo;
}

export interface IGuardianVcDocument {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  relationships: string[] | null;
  credentialSubject: {
    deviceId: string;
    intervalStartDateTime: string;
    intervalEndDateTime: string;
    intervalDuration: number;
    intervalDurationUOM: string;
    value: number;
    valueUOM: string;
    CO2eqEmissions: number;
    emissionsUOM: string;
    sourceData: { readingId: string; hashId: string }[];
    [key: string]: any;
  }[];
}

export interface IGuardianVpDocument {
  id: string;
  type: string[];
  verifiableCredential: IGuardianVcDocument[];
}

export interface IGuardianPolicyInfo {
  name: string;
  description: string;
  datetime: IIsoDatetime;
}

interface IGuardianEntity {
  category: string;
  id: string;
  name: string;
  datetime: string;
}
export interface IGuardianSite extends IGuardianEntity {
  misc: {
    siteId: string;
    projectId: string;
    location: {
      lat: string;
      long: string;
    };
  };
}
export interface IGuardianProject extends IGuardianEntity {
  misc: {
    projectId: string;
    projectType: string;
    projectDescription: string;
    standard: string;
    country: string;
  };
}
export interface IGuardianDevice extends IGuardianEntity {
  misc: {
    siteId: string;
    deviceId: string;
    deviceName: string;
    deviceType: string;
    make: string;
    model: string;
    serialNumber: string;
    policyId: string;
    certification: string;
    certificationExpiryDate: string;
  };
}
export interface IGuardianInstaller extends IGuardianEntity {
  misc: {
    installerId: string;
  };
}
export interface IGuardianMRV extends IGuardianEntity {
  misc: {
    databaseId: string;
    rawData: {
      deviceId: string;
      intervalStartDateTime: string;
      intervalEndDateTime: string;
      intervalDuration: number;
      intervalDurationUOM: string;
      value: number;
      valueUOM: string;
      CO2eqEmissions: number;
      emissionsUOM: string;
      [key: string]: any;
    };
    readingHashes: string[];
    otherMRVData: { [key: string]: number };
  };
}

export interface IGuardianMRVSummary {
  valueUOM: string;
  emissionsUOM: string;
  startDatetime: string | undefined;
  endDatetime: string | undefined;
  interval: number | undefined;
  [key: string]: any;
}

export interface IGuardianVPInfo {
  md5: string;
  id: string | undefined;
  datetime: string | undefined;
  cid: string | undefined;
  tokenId: string | undefined;
  tokenType: string | undefined;
}

export interface ITokenMintInfoQuery {
  hederaAccountId: string;
  startDatetime: IIsoDatetime;
  endDatetime: IIsoDatetime;
  order: 'asc' | 'desc';
  maxNumTokens: number;
  tokenClassIds: string[] | undefined;
  includeStateProof: boolean;
}

export interface ITrustchain {
  tokenMintInfo: IGuardianTokenMintInfo;
  policyInfo: IGuardianPolicyInfo | undefined;
  site: IGuardianSite | undefined;
  project: IGuardianProject | undefined;
  devices: IGuardianDevice[];
  installers: IGuardianInstaller[];
  mrvs: IGuardianMRV[];
  mrvSummary: Record<string, IGuardianMRVSummary>;
  vpInfo: IGuardianVPInfo | undefined;
}
