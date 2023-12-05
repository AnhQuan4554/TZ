import type { IAddress, IPerson } from '@tymlez/platform-api-interfaces';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

export class BaseGuardianDto {
  @IsNotEmpty({ message: 'Registration Country should not be empty' })
  registrationCountry: string;

  @IsNotEmpty({ message: 'Business Registration Number should not be empty' })
  businessRegistrationNumber: string;

  @IsNotEmpty({
    message: 'Business Registration Number Type should not be empty',
  })
  businessRegistrationNumberType: string;

  @IsNotEmpty({ message: 'Business Registration Date should not be empty! ' })
  businessRegistrationDate: Date;

  @IsNotEmpty({ message: 'Registered Office Address should not be empty! ' })
  registeredOfficeAddress: IAddress;

  @IsNotEmpty({ message: 'Business Type should not be empty!' })
  businessType: string;

  @IsNotEmpty({ message: 'Primary Business Function should not be empty!' })
  primaryBusinessFunction: string;

  @IsNotEmpty({ message: 'Business Lead Details should not be empty! ' })
  businessLead: IPerson;

  @ValidateIf((o) => o.websiteLink)
  @IsUrl({}, { message: 'Website Link must be an URL address' })
  websiteLink: string;

  @ValidateIf((o) => o.numberOfEmployees)
  @IsInt({ message: 'Number Of Employees should be an integer number! ' })
  @Min(1, { message: 'Number Of Employees must be greater than 0. ' })
  numberOfEmployees: number;

  @IsOptional()
  otherCountriesOfOperation: string;

  @IsOptional()
  otherRelatedEntities: string;

  @IsOptional()
  shareholders: string;

  @IsOptional()
  balanceSheetTotal: string;

  @IsOptional()
  operationalContact: IPerson;

  @IsOptional()
  leadUserContact: IPerson;

  @IsOptional()
  financePersonContact: IPerson;
}
