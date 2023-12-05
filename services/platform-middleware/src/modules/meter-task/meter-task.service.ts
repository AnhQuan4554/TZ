import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import {
  EnumMeterTaskStatus,
  EnumMeterTaskStage,
  MvrTaskState,
} from '@tymlez/common-libs';
import {
  IFindResult,
  IFindOneResult,
  IMeterTask,
  IMeterTaskState,
  IMeterTaskStateEvent,
  IMutationResult,
  IMeterTaskQuery,
} from '@tymlez/platform-api-interfaces';
import { CreateMeterTaskDto } from './dto/create-meter-task.dto';
import { UpdateMeterTaskDto } from './dto/update-meter-task.dto';
import { MeterTask } from './entities/meter-task.entity';
import { MeterJob } from '../meter-job/entities/meter-job.entity';

@Injectable()
export class MeterTaskService {
  constructor(
    @InjectRepository(MeterTask)
    private meterTaskRepo: EntityRepository<MeterTask>,

    private em: EntityManager,
  ) {}

  async create(
    createMeterTaskDto: CreateMeterTaskDto,
  ): Promise<IMutationResult> {
    const newEntity = this.meterTaskRepo.create({
      ...createMeterTaskDto,
    });

    try {
      await this.meterTaskRepo.persistAndFlush(newEntity);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  async findAll(filter = {}, options = {}): Promise<IFindResult<MeterTask>> {
    const [data, count] = await this.em
      .fork()
      .findAndCount<MeterTask>(MeterTask, filter, options);

    return { count, data };
  }

  public async getAll(
    pageSize: number,
    page: number,
    query: IMeterTaskQuery,
  ): Promise<IFindResult<MeterTask>> {
    const filterQuery = this.getFilterQuery(query);

    try {
      const [data, count] = await this.meterTaskRepo.findAndCount(filterQuery, {
        orderBy: { id: 'DESC' },
        limit: pageSize,
        offset: page * pageSize,
        populate: true,
      });
      return { count, data };
    } catch (err) {
      return { count: 0, data: [] };
    }
  }

  private getFilterQuery(query: IMeterTaskQuery) {
    const { startDateTime, endDateTime, status, meterJobId } = query;

    const filterQuery = this.getFilterDateRangeQuery(
      startDateTime,
      endDateTime,
    );

    switch (status) {
      case EnumMeterTaskStatus.Queued: {
        filterQuery.status = EnumMeterTaskStatus.Queued;
        break;
      }
      case EnumMeterTaskStatus.Pending: {
        filterQuery.status = EnumMeterTaskStatus.Pending;
        break;
      }
      case EnumMeterTaskStatus.Running: {
        filterQuery.status = EnumMeterTaskStatus.Running;
        break;
      }
      case EnumMeterTaskStatus.Success: {
        filterQuery.status = EnumMeterTaskStatus.Success;
        break;
      }
      case EnumMeterTaskStatus.Error: {
        filterQuery.status = EnumMeterTaskStatus.Error;
        break;
      }
      case EnumMeterTaskStatus.Active: {
        filterQuery.status = { $nin: [EnumMeterTaskStatus.Success] };
        break;
      }
    }

    if (meterJobId && meterJobId !== 'all') {
      filterQuery.meterJob = { id: meterJobId };
    }

    return filterQuery;
  }

  private getFilterDateRangeQuery(from: string, to: string) {
    const filterQuery: any = {};
    if (from && to) {
      filterQuery.isoDateTime = {
        $gte: from,
        $lte: to,
      };
    }
    return filterQuery;
  }

  async findActive(): Promise<IFindResult<MeterTask>> {
    const data = await this.em
      .fork()
      .find<MeterTask>(
        MeterTask,
        { status: { $nin: [EnumMeterTaskStatus.Success] } },
        { populate: true, orderBy: { id: 'DESC' } },
      );

    return { count: data.length, data };
  }

  async findOne(
    id: number,
    populate = ['meter'],
  ): Promise<IFindOneResult<MeterTask>> {
    return await this.em
      .fork()
      .findOne(MeterTask, { id }, { populate: populate as any });
  }

  async update(
    id: number,
    updateMeterTaskDto: UpdateMeterTaskDto,
  ): Promise<IMutationResult<IMeterTask | null>> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Task does not exist. No Task to update',
      };
    }
    const job = await this.em.findOne(MeterJob, existing.meterJob.id);
    if (
      updateMeterTaskDto.stage &&
      job?.type === 'MRV' &&
      updateMeterTaskDto.stage === EnumMeterTaskStage.Collection
    ) {
      // eslint-disable-next-line no-param-reassign
      updateMeterTaskDto.stage = MvrTaskState.Prepare;
    }

