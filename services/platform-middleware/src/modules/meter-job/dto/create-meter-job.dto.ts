import { IsNotEmpty, IsOptional } from 'class-validator';
import type {
  IIsoDate,
  IMeter,
  IMeterTask,
} from '@tymlez/platform-api-interfaces';

export class CreateMeterJobDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsOptional()
  isPaused: boolean;

  @IsOptional()
  startISODateTime: IIsoDate;

  @IsOptional()
  endISODateTime?: IIsoDate;

  @IsNotEmpty()
  type!: string;

  @IsNotEmpty()
  meter!: IMeter;

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsOptional()
  tags: string[] = [];

  @IsOptional()
  settings: Record<string, any> | undefined = {};

  @IsOptional()
  runSettings: Record<string, any> | undefined = {};

  @IsOptional()
  currentTask: IMeterTask | undefined;
}
