// import { PrimaryKey } from '@mikro-orm/core';
import { Unique } from '@mikro-orm/core';
import type { IDoc } from '@tymlez/platform-api-interfaces';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  // @PrimaryKey({ type: 'uuid' })
  // id: string;

  @Unique()
  @IsNotEmpty({ message: 'Device Id should not be empty' })
  deviceId: string;

  @IsNotEmpty({ message: 'Device Name should not be empty' })
  deviceName: string;

  @IsNotEmpty({ message: 'Site should not be empty' })
  siteId: string;

  @IsNotEmpty({ message: 'Installer should not be empty' })
  installerId: string;

  @IsNotEmpty({ message: 'Device Type should not be empty' })
  deviceType: string;

  @IsOptional()
  deviceDescription: string;

  @IsOptional()
  make: string;

  @IsOptional()
  model: string;

  @IsOptional()
  serialNumber: string;

  @IsOptional()
  otherDeviceData: string;

  @IsNotEmpty({ message: 'Certification should be uploaded! ' })
  certification: IDoc;

  @IsNotEmpty({ message: 'Certification Expiry Date should not be empty' })
  certificationExpiryDate: Date;
}

export class UpdateDeviceDto {
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Device Id should not be empty' })
  deviceId: string;

  @IsNotEmpty({ message: 'Device Name should not be empty' })
  deviceName: string;

  @IsNotEmpty({ message: 'Site should not be empty' })
  siteId: string;

  @IsNotEmpty({ message: 'Installer should not be empty' })
  installerId: string;

  @IsNotEmpty({ message: 'Device Type should not be empty' })
  deviceType: string;

  @IsOptional()
  deviceDescription: string;

  @IsOptional()
  make: string;

  @IsOptional()
  model: string;

  @IsOptional()
  serialNumber: string;

  @IsOptional()
  otherDeviceData: string;

  @IsNotEmpty({ message: 'Certification should be uploaded! ' })
  certification: IDoc;

  @IsNotEmpty({ message: 'Certification Expiry Date should not be empty' })
  certificationExpiryDate: Date;
}

export class DeleteDeviceDto {
  @IsNotEmpty()
  id: string;
}
