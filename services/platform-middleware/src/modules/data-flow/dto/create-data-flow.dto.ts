import { IsNotEmpty, IsOptional } from 'class-validator';
import type { IIsoDate, IMeter } from '@tymlez/platform-api-interfaces';

export class CreateDataFlowDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsOptional()
  isPaused: boolean;

  @IsOptional()
  startISODateTime: IIsoDate;

  @IsOptional()
  endISODateTime?: IIsoDate;

  @IsOptional()
  runISODateTime?: IIsoDate;

  @IsOptional()
  runDelayIntervals: number;

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsNotEmpty()
  meter!: IMeter;

  @IsOptional()
  tags: string[];
}
