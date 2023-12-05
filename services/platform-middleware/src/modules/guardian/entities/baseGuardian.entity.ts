import { Property } from '@mikro-orm/core';
import type { IAddress, IPerson } from '@tymlez/platform-api-interfaces';

export abstract class BaseGuardianEntity {
  @Property() registrationCountry: string;
  @Property() businessRegistrationNumber: string;
  @Property() businessRegistrationNumberType: string;
  @Property() businessRegistrationDate: Date;
  @Property() registeredOfficeAddress: IAddress;
  @Property() businessType: string;
  @Property() primaryBusinessFunction: string;
  @Property() businessLead: IPerson;
  @Property({ nullable: true }) websiteLink?: string;
  @Property({ type: 'number', nullable: true }) numberOfEmployees?: number;
  @Property({ nullable: true }) otherCountriesOfOperation?: string;
  @Property({ nullable: true }) otherRelatedEntities?: string;
  @Property({ nullable: true }) shareholders?: string;
  @Property({ nullable: true }) balanceSheetTotal?: string;
  @Property({ nullable: true }) operationalContact?: IPerson;
  @Property({ nullable: true }) leadUserContact?: IPerson;
  @Property({ nullable: true }) financePersonContact?: IPerson;
}
