export interface IAddress {
  addressId: string; //Address Id - Unique identifier for the address
  addressLine1: string; //Address Line 1 - First line of the address
  addressLine2?: string; //Address Line 2 - Second line of the address
  city: string; //City -City/Town/Suburb
  state?: string; //State -State/County/Region
  postalCode?: string; //Postal Code -Post code/Zip code
  country: string; //Country -  Country;
  GPSLocation?: string; //GPS Location -Longitude & Latitude of the address
}
