import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { DataTaskService } from './data-task.service';
import { DataTaskController } from './data-task.controller';
import { DataTaskMicroservice } from './data-task.microservice';
import { DataTask } from './entities/data-task.entity';
import { DataFlow } from '../data-flow/entities/data-flow.entity';

@Module({
  imports: [MikroOrmModule.forFeature([DataTask, DataFlow]), AuthModule],
  controllers: [DataTaskController, DataTaskMicroservice],
  providers: [DataTaskService],
  exports: [DataTaskService],
})
export class DataTaskModule {}
