import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TASK_QUEUE } from '../runner/runner.constants';

import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckProcessor } from './healthcheck.processor';
import { HealthcheckService, HEALTH_CHECK_QUEUE } from './healthcheck.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: HEALTH_CHECK_QUEUE,
      defaultJobOptions: {
        removeOnComplete: 10,
        removeOnFail: 10,
      },
    }),
    BullModule.registerQueue({
      name: TASK_QUEUE,
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 10000,
      },
    }),
  ],

  controllers: [HealthcheckController],
  providers: [HealthcheckService, HealthcheckProcessor],
})
export class HealthcheckModule {}
