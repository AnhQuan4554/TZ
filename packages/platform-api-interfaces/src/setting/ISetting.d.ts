export interface ISetting {
  id: string;
  name: string;
  value?: string;
  jsonValue?: string;
  description?: string;
  type: string;
  group?: string;
  readOnly?: boolean;
}

export type IGroup =
  | 'Tymlez_CET'
  | 'Tymlez_CRU'
  | 'Tymlez_GOO'
  | 'COMMON_MRV'
  | 'GOO_MRV'
  | 'CET_MRV'
  | 'CRU_MRV'
  | 'Platform'
  | 'TrustChain'
  | 'Client';
