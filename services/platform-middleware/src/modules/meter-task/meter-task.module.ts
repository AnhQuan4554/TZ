import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MeterTaskService } from './meter-task.service';
import { MeterTaskMicroservice } from './meter-task.microservice';
import { MeterTask } from './entities/meter-task.entity';
import { MeterTaskController } from './meter-task.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MeterTask])],
  controllers: [MeterTaskMicroservice, MeterTaskController],
  providers: [MeterTaskService],
  exports: [MeterTaskService],
})
export class MeterTaskModule {}
