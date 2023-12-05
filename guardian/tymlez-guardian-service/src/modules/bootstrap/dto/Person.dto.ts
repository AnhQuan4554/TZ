import { IsNotEmpty } from 'class-validator';
import type { IPerson } from './interface';

export class PersonDto implements IPerson {
  @IsNotEmpty()
  personId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  familyName: string;

  @IsNotEmpty()
  givenNames: string;

  identificationNumber: string;
  identificationNumberType: string;
  identificationNumberAuthority: string;
}
