import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import type {
  IMutationResult,
  IFindResult,
  IMeterTask,
  IMeterJob,
  IFindOneResult,
  IIsoDate,
  IMeterJobRunSettings,
} from '@tymlez/platform-api-interfaces';
import { getSecondsAgo, getStartOfInterval } from '@tymlez/common-libs';
import { CreateMeterJobDto } from './dto/create-meter-job.dto';
import { UpdateMeterJobDto } from './dto/update-meter-job.dto';
import { MeterJob } from './entities/meter-job.entity';
import { MeterTask } from '../meter-task/entities/meter-task.entity';

enum EnumMeterTaskStatus {
  Running = 'running',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

enum EnumMeterTaskStage {
  Collection = 'collection',
  Transformation = 'transformation',
  Ingestion = 'ingestion',
  MrvPrepare = 'prepare',
  MrvValidation = 'validation',
  MrvSubmission = 'submission',
}

enum JobType {
  Data = 'DATA',
  Mrv = 'MRV',
}
@Injectable()
export class MeterJobService {
  constructor(
    @InjectRepository(MeterJob)
    private meterJobRepo: EntityRepository<MeterJob>,

    private em: EntityManager,
  ) {}

  async create(createMeterJobDto: CreateMeterJobDto): Promise<IMutationResult> {
    const newEntity = this.meterJobRepo.create({
      ...createMeterJobDto,
    });

    try {
      await this.meterJobRepo.persistAndFlush(newEntity);
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

  async findAll(filter = {}, options = {}): Promise<IFindResult<MeterJob>> {
    const data = await this.meterJobRepo.find(filter, options);
    const count = data.length;

    return { count, data };
  }

  async findOne(
    id: string,
    populate = ['meter'],
  ): Promise<IFindOneResult<MeterJob>> {
    return await this.meterJobRepo.findOne(
      { id },
      { populate: populate as any },
    );
  }

  async update(
    id: string,
    updateMeterJobDto: UpdateMeterJobDto,
  ): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Job does not exist. No Job to update',
      };
    }
    wrap(existing).assign(updateMeterJobDto);
    try {
      await this.meterJobRepo.persistAndFlush(existing);
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

  async duplicate(id: string) {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Job does not exist. No Job to update',
      };
    }

    const newDto: CreateMeterJobDto = {
      isPaused: true,
      name: `${existing.name} (copy)`,
      startISODateTime: existing.startISODateTime,
      endISODateTime: existing.endISODateTime,
      type: existing.type,
      meter: existing.meter,
      settings: existing.settings,
      runSettings: existing.runSettings,
      currentTask: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: existing.tags,
    };

    const newEntity = this.meterJobRepo.create(newDto);

    this.em.persistAndFlush(newEntity);

    return {
      success: true,
    };
  }