    Object.assign(existing, updateMeterTaskDto);
    try {
      await this.meterTaskRepo.persistAndFlush(existing);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
      data: await this.findOne(id),
    };
  }

  async remove(id: number): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Task does not exist. No Task to remove',
      };
    }
    try {
      await this.meterTaskRepo.removeAndFlush(existing);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  async updateState(
    taskId: number,
    stateEvent: IMeterTaskStateEvent,
    error = '',
  ): Promise<IMutationResult> {
    const existing = await this.findOne(taskId);
    if (existing === null) {
      return {
        success: false,
        message: 'Task does not exist. No Task to update',
      };
    }
    const newState = await this.getNewState(existing, stateEvent, error);
    Object.assign(existing, newState);

    try {
      await this.meterTaskRepo.persistAndFlush(existing);
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  private async getNewState(
    task: IMeterTask,
    event: IMeterTaskStateEvent,
    errMsg?: string,
  ): Promise<IMeterTaskState> {
    const state: IMeterTaskState = {
      stage: task.stage,
      status: task.status,
      retries: task.retries || 0,
      error: task.error,
    };

    if (event === 'start') {
      state.status = EnumMeterTaskStatus.Running;
      state.error = '';
    }

    if (event === 'error') {
      state.status = EnumMeterTaskStatus.Error;
      state.error = errMsg;
    }
    if (
      event === 'complete' &&
      ![EnumMeterTaskStatus.Pending, EnumMeterTaskStatus.Queued].includes(
        task.status as any,
      )
    ) {
      state.error = errMsg;
      if (state.stage === EnumMeterTaskStage.Collection) {
        state.stage = EnumMeterTaskStage.Transformation;
        state.status = EnumMeterTaskStatus.Pending;
      } else if (state.stage === EnumMeterTaskStage.Transformation) {
        state.stage = EnumMeterTaskStage.Ingestion;
        state.status = EnumMeterTaskStatus.Pending;
      } else if (state.stage === EnumMeterTaskStage.Ingestion) {
        state.status = EnumMeterTaskStatus.Success;
      } else if (state.stage === MvrTaskState.Prepare) {
        state.stage = MvrTaskState.Validation;
        state.status = EnumMeterTaskStatus.Pending;
      } else if (state.stage === MvrTaskState.Validation) {
        state.stage = MvrTaskState.Submission;
        state.status = EnumMeterTaskStatus.Pending;
      } else if (state.stage === MvrTaskState.Submission) {
        state.status = EnumMeterTaskStatus.Success;
      }
    }

    if (event === 'retry') {
      const job = await this.em.findOne(MeterJob, task.meterJob.id);
      state.retries += 1;
      state.status = EnumMeterTaskStatus.Pending;
      state.stage =
        job?.type === 'MRV'
          ? MvrTaskState.Prepare
          : EnumMeterTaskStage.Collection;
      state.error = '';
    }

    if (event === 'queue') {
      state.status = EnumMeterTaskStatus.Queued;
    }

    if (event === 'finish') {
      state.status = EnumMeterTaskStatus.Success;
      state.error = errMsg;
    }

    return state;
  }
}
