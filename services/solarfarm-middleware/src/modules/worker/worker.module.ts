import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { WorkerMicroservice } from './worker.microservices';
import { WorkerService } from './worker.service';

@Module({
  imports: [PlatformModule],
  controllers: [WorkerMicroservice],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
