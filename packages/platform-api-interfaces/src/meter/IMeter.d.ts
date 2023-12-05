import { IMeterType } from './IMeterType';
import { ISite } from '../dashboard-site/ISite';
import { IClient } from '../client/IClient';
import { IDevice } from '../guardian/device/IDevice';
import type { SafeNumber, UUID, ILatitude, ILongitude } from '../data-type';

export interface IMeter {
  id: UUID;
  name: string;
  key: string;
  site: ISite;
  device?: IDevice;
  lat?: ILatitude;
  lng?: ILongitude;
  meterType: IMeterType;
  interval: SafeNumber; //Interval the meter is set to, in seconds
  dataSourceType: string;
  dataSource: string;
  dataDelaySec: SafeNumber; // In seconds
  dataCredentials?: string;
  officialCarbonFactor: SafeNumber;
  customCarbonFactor: SafeNumber;
  client: IClient;
}
