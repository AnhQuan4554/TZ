import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import type {
  ILatitude,
  ILongitude,
  IMeterType,
  ISite,
  SafeNumber,
} from '@tymlez/platform-api-interfaces';
import { PrimaryKey, Unique } from '@mikro-orm/core';

export class CreateMeterDto {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @Unique()
  @IsNotEmpty({ message: 'Key should not be empty' })
  key: string;

  @IsNotEmpty({ message: 'Site should be selected' })
  site: string;

  @IsNotEmpty({ message: 'Meter Type should not be empty' })
  meterType: IMeterType;

  @ValidateIf((o) => o.lat)
  @IsLatitude()
  lat: ILatitude;

  @ValidateIf((o) => o.lng)
  @IsLongitude()
  lng: ILongitude;

  @IsOptional()
  @IsNumber({}, { message: 'Interval should be a number' })
  interval: SafeNumber;

  @IsNotEmpty({ message: 'Data Source should not be empty' })
  @IsString()
  dataSource: string;

  @IsOptional()
  @IsNumber()
  dataDelaySec: SafeNumber;

  @IsNotEmpty({ message: 'Data Source Type should be selected' })
  @IsString()
  dataSourceType: string;

  @IsOptional()
  @IsString()
  dataCredentials: string;

  @IsOptional()
  @IsString()
  device: string;
}

export class UpdateMeterDto {
  id: string;

  @Unique()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @Unique()
  @IsNotEmpty({ message: 'Key should not be empty' })
  key: string;

  @IsNotEmpty()
  site: ISite;

  @IsNotEmpty()
  @IsString()
  meterType: IMeterType;

  @ValidateIf((o) => o.lat)
  @IsLatitude()
  lat: ILatitude;

  @ValidateIf((o) => o.lng)
  @IsLongitude()
  lng: ILongitude;

  @IsOptional()
  @IsNumber({}, { message: 'Interval should be a number' })
  interval: SafeNumber;

  @IsNotEmpty({ message: 'Data Source should not be empty' })
  @IsString()
  dataSource: string;

  @IsOptional()
  @IsString()
  dataCredentials: string;

  @IsOptional()
  @IsString()
  device: string;
}

export class DeleteMeterDto {
  @IsNotEmpty()
  meterId: string;
}
