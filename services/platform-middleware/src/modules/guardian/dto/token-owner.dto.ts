import { IsNotEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryKey } from '@mikro-orm/core';
import { BaseGuardianDto } from './baseGuardian.dto';

export class CreateTokenOwnerDto extends BaseGuardianDto {
  @PrimaryKey({ type: 'uuid' })
  tokenOwnerId: string;

  @IsNotEmpty({ message: 'Business Name should not be empty' })
  tokenOwnerName: string;

  constructor() {
    super();
    this.tokenOwnerId = uuidv4();
  }
}

export class UpdateTokenOwnerDto extends BaseGuardianDto {
  tokenOwnerId: string;

  @IsNotEmpty({ message: 'Business Name should not be empty' })
  tokenOwnerName: string;
}
