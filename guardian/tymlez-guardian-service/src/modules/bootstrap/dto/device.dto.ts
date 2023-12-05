import { IsNotEmpty, IsBase64 } from 'class-validator';

export class DeviceDto {
  @IsNotEmpty()
  installerId: string;

  @IsNotEmpty()
  deviceId: string;

  @IsNotEmpty()
  siteId: string;

  @IsNotEmpty()
  deviceType: string;

  @IsNotEmpty()
  deviceName: string;

  deviceDescription: string;

  make: string;
  model: string;
  serialNumber: string;
  @IsNotEmpty()
  @IsBase64()
  certification: string;

  @IsNotEmpty()
  certificationExpiryDate: string;

  otherDeviceData: string;
}
