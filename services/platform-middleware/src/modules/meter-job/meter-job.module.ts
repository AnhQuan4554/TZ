import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { MeterJobService } from './meter-job.service';
import { MeterJobController } from './meter-job.controller';
import { MeterJobMicroservice } from './meter-job.microservice';
import { MeterJob } from './entities/meter-job.entity';
import { MeterTask } from '../meter-task/entities/meter-task.entity';

@Module({
  imports: [MikroOrmModule.forFeature([MeterJob, MeterTask]), AuthModule],
  controllers: [MeterJobController, MeterJobMicroservice],
  providers: [MeterJobService],
  exports: [MeterJobService],
})
export class MeterJobModule {}
