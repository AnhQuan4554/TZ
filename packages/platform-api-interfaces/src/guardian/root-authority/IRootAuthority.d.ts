import { IPerson } from '../IPerson';
import { IAddress } from '../IAddress';
import type { SafeNumber } from '../../data-type/SafeNumber';

export type IRootAuthority = {
  rootAuthorityId: string; //Root Authority Id - Unique identifier
  rootAuthorityName: string; //Root Authority  Name - Business name for the Root Authority
  registrationCountry: string; //Registration Country - Name of the country where the business is registered
  businessRegistrationNumber: string; //Business Registration Number - Registration number for the business
  businessRegistrationNumberType: string; //Business Registration Number Type - Registration number type e.g. ACN for Australia
  businessRegistrationDate: any; //Business Registration Date - Date the business was first registered
  registeredOfficeAddress: IAddress; //Registered Office Address - Official address of the business
  businessType: string; //Business Type - Legal status/type of business
  primaryBusinessFunction: string; //Primary Business Function - Main function/activity of the Business
  businessLead: IPerson; //Business Lead - Details of the CEO or General Manager
  websiteLink?: string; //Website Link - URL of the company Website
  numberOfEmployees?: SafeNumber; //Number Of Employees -Approximate number of employees
  otherCountriesOfOperation?: string; //Other Countries Of Operation - List of other countries the business operates in
  otherRelatedEntities?: string; //Other Related Businesses - List of other entities related to this Business
  shareholders?: string; //Shareholders - List of significant Shareholders
  balanceSheetTotal?: string; //Balance Sheet Total - Balance sheet total for the last financial year inc currency
  operationalContact?: IPerson; //Operational  Contact - Details of the operational contact (name, email, phone etc..)
  leadUserContact?: IPerson; //Lead User Contact - Details of the main user contact (name, email, phone etc..)
  financePersonContact?: IPerson; //Finance Person Contact - Details of the finance contact (name, email, phone etc..)
  isPublished: boolean;
};
