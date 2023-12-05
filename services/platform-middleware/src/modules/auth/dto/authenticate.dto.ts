import { IsNotEmpty } from 'class-validator';

export class AuthenticateDto {
  @IsNotEmpty()
  idToken: string;

  @IsNotEmpty()
  providerId: string;
}
