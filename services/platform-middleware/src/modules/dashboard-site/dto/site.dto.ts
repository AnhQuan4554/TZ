import { PrimaryKey, Unique } from '@mikro-orm/core';
import type {
  ILatitude,
  ILongitude,
  ISiteMetaData,
} from '@tymlez/platform-api-interfaces';
import { IsNotEmpty, IsString, IsLatitude, IsLongitude } from 'class-validator';
import type { Client } from '../../auth/entities/client.entity';

export class CreateSiteDto {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Label should not be empty' })
  label: string;

  @IsString()
  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;

  @IsNotEmpty({ message: 'Lat should not be empty' })
  @IsLatitude()
  lat: ILatitude;

  @IsNotEmpty({ message: 'Lng should not be empty' })
  @IsLongitude()
  lng: ILongitude;

  @IsString()
  timezone: string;

  metaData: ISiteMetaData;
}

export class UpdateSiteDto {
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  client: Client;

  @IsNotEmpty({ message: 'Label should not be empty' })
  label: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;

  @IsNotEmpty({ message: 'Lat should not be empty' })
  @IsLatitude()
  lat: ILatitude;

  @IsNotEmpty({ message: 'Lng should not be empty' })
  @IsLongitude()
  lng: ILongitude;

  @IsString()
  timezone: string;

  metaData: ISiteMetaData;
}

export class DeleteSiteDto {
  @IsNotEmpty()
  id: string;
}
