import type { Job } from 'bull';
import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';

import { PinoLogger } from 'nestjs-pino';
import { withTransaction } from '@tymlez/backend-libs';
import { HEALTH_CHECK_JOB, HEALTH_CHECK_QUEUE } from './healthcheck.service';

@Processor(HEALTH_CHECK_QUEUE)
export class HealthcheckProcessor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(HealthcheckProcessor.name);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    this.logger.info(
      {
        jobId: job.id,
        data: job.data,
      },
      `HealthcheckProcessor received job ${job.id} of type ${job.name} with data ${job.data.key}...`,
    );
  }

  @OnQueueError()
  onQueueError(error: Error) {
    this.logger.error(`TaskProcessor encountered ${error}`);
  }

  @Process(HEALTH_CHECK_JOB)
  async responseToHealthcheck(bullJob: Job<{ key: number }>) {
    this.logger.debug(`Healthcheck + ${bullJob.data.key}`);
    return withTransaction(
      'responseToHealthcheck',
      HealthcheckProcessor.name,
      async () => {
        return { isAlive: true };
      },
    );
  }
}
