import {
  IGuardianDevice,
  IGuardianInstaller,
  IGuardianMRVSummary,
  IGuardianPolicyInfo,
  IGuardianProject,
  IGuardianSite,
  IGuardianTokenMintInfo,
  IGuardianVPInfo,
} from '@tymlez/trustchain-sdk';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrustchainTokenDto {
  @IsString()
  tokenClassId: string;

  @IsString()
  tokenSymbol: string;

  @IsNumber()
  value: number;

  @IsString()
  valueUOM: string;

  @IsString()
  accountId: string;

  @IsDate()
  transactionDatetime: string;

  @IsDate()
  consensusDatetime: string;

  @IsString()
  consensusTimestamp: string;

  @IsString()
  messageId: string;

  @IsString()
  transactionId: string;

  @IsNotEmpty()
  tokenMintInfo: IGuardianTokenMintInfo;

  @IsOptional()
  policyInfo: IGuardianPolicyInfo | undefined;

  @IsOptional()
  site: IGuardianSite | undefined;

  @IsOptional()
  project: IGuardianProject | undefined;

  @IsNotEmpty()
  devices: { count: number; items: IGuardianDevice[] };

  @IsNotEmpty()
  installers: { count: number; items: IGuardianInstaller[] };

  @IsNotEmpty()
  mrvSummary: Record<string, IGuardianMRVSummary>;

  @IsNotEmpty()
  vpInfo: IGuardianVPInfo | undefined;

  @IsString()
  createdBy: string;

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsArray()
  tags: string[] = [];
}
