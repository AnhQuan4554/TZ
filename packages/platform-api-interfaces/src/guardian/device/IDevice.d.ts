import { IUser } from '../../user';
import { IInstaller, IDoc } from '../installer';
import { IGuardianSite } from '../site';

export type IDevice = {
  id: UUID;
  deviceId: string; //Device Id -Unique identifier for the device
  site: IGuardianSite; //Site Id -Unique identifier for the site where this device is installed
  deviceType: IDeviceType; //Device Type -Type of Device
  deviceName: string; //Device Name - Given name for this particular device
  deviceDescription?: string; //Device Description - Description of the device and it's purpose
  make?: string; //Make - Device manufacturer
  model?: string; //Model - Device model
  serialNumber?: string; //Serial Number - Device serial number
  certification: IDoc; //Certification - Image of the certification/calibration certificationExpiryDate
  certificationExpiryDate: ISafeDate; //Certification Expiry Date -The date the certification/calibration certificate expires
  otherDeviceData?: any; //Other Device Data -Additional information about the device e.g. specification
  createdBy: IUser;
  createdAt: ISafeDate;
  updatedAt: ISafeDate;
  tags: string[];
  installer: IInstaller;
  isPublished: boolean;
  siteId?: string;
};
