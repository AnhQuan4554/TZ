import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { METRIC_NAMES, reportAPMMetric } from '@tymlez/backend-libs';
import { waitFor } from '@tymlez/common-libs';
import type { Queue } from 'bull';
import { TASK_QUEUE } from '../runner/runner.constants';

export const HEALTH_CHECK_QUEUE = 'healthcheck';
export const HEALTH_CHECK_JOB = 'healthcheck-job';
const UNHEALTHY_THRESHOLD = 10;
@Injectable()
export class HealthcheckService {
  private readonly logger = new Logger(HealthcheckService.name);

  constructor(
    @InjectQueue(HEALTH_CHECK_QUEUE) private queue: Queue,
    @InjectQueue(TASK_QUEUE) private taskQueue: Queue,
  ) {}

  public async isAlive() {
    const key = new Date().getTime();
    await this.queue.add(HEALTH_CHECK_JOB, { key });
    await waitFor(500);

    const jobs = await this.queue.getJobs(['waiting', 'active']);
    const taskQueueJobs = await this.taskQueue.getJobs(['waiting', 'active']);
    reportAPMMetric(METRIC_NAMES.WORKER_TASK_PENDING, taskQueueJobs.length);

    this.logger.log(
      { pendingJobs: taskQueueJobs.length },
      'Healthcheck pending job',
    );
    const hasError =
      jobs.length > 0 || taskQueueJobs.length > UNHEALTHY_THRESHOLD;
    if (hasError) {
      reportAPMMetric(METRIC_NAMES.WORKER_HEALTHCHECK_ERROR, 1);
      return { isAlive: false };
    }
    reportAPMMetric(METRIC_NAMES.WORKER_HEALTHCHECK_SUCCESS, 1);
    return {
      isAlive: true,
    };
  }
}
