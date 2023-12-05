import { IsNotEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryKey } from '@mikro-orm/core';
import { BaseGuardianDto } from './baseGuardian.dto';

export class CreateRootAuthorityDto extends BaseGuardianDto {
  @PrimaryKey({ type: 'uuid' })
  rootAuthorityId: string;

  @IsNotEmpty({ message: 'Business Name should not be empty' })
  rootAuthorityName: string;

  constructor() {
    super();
    this.rootAuthorityId = uuidv4();
  }
}

export class UpdateRootAuthorityDto extends BaseGuardianDto {
  rootAuthorityId: string;

  @IsNotEmpty({ message: 'Business Name should not be empty' })
  rootAuthorityName: string;
}
