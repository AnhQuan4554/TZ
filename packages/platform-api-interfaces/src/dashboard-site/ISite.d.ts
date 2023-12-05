import type { ILatitude, ILongitude } from '../data-type';
import type { UUID } from '../UUID';
import { IClient } from './IClient';
import { ISiteMetaData } from './ISiteMetaData';

export interface ISite {
  id: UUID;
  name: string;
  label: string;
  address: string;
  lat: ILatitude;
  lng: ILongitude;
  client: IClient;
  tags: string[];
  timezone?: string;
  metaData: ISiteMetaData;
}

export interface ITrustChainSite {
  name: string;
  about: string;
  profileImage: string;
  bannerImage: string;
  network: string;
  dateDeployed: string;
}
