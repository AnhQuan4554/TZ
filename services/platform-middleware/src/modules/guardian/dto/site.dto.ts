import { PrimaryKey, Unique } from '@mikro-orm/core';
import type { ILatitude, ILongitude } from '@tymlez/platform-api-interfaces';
import { IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class CreateGuardianSiteDto {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Lat should not be empty' })
  @IsLatitude()
  lat: ILatitude;

  @IsNotEmpty({ message: 'Lng should not be empty' })
  @IsLongitude()
  lng: ILongitude;
}

export class UpdateGuardianSiteDto {
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Lat should not be empty' })
  @IsLatitude()
  lat: ILatitude;

  @IsNotEmpty({ message: 'Lng should not be empty' })
  @IsLongitude()
  lng: ILongitude;
}

export class DeleteGuardianSiteDto {
  @IsNotEmpty()
  id: string;
}
