export type IPolicy = {
  id: string;
  name: string;
  version: string;
  tokenMintValue: decimal;
  isPublished: boolean;
  content?: any;
  republishedSchema: boolean;
  tokenId?: string;
  config?: any;
};
