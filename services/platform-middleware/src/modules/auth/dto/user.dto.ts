import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be longer than or equal to 6 characters',
  })
  password: string;

  @IsNotEmpty()
  roles: string[];

  @IsNotEmpty()
  name: string;

  timeout: number;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((o) => o.password)
  @IsString()
  @MinLength(6, {
    message: 'Password must be longer than or equal to 6 characters',
  })
  password: string;

  @IsNotEmpty()
  roles: string[];

  @IsNotEmpty()
  name: string;

  timeout: number;
}
