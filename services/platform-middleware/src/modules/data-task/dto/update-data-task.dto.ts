import { PartialType } from '@nestjs/swagger';
import type { IDataFlow, UUID } from '@tymlez/platform-api-interfaces';
import { IsOptional } from 'class-validator';
import { CreateDataTaskDto } from './create-data-task.dto';

export class UpdateDataTaskDto extends PartialType(CreateDataTaskDto) {
  id: UUID;

  @IsOptional()
  name: string;

  @IsOptional()
  type: string;

  @IsOptional()
  dataFlow: IDataFlow;
}
