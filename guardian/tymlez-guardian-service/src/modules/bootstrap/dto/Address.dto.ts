import { IsNotEmpty } from 'class-validator';
import type { IAddress } from './interface';

export class AddressDto implements IAddress {
  @IsNotEmpty()
  addressId: string;

  @IsNotEmpty()
  addressLine1: string;

  addressLine2: string;
  @IsNotEmpty()
  city: string;

  state: string;
  postalCode: string;
  @IsNotEmpty()
  country: string;

  GPSLocation: string;
}
