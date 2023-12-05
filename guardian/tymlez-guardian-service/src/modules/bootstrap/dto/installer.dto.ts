import { Type } from 'class-transformer';
import {
  IsBase64,
  IsNotEmpty,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import type { IAddress, IPerson } from './interface';
import { PersonDto } from './person.dto';

export class InstallerDto {
  @IsNotEmpty()
  installerId: string;

  @IsNotEmpty()
  installerName: string;

  @IsNotEmpty()
  registrationCountry: string;

  @IsNotEmpty()
  businessRegistrationNumber: string;

  @IsNotEmpty()
  businessRegistrationNumberType: string;

  @IsNotEmpty()
  businessRegistrationDate: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  registeredOfficeAddress: IAddress;

  @IsNotEmpty()
  businessType: string;

  @IsNotEmpty()
  primaryBusinessFunction: string;

  @IsNotEmpty()
  businessLead: string;

  websiteLink: string;
  numberOfEmployees: number;
  otherCountriesOfOperation: string;
  otherRelatedEntities: string;
  shareholders: string;
  balanceSheetTotal: string;

  @ValidateIf((o) => o.operationalContact)
  @ValidateNested()
  @Type(() => PersonDto)
  operationalContact: IPerson;

  @ValidateIf((o) => o.leadUserContact)
  @ValidateNested()
  @Type(() => PersonDto)
  leadUserContact: IPerson;

  @ValidateIf((o) => o.financePersonContact)
  @ValidateNested()
  @Type(() => PersonDto)
  financePersonContact: IPerson;

  @IsNotEmpty()
  @IsBase64()
  certification: string;

  @IsNotEmpty()
  certificationExpiryDate: Date;
}