  async remove(id: string): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Job does not exist. No Job to remove',
      };
    }
    try {
      await this.meterJobRepo.removeAndFlush(existing);
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

  private async getLastTaskForJob(
    jobId: string,
    em: EntityManager,
  ): Promise<IMeterTask | null> {
    return (em.fork() as SqlEntityManager)
      .createQueryBuilder(MeterTask)
      .select('*')
      .where({ meterJob: jobId })
      .orderBy({ isoDateTime: 'DESC' })
      .limit(1)
      .getSingleResult();
  }

  private async countFailedTasksForJob(
    jobId: string,
    em: EntityManager,
  ): Promise<number> {
    const qb = (em.fork() as SqlEntityManager)
      .createQueryBuilder(MeterTask)
      .count('*')
      .where({
        $and: [{ meterJob: jobId }, { status: EnumMeterTaskStatus.Error }],
      });

    return qb.getCount();
  }

  private async countRunningTasksForJob(
    jobId: string,
    em: EntityManager,
  ): Promise<number> {
    const qb = (em.fork() as SqlEntityManager)
      .createQueryBuilder(MeterTask)
      .count('*')
      .where({
        $and: [
          { meterJob: jobId },
          {
            status: {
              $nin: [EnumMeterTaskStatus.Success, EnumMeterTaskStatus.Error],
            },
          },
        ],
      });
    return qb.getCount();
  }

  private async getJobRunReadyness(
    job: MeterJob,
    em: EntityManager,
  ): Promise<{
    ready: boolean;
    nextIsoDateTime?: IIsoDate;
    reason?: string;
  }> {
    // validating job status
    if (!job || job.isPaused) {
      return { ready: false, reason: 'Job is falsy or paused' };
    }

    // validate job run settings
    let runSettings: IMeterJobRunSettings;
    try {
      runSettings = JSON.parse((job.runSettings as any) || '{}');
    } catch (e) {
      return {
        ready: false,
        reason: `Invalid job.runSettings`,
      };
    }

    // validating maxFailedTasksAllowed
    const failedCount = await this.countFailedTasksForJob(job.id, em);
    const maxAllowedFailedTasks = runSettings.maxFailedTasksAllowed || 1;

    if (failedCount >= maxAllowedFailedTasks) {
      return {
        ready: false,
        reason: `Max failed tasks of ${maxAllowedFailedTasks} reached. Check task status.`,
      };
    }

    // validating maxRunningTasksAllowed
    const runningCount = await this.countRunningTasksForJob(job.id, em);
    const maxRunningTasksAllowed = runSettings.maxRunningTasksAllowed || 1;

    if (runningCount >= maxRunningTasksAllowed) {
      return {
        ready: false,
        reason: `Max running tasks of ${maxRunningTasksAllowed} reached`,
      };
    }

    // validating timming
    const currentTask = await this.getLastTaskForJob(job.id, em);
    const nextIsoDateTime = currentTask
      ? getStartOfInterval(currentTask.isoDateTime, job.meter.interval, 1)
      : getStartOfInterval(job.startISODateTime, job.meter.interval);
    const delay = runSettings.runDelayInSeconds || 0;

    if (getSecondsAgo(nextIsoDateTime) < delay) {
      return {
        ready: false,
        reason: `It is not the time for (${nextIsoDateTime}) yet (with ${delay} seconds delay).`,
      };
    }

    if (job.endISODateTime && nextIsoDateTime > job.endISODateTime) {
      return {
        ready: false,
        reason: 'The time interval has reached the endISODateTime of the Job',
      };
    }

    return {
      ready: true,
      nextIsoDateTime,
    };
  }

  private async createTaskForJob(
    job: IMeterJob,
    isoDateTime: IIsoDate,
    em: EntityManager,
  ): Promise<IMeterTask> {
    const now = new Date();
    const initialJobType =
      job.type === JobType.Mrv
        ? EnumMeterTaskStage.MrvPrepare
        : EnumMeterTaskStage.Collection;
    return await em.create(MeterTask, {
      isoDateTime,
      stage: initialJobType,
      status: EnumMeterTaskStatus.Pending,
      meterJob: job,
      meter: job.meter,
      site: job.meter.site,
      retries: 0,
      createdAt: now,
      updatedAt: now,
      tags: [],
    });
  }

  async makeTask(id: string): Promise<IMutationResult<IMeterTask | null>> {
    return this.em.fork().transactional((em: EntityManager) => {
      return this.makeTaskWithEm(id, em);
    });
  }

  private async makeTaskWithEm(
    id: string,
    em: EntityManager,
  ): Promise<IMutationResult<IMeterTask | null>> {
    const job = await em.fork().findOne(MeterJob, { id }, { populate: true });

    if (!job) {
      return {
        success: false,
        message: `No job found with ID: ${id}`,
      };
    }

    const { ready, reason, nextIsoDateTime } = await this.getJobRunReadyness(
      job,
      em,
    );

    if (!ready || !nextIsoDateTime) {
      return { success: false, message: reason };
    }

    try {
      const newTask = await this.createTaskForJob(job, nextIsoDateTime, em);
      job.currentTask = newTask;
      await em.persistAndFlush([job, newTask]);

      return {
        success: true,
        message: `Task created at :${nextIsoDateTime}`,
      };
    } catch (err) {
      return {
        success: false,
        message: `Failed creating new task: ${err}`,
      };
    }
  }

  async export(): Promise<IMeterJob[]> {
    return await this.meterJobRepo.find(
      {},
      {
        orderBy: { name: 'ASC' },
      },
    );
  }

  public async getMeterJobByName(name: string): Promise<IMeterJob | null> {
    try {
      return await this.meterJobRepo.findOne({
        name,
      });
    } catch (err: any) {
      return null;
    }
  }
}
