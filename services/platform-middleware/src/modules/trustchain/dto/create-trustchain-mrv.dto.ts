import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrustchainMRVDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  datetime: string;

  @IsString()
  deviceId: string;

  @IsString()
  deviceDid: string;

  @IsString()
  readingHashes: string;

  @IsDate()
  intervalStartDatetime: string;

  @IsDate()
  intervalEndDatetime: string;

  @IsNumber()
  intervalDuration: number;

  @IsString()
  intervalDurationUOM: string;

  @IsNumber()
  value: number;

  @IsString()
  valueUOM: string;

  @IsNumber()
  emission: number;

  @IsString()
  emissionUOM: string;

  @IsNotEmpty()
  otherMRVData: { [key: string]: number };

  @IsNotEmpty()
  rawData: { [key: string]: any };

  @IsString()
  @IsOptional()
  siteId: string | undefined;

  @IsString()
  @IsOptional()
  tokenClassId: string | undefined;

  @IsString()
  @IsOptional()
  accountId: string | undefined;

  @IsString()
  @IsOptional()
  transactionId: string | undefined;

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsArray()
  tags: string[] = [];
}
