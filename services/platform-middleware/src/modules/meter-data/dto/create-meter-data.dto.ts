import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import type { IIsoDate } from '@tymlez/platform-api-interfaces';

export class CreateMeterDataDto {
  @IsNotEmpty()
  meterKey: string;

  @IsNumber()
  interval: number;

  @IsString()
  metricName: string;

  @IsNumber()
  metricValue: number;

  @IsDate()
  isoDateTime: IIsoDate;

  @IsDate()
  isoDateTimeHour: IIsoDate;

  @IsDate()
  isoDateTimeDay: IIsoDate;

  @IsDate()
  isoDateTimeWeek: IIsoDate;

  @IsDate()
  isoDateTimeMonth: IIsoDate;

  @IsOptional()
  createdAt?: Date = new Date();

  @IsOptional()
  updatedAt?: Date = new Date();

  @IsOptional()
  tags?: string[] = [];

  @IsOptional()
  sourceHash?: string;
}
