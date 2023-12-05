import { IsNotEmpty, IsOptional } from 'class-validator';
import { SafeNumber } from '@tymlez/platform-api-interfaces';

export class CreatePolicyDto {
  @IsNotEmpty({ message: 'Policy Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Version should not be empty' })
  version: string;

  @IsOptional()
  isPublished: boolean;

  @IsOptional()
  content: string;

  @IsOptional()
  tokenMintValue: SafeNumber;

  @IsOptional()
  republishedSchema: boolean;
}

export class UpdatePolicyDto {
  id: string;

  @IsNotEmpty({ message: 'Policy Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Version should not be empty' })
  version: string;

  @IsOptional()
  isPublished: boolean;

  @IsOptional()
  content: string;

  @IsOptional()
  tokenMintValue: SafeNumber;

  @IsOptional()
  republishedSchema: boolean;
}
