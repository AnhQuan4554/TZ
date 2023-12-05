export interface IPerson {
  personId: string;
  title: string;
  familyName: string;
  givenNames: string;
  identificationNumber: string;
  identificationNumberType: string;
  identificationNumberAuthority: string;
}
export interface IAddress {
  addressId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  GPSLocation: string;
}
