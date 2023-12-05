import { IsNotEmpty, IsOptional } from 'class-validator';
import { IMeter } from '@tymlez/platform-api-interfaces';
import { PartialType } from '@nestjs/mapped-types';
import { Unique } from '@mikro-orm/core';

export class CreateTenancyDto {
  @IsNotEmpty()
  @Unique()
  name: string;

  @IsNotEmpty()
  visible: boolean;

  @IsNotEmpty()
  meter: IMeter;

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsOptional()
  tags: string[] = [];
}

export class UpdateTenancyDto extends PartialType(CreateTenancyDto) {
  id: string;
}

export class DeleteTenancyDto {
  @IsNotEmpty()
  id: string;
}
