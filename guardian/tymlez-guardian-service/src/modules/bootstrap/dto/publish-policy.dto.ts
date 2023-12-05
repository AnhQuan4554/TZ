import type { EnumPolicyNames } from '@tymlez/common-libs';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PublishPolicyDto {
  @IsNotEmpty()
  policyName: EnumPolicyNames;

  @IsNotEmpty()
  version: string;

  @IsNumber()
  tokenMintValue: number;

  republishSchema: boolean;
}
