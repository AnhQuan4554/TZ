import { IsNotEmpty, IsOptional } from 'class-validator';
import { IDataFlow, IDataTask } from '@tymlez/platform-api-interfaces';

export class CreateDataTaskDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  dataFlow: IDataFlow;

  @IsOptional()
  settings?: Record<string, any>;

  @IsOptional()
  dependsOn?: IDataTask[];

  @IsOptional()
  createdAt: Date = new Date();

  @IsOptional()
  updatedAt: Date = new Date();

  @IsOptional()
  tags: string[];
}
