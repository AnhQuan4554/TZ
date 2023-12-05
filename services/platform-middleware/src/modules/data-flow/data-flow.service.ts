// import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
// import { EntityRepository, EntityManager, wrap } from '@mikro-orm/core';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import type {
  IMutationResult,
  IFindResult,
  IFindOneResult,
} from '@tymlez/platform-api-interfaces';
import { CreateDataFlowDto } from './dto/create-data-flow.dto';
import { UpdateDataFlowDto } from './dto/update-data-flow.dto';
import { DataFlow } from './entities/data-flow.entity';

@Injectable()
export class DataFlowService {
  constructor(
    @InjectRepository(DataFlow)
    private dataFlowRepo: EntityRepository<DataFlow>, // private em: EntityManager, // private configService: ConfigService,
  ) {}

  async create(createDataFlowDto: CreateDataFlowDto): Promise<IMutationResult> {
    const newEntity = this.dataFlowRepo.create({
      ...createDataFlowDto,
    });

    try {
      await this.dataFlowRepo.persistAndFlush(newEntity);
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

  async findAll(filter = {}, options = {}): Promise<IFindResult<DataFlow>> {
    const data = await this.dataFlowRepo.find(filter, options);
    const count = data.length;

    return { count, data };
  }

  async findOne(
    id: string,
    populate = ['meter'],
  ): Promise<IFindOneResult<DataFlow>> {
    return await this.dataFlowRepo.findOne(
      { id },
      { populate: populate as any },
    );
  }

  async update(
    id: string,
    updateDataFlowDto: UpdateDataFlowDto,
  ): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Data flow does not exist. No Data flow to update',
      };
    }
    wrap(existing).assign(updateDataFlowDto);

    try {
      await this.dataFlowRepo.persistAndFlush(existing);
    } catch (err: any) {
      console.error(err);
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: true,
    };
  }

  // async duplicate(id: string) {
  //   const existing = await this.findOne(id);
  //   if (existing === null) {
  //     return {
  //       success: false,
  //       message: 'Data flow does not exist. No Data flow to update',
  //     };
  //   }

  //   const newDto: CreateDataFlowDto = {
  //     isPaused: true,
  //     name: `${existing.name} (copy)`,
  //     startISODateTime: existing.startISODateTime,
  //     endISODateTime: existing.endISODateTime,
  //     runISODateTime: undefined,
  //     tags: [],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };

  //   const newEntity = this.dataFlowRepo.create(newDto);

  //   this.em.persistAndFlush(newEntity);

  //   return {
  //     success: true,
  //   };
  // }

  async remove(id: string): Promise<IMutationResult> {
    const existing = await this.findOne(id);
    if (existing === null) {
      return {
        success: false,
        message: 'Data flow does not exist. No Data flow to remove',
      };
    }
    try {
      await this.dataFlowRepo.removeAndFlush(existing);
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
