import { PartialType } from '@nestjs/swagger';
import type { IMeter, UUID } from '@tymlez/platform-api-interfaces';
import { IsOptional } from 'class-validator';
import { CreateDataFlowDto } from './create-data-flow.dto';

export class UpdateDataFlowDto extends PartialType(CreateDataFlowDto) {
  id: UUID;

  @IsOptional()
  name: string;

  @IsOptional()
  meter!: IMeter;
}
