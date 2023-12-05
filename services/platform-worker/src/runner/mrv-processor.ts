import type { Job } from 'bull';
import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';
import type {
  IMeterTask,
  IMutationResult,
  IMrvStateResponse,
} from '@tymlez/platform-api-interfaces';
import {
  reportAPMMetric,
  reportErrorToNewRelic,
  withTransaction,
} from '@tymlez/backend-libs';
import { PinoLogger } from 'nestjs-pino';
import { EnumMeterTaskStatus, MvrTaskState } from '@tymlez/common-libs';
import { MRV_QUEUE, MRV_TASK } from './runner.constants';
import { PlatformService } from '../platform/platform.service';
import { MrvService } from '../mrv/mrv.service';

@Processor(MRV_QUEUE)
export class MrvTaskProcessor {
  constructor(
    private readonly logger: PinoLogger,
    private platformService: PlatformService,
    private mrvService: MrvService,
  ) {
    this.logger.setContext(MrvTaskProcessor.name);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    reportAPMMetric(['Job', MRV_TASK, 'Active'].join('.'), 1);
    this.logger.info(
      `MrvTaskProcessor received job ${job.id} of type ${job.name} with ...`,
    );
  }

  @OnQueueError()
  onQueueError(error: Error) {
    reportErrorToNewRelic(error as Error, ['Job', MRV_TASK, 'Error'].join('.'));
    this.logger.error(`MrvTaskProcessor encountered ${error}`);
  }

  @Process({ name: MRV_TASK, concurrency: 3 })
  async sendMRV(bullJob: Job<IMeterTask>) {
    return withTransaction('sendMRV', MrvTaskProcessor.name, async () => {
      const { id, meterJob } = bullJob.data;
      this.logger.info(`Processing mrv task: ${id} `);

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

        // this will check everytime we submit mrv

        const historicalSubmissionResult =
          await this.platformService.submitHistorialCarbon();
        if (!historicalSubmissionResult?.success) {
          this.logger.error({ historicalSubmissionResult });
          throw new Error(
            `Unable to submit historical MRV: ${historicalSubmissionResult.message}`,
          );
        }

        let res: IMutationResult<IMrvStateResponse> = {
          success: false,
          message: 'Unhandled task type',
        };

        if (task?.stage === MvrTaskState.Prepare) {
          res = await this.mrvService.prepareMrv(task);
        } else if (task?.stage === MvrTaskState.Validation) {
          res = await this.mrvService.validateMrv(task);
        } else if (task?.stage === MvrTaskState.Submission) {
          res = await this.mrvService.submitMrv(task);
        }
        if (res.success) {
          const targetEvent = res.data?.markAsDone ? 'finish' : 'complete';
          await this.platformService.updateTaskState(
            task.id,
            targetEvent,
            res.message,
          );
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
      } catch (err) {
        reportErrorToNewRelic(err as Error);
        this.logger.error({ err }, 'MRV task error');
        await this.platformService.updateTaskState(task.id, 'error', `${err}`);
      }
    });
  }
}
