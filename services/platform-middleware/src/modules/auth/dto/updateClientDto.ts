import { IsNotEmpty } from 'class-validator';

export class UpdateClientDto {
  name: string;

  @IsNotEmpty({ message: 'Label should not be empty' })
  label: string;
}
