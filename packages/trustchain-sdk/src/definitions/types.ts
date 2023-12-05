export type GenericServiceCallback = (
    err: Error | unknown | string,
    data?: unknown
) => void;

export interface Options {
    output?: string | null | undefined,
    transactionType?: string | undefined,
    decryptionKey?: string | undefined,
    populateRelationships: boolean,
    tymlezCdn: boolean
}
export interface TrustchainResponse {
    token?: any;
    transactions: any[];
}

export interface TokensByAccountIdResponse {
    transactions: any[];
    nextStartDate: string;
    previousStartDate: string;
    endDate: string;
}

export interface IpfsDocumentResponse {
    ipfsDocument: any;
}