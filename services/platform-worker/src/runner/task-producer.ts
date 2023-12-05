import { withTransaction } from '@tymlez/backend-libs';
import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { EnumMeterTaskStatus, runAllSettled } from '@tymlez/common-libs';
import type { IMeterJob, IMeterTask } from '@tymlez/platform-api-interfaces';
import { PinoLogger } from 'nestjs-pino';
import {
  TASK_QUEUE,
  METER_TASK,
  MRV_QUEUE,
  MRV_TASK,
} from './runner.constants';
import { PlatformService } from '../platform/platform.service';

const CREATE_TASK_INTERVAL = parseInt(
  process.env.CREATE_TASK_INTERVAL || '5000',
  10,
);
@Injectable()
export class TaskProducer {
  constructor(
    private readonly logger: PinoLogger,
    @InjectQueue(TASK_QUEUE) private queue: Queue,
    @InjectQueue(MRV_QUEUE) private mrvQueue: Queue,
    private platformService: PlatformService,
  ) {
    this.logger.setContext(TaskProducer.name);
  }

  @Interval(CREATE_TASK_INTERVAL)
  async createTasks() {
    return withTransaction('Create Task', TaskProducer.name, async () => {
      const activeJobs = await this.platformService.getActiveJobs();

      this.logger.info(`Monitoring ${activeJobs.count} active jobs...`);
      await runAllSettled(activeJobs.data, async (job: IMeterJob) => {
        const result = await this.platformService.makeTask(job);

        if (result.success && result.data) {
          const newTask = result.data as IMeterTask;
          this.logger.info(
            `One task (${newTask.id}) created and queued for Job: ${job.id}(${job.name})`,
          );
        } else {
          this.logger.info(
            'Unable to create task for job: %s, reason: %s',
            job.name,
            result.message,
          );
        }
      });
    });
  }

  @Cron('0 * * * *', { name: 'runPendingTasks' })
  async runPendingTasksCron() {
    await this.runPendingTasks();
  }

  @Interval('runPendingTasks', 5000)
  async runPendingTasks() {
    return withTransaction('runPendingTasks', TaskProducer.name, async () => {
      this.logger.info('runPendingTasks');

      const now = new Date().toISOString();

      const res = await this.platformService.findTasks({
        $and: [
          { status: EnumMeterTaskStatus.Pending },
          { isoDateTime: { $lt: now } },
        ],
      });
      this.logger.info(`Found ${res.count} pending tasks`);
      const queueMap: any = {
        MRV: [this.mrvQueue, MRV_TASK],
        DATA: [this.queue, METER_TASK],
      };
      await runAllSettled(res.data, async (task: IMeterTask) => {
        const [queue, taskName] = queueMap[task.meterJob.type || 'DATA'];
        await this.platformService.updateTaskState(task.id, 'queue');
        queue.add(taskName, task);
        this.logger.info(`Task queued: ${taskName}#${task.id}`);
      });
    });
  }

  @Interval(300000)
  async rerunFailedTasks() {
    return withTransaction('rerunFailedTasks', TaskProducer.name, async () => {
      this.logger.info('rerunFailedTasks');

      const maxRetries = 5;

      const res = await this.platformService.findTasks({
        $and: [
          { status: EnumMeterTaskStatus.Error },
          { retries: { $lt: maxRetries } },
        ],
      });

      this.logger.info(`Found ${res.count} failed tasks to rerun`);

      await runAllSettled(res.data, async (task: IMeterTask) => {
        await this.platformService.updateTaskState(task.id, 'retry');
        this.logger.info(`Task queued for rerun: ${task.id}`);
      });
    });
  }

  @Interval(300000)
  async rerunHangingTasks() {
    return withTransaction('rerunHangingTasks', TaskProducer.name, async () => {
      this.logger.info('rerunHangingTasks');

      const momentAgo = new Date(new Date().getTime() - 10 * 60000);

      const res = await this.platformService.findTasks({
        $and: [
          { status: [EnumMeterTaskStatus.Running, EnumMeterTaskStatus.Queued] },
          { updatedAt: { $lt: momentAgo } },
        ],
      });

      this.logger.info(`Found ${res.count} hanging tasks to rerun`);

      await runAllSettled(res.data, async (task: IMeterTask) => {
        await this.platformService.updateTaskState(task.id, 'retry');
        this.logger.info(`Task queued for rerun: ${task.id}`);
      });
    });
  }
}
