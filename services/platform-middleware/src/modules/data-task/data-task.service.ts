// import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
// import { EntityRepository, EntityManager, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import type {
  IMutationResult,
  IFindResult,
  IFindOneResult,
} from '@tymlez/platform-api-interfaces';
import { CreateDataTaskDto } from './dto/create-data-task.dto';
import { UpdateDataTaskDto } from './dto/update-data-task.dto';
import { DataTask } from './entities/data-task.entity';

@Injectable()
export class DataTaskService {
  constructor(
    @InjectRepository(DataTask)
    private dataTaskRepo: EntityRepository<DataTask>, // private em: EntityManager, // private configService: ConfigService,
  ) {}

  async create(createDataTaskDto: CreateDataTaskDto): Promise<IMutationResult> {
    const newEntity = this.dataTaskRepo.create({
      ...createDataTaskDto,
    });

    try {
      await this.dataTaskRepo.persistAndFlush(newEntity);
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

  async findAll(filter = {}, options = {}): Promise<IFindResult<DataTask>> {
    const data = await this.dataTaskRepo.find(filter, options);
    const count = data.length;

    return { count, data };
  }

  async findOne(id: string, populate = []): Promise<IFindOneResult<DataTask>> {
    return await this.dataTaskRepo.findOne(
      { id },
      { populate: populate as any },
    );
  }

  async update(
    id: string,
    updateDataTaskDto: UpdateDataTaskDto,
  ): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Data task does not exist. No Data task to update',
      };
    }
    wrap(existing).assign(updateDataTaskDto);
    try {
      await this.dataTaskRepo.persistAndFlush(existing);
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

  async remove(id: string): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Data task does not exist. No Data task to remove',
      };
    }
    try {
      await this.dataTaskRepo.removeAndFlush(existing);
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
}
