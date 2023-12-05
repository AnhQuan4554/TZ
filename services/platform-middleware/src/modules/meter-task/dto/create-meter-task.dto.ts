import { IsNotEmpty, IsOptional } from 'class-validator';
import type {
  ISite,
  IIsoDate,
  IMeterJob,
  IMeter,
  IMeterTaskStage,
  IMeterTaskStatus,
  SafeNumber,
} from '@tymlez/platform-api-interfaces';

export class CreateMeterTaskDto {
  @IsNotEmpty()
  site: ISite;

  @IsNotEmpty()
  meter: IMeter;

  @IsNotEmpty()
  meterJob: IMeterJob;

  @IsNotEmpty()
  stage: IMeterTaskStage;

  @IsNotEmpty()
  isoDateTime: IIsoDate;

  @IsNotEmpty()
  status: IMeterTaskStatus;

  @IsNotEmpty()
  retries?: SafeNumber;

  @IsOptional()
  error?: string;

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsOptional()
  tags: string[] = [];
}
