import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsOptional()
  value: string;

  @IsOptional()
  metaValue: string;

  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'Type should not be empty' })
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  group: string;
}

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  id: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsOptional()
  @IsString()
  group: string;
}
