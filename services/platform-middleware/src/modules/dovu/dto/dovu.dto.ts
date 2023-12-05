import { IsNotEmpty, IsOptional } from 'class-validator';
import type { SafeNumber } from '@tymlez/platform-api-interfaces';

export class CreateDovuDto {
  @IsNotEmpty() signature: string;

  @IsNotEmpty() partnerIdentifier: string;

  @IsOptional() customerReference: string;

  @IsNotEmpty() retirementTx: string;

  @IsNotEmpty() retiredKgs: SafeNumber;

  @IsNotEmpty() reserveRemainingKg: SafeNumber;
}
