import {
  IsNotEmpty,
  IsNumber,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import type { IAddress, IPerson } from './interface';
import { PersonDto } from './person.dto';

export class RootAuthorityDto {
  @IsNotEmpty()
  rootAuthorityId: string;

  @IsNotEmpty()
  rootAuthorityName: string;

  @IsNotEmpty()
  registrationCountry: string;

  @IsNotEmpty()
  businessRegistrationNumber: string;

  @IsNotEmpty()
  businessRegistrationNumberType: string;

  @IsNotEmpty()
  businessRegistrationDate: string;

  @ValidateNested()
  @Type(() => AddressDto)
  registeredOfficeAddress: IAddress;

  @IsNotEmpty()
  businessType: string;

  @IsNotEmpty()
  primaryBusinessFunction: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PersonDto)
  businessLead: string;

  websiteLink: string;

  @ValidateIf((o) => o.numberOfEmployees)
  @IsNumber()
  numberOfEmployees: number;

  otherCountriesOfOperation: string;
  otherRelatedEntities: string;
  shareholders: string;
  balanceSheetTotal: string;

  @ValidateNested()
  @Type(() => PersonDto)
  @ValidateIf((o) => o.operationalContact)
  operationalContact: IPerson;

  @ValidateNested()
  @Type(() => PersonDto)
  @ValidateIf((o) => o.leadUserContact)
  leadUserContact: IPerson;

  @ValidateNested()
  @Type(() => PersonDto)
  @ValidateIf((o) => o.financePersonConta)
  financePersonConta: IPerson;
}
