import { PartialType } from '@nestjs/swagger';
import type { UUID } from '@tymlez/platform-api-interfaces';
import { CreateMeterJobDto } from './create-meter-job.dto';

export class UpdateMeterJobDto extends PartialType(CreateMeterJobDto) {
  id: UUID;
}
