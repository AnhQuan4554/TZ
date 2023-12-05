import { PartialType } from '@nestjs/mapped-types';
import type { SafeNumber } from '@tymlez/platform-api-interfaces';
import { CreateMeterTaskDto } from './create-meter-task.dto';

export class UpdateMeterTaskDto extends PartialType(CreateMeterTaskDto) {
  id: SafeNumber;
}
