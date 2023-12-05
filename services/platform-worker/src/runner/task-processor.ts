import type { Job } from 'bull';
import { CronTime } from 'cron';

import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';
import {
  reportAPMMetric,
  reportErrorToNewRelic,
  withTransaction,
} from '@tymlez/backend-libs';
import type {
  IMeterTask,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import { EnumMeterTaskStatus, EnumMeterTaskStage } from '@tymlez/common-libs';
import { PinoLogger } from 'nestjs-pino';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TASK_QUEUE, METER_TASK } from './runner.constants';
import { PlatformService } from '../platform/platform.service';
import { CollectionService } from '../collection/collection.service';
import { TransformationService } from '../transformation/transformation.service';
import { IngestionService } from '../ingestion/ingestion.service';

@Processor(TASK_QUEUE)
export class TaskProcessor {
  constructor(
    private readonly logger: PinoLogger,
    private platformService: PlatformService,
    private collectionService: CollectionService,
    private transformationService: TransformationService,
    private ingestionService: IngestionService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.setContext(TaskProcessor.name);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    reportAPMMetric(['Job', METER_TASK, 'Active'].join('.'), 1);
    this.logger.info(
      `TaskProcessor received job ${job.id} of type ${job.name} with ...`,
    );
  }

  @OnQueueError()
  onQueueError(error: Error) {
    reportErrorToNewRelic(error, ['Job', METER_TASK, 'Error'].join('.'));
    this.logger.error(`TaskProcessor encountered ${error}`);
  }

  @Process({ name: METER_TASK, concurrency: 5 })
  async executeMeterTask(bullJob: Job<IMeterTask>) {
    return withTransaction('executeMeterTask', TaskProcessor.name, async () => {
      const { id, meterJob } = bullJob.data;
      this.logger.info(`Processing task: ${id} `);

      const task = await this.platformService.findTask(id);

      if (task === null) {
        this.logger.info('Could not find task with this id');
        throw new Error(`Task not found with id ${id}`);
      }

      if (task.status !== EnumMeterTaskStatus.Queued) {
        this.logger.info(
          `Task is not in executable status: ${task.status}. Skip`,
        );
        return;
      }

      try {
        await this.platformService.updateTaskState(id, 'start');

        let res: IMutationResult = {
          success: false,
          message: 'Unhandled task type',
        };

        if (task?.stage === EnumMeterTaskStage.Collection) {
          res = await this.collectionService.collectDataForTask(task);
        } else if (task?.stage === EnumMeterTaskStage.Transformation) {
          res = await this.transformationService.tranformDataForTask(task);
        } else if (task?.stage === EnumMeterTaskStage.Ingestion) {
          res = await this.ingestionService.ingestDataForTask(task);
        }
        if (res.success) {
          reportAPMMetric(['Tasks', task.meter.key, 'Completed'].join('.'), 1);
          reportAPMMetric(['Job', meterJob.name, 'Completed'].join('.'), 1);
          await this.platformService.updateTaskState(task.id, 'complete');
        } else {
          reportAPMMetric(['Tasks', task.meter.key, 'Error'].join('.'), 1);
          reportAPMMetric(['Job', meterJob.name, 'Error'].join('.'), 1);
          await this.platformService.updateTaskState(
            task.id,
            'error',
            res.message,
          );
        }

        try {
          const result = await this.platformService.makeTask({
            id: task.meterJob,
          } as any);
          if (result.success || res.success) {
            const runPendingTasksJob = await this.schedulerRegistry.getCronJob(
              'runPendingTasks',
            );

            await runPendingTasksJob.setTime(
              new CronTime(new Date(new Date().getTime() + 1000)),
            );
          }
        } catch (createTaskError) {
          this.logger.error(
            { error: createTaskError },
            'Unable to start new task',
          );
        }
      } catch (err) {
        this.logger.error({ err }, 'data task error');
        reportErrorToNewRelic(
          err as Error,
          ['Tasks', task.meter.key, 'Error'].join('.'),
        );
        reportErrorToNewRelic(
          err as Error,
          ['Tasks', task.meter.key, 'Error'].join('.'),
        );
        await this.platformService.updateTaskState(task.id, 'error', `${err}`);
      }
    });
  }
}
