// import { PrimaryKey } from '@mikro-orm/core';
import { Unique } from '@mikro-orm/core';
import type { IDoc } from '@tymlez/platform-api-interfaces';
import { IsNotEmpty } from 'class-validator';
import { BaseGuardianDto } from './baseGuardian.dto';

export class CreateInstallerDto extends BaseGuardianDto {
  // @PrimaryKey({ type: 'uuid' })
  // id: string;

  @Unique()
  @IsNotEmpty({ message: 'Installer Id should not be empty' })
  installerId: string;

  @IsNotEmpty({ message: 'Installer Name should not be empty' })
  installerName: string;

  @IsNotEmpty({ message: 'Certification should be uploaded! ' })
  certification: IDoc;

  @IsNotEmpty({ message: 'Certification Expiry Date should not be empty' })
  certificationExpiryDate: Date;

  constructor() {
    super();
  }
}

export class UpdateInstallerDto extends BaseGuardianDto {
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Installer Id should not be empty' })
  installerId: string;

  @IsNotEmpty({ message: 'Installer Name should not be empty' })
  installerName: string;

  @IsNotEmpty({ message: 'Certification should be uploaded! ' })
  certification: IDoc;

  @IsNotEmpty({ message: 'Certification Expiry Date should not be empty' })
  certificationExpiryDate: Date;
}

export class DeleteInstallerDto {
  @IsNotEmpty()
  id: string;
}
