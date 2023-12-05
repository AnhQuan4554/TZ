import { firstValueFrom } from 'rxjs';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { FilterQuery } from '@mikro-orm/core';
import type {
  IFindResult,
  IFindOneResult,
  IMeterJob,
  IMeterTask,
  IMutationResult,
  IMeterTaskStateEvent,
  IMeterData,
  IMeterDataQuery,
  IMeterDataResult,
  IMrvProcessRequest,
  IMrvStateResponse,
} from '@tymlez/platform-api-interfaces';
import { withSegment } from '@tymlez/backend-libs';

@Injectable()
export class PlatformService {
  private readonly logger = new Logger(PlatformService.name);

  constructor(
    @Inject('PLATFORM_SERVICE') private platformClient: ClientProxy,
  ) {}

  private async request<T>(name: string, data: any) {
    return withSegment(name, async () => {
      const res = await this.platformClient.send<T>(name, data);
      const output = await firstValueFrom(res);
      return output as T;
    });
  }

  async getActiveJobs(): Promise<IFindResult<IMeterJob>> {
    this.logger.debug('getActiveJobs');
    return await this.request<IFindResult<IMeterJob>>('meter-job.findAll', {
      filters: { isPaused: false },
      options: { populate: ['meter.site'], cache: false },
    });
  }

  async getMeterJob(jobId: string): Promise<IMeterJob> {
    return this.request<IMeterJob>('meter-job.findOne', jobId);
  }

  async makeTask(job: IMeterJob): Promise<IMutationResult> {
    return this.request<IMutationResult>('meter-job.makeTask', job.id);
  }

  async findTasks(
    filters: FilterQuery<IMeterTask> = {},
  ): Promise<IFindResult<IMeterTask>> {
    this.logger.debug('findTasks');
    return this.request<IFindResult<IMeterTask>>('meter-task.findAll', {
      filters,
      options: { cache: false, populate: ['meterJob'] },
    });
  }

  async findTask(taskId: number): Promise<IFindOneResult<IMeterTask>> {
    this.logger.debug('findTask');

    return this.request<IFindOneResult<IMeterTask>>(
      'meter-task.findOne',
      taskId,
    );
  }

  async updateTaskState(
    taskId: number,
    stateEvent: IMeterTaskStateEvent,
    error?: string,
  ): Promise<IMutationResult> {
    this.logger.debug('updateTaskState');
    return this.request<IMutationResult>('meter-task.updateState', {
      taskId,
      stateEvent,
      error,
    });
  }

  async ingestMeterData(data: IMeterData[]): Promise<IMutationResult> {
    this.logger.debug('ingestMeterData');
    return this.request<IMutationResult>('meter-data.ingest', data);
  }

  async queryMeterData(query: IMeterDataQuery): Promise<IMeterDataResult[]> {
    return this.request<IMeterDataResult[]>('meter-data.query', query);
  }

  async prepareMrv(
    request: IMrvProcessRequest,
  ): Promise<IMutationResult<IMrvStateResponse>> {
    return this.request<IMutationResult<IMrvStateResponse>>(
      'mrv.prepare',
      request,
    );
  }

  async validateMrv(
    request: IMrvProcessRequest,
  ): Promise<IMutationResult<IMrvStateResponse>> {
    return this.request<IMutationResult<IMrvStateResponse>>(
      'mrv.validate',
      request,
    );
  }

  async submitMrv(
    request: IMrvProcessRequest,
  ): Promise<IMutationResult<IMrvStateResponse>> {
    return this.request<IMutationResult<IMrvStateResponse>>(
      'mrv.submission',
      request,
    );
  }

  async submitHistorialCarbon(): Promise<IMutationResult> {
    return this.request<IMutationResult>('mrv.submit-historical-data', {});
  }
}
