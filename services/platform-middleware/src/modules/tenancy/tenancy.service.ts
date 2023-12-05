import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import type {
  IMutationResult,
  IFindResult,
  IFindOneResult,
  ITenancy,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import {
  CreateTenancyDto,
  DeleteTenancyDto,
  UpdateTenancyDto,
} from './dto/tenancy.dto';
import { Tenancy } from './entities/tenancy.entity';

@Injectable()
export class TenancyService {
  constructor(
    @InjectRepository(Tenancy)
    private readonly tenancyRepo: EntityRepository<Tenancy>,
    private readonly em: EntityManager,
  ) {}

  async get(id: string): Promise<IFindOneResult<ITenancy>> {
    return await this.tenancyRepo.findOne({ id }, { populate: true });
  }

  public async getAllTenancies(): Promise<IFindResult<ITenancy>> {
    try {
      const [data, count] = await this.tenancyRepo.findAndCount(
        { visible: true },
        {
          orderBy: { name: 'ASC' },
          populate: true,
        },
      );
      return {
        count,
        data: data.map((x) => ({
          name: x.name,
          meterTag: x.meter.key,
          dataTags: x.tags,
        })) as any,
      };
    } catch (err: any) {
      logger.error(err, 'Get all tenancies failed!');
      return { count: 0, data: [] };
    }
  }

  public async getAll(
    pageSize: number,
    page: number,
  ): Promise<IFindResult<ITenancy>> {
    try {
      const [data, count] = await this.tenancyRepo.findAndCount(
        {},
        {
          orderBy: { name: 'ASC' },
          limit: pageSize,
          offset: page * pageSize,
          populate: true,
        },
      );
      return { count, data };
    } catch (err: any) {
      logger.error(err, 'Get all tenancies failed!');
      return { count: 0, data: [] };
    }
  }

  public async add(tenancy: CreateTenancyDto): Promise<IMutationResult> {
    const newTenancy = this.em.create(Tenancy, {
      ...tenancy,
    } as any);

    try {
      await this.em.persistAndFlush(newTenancy);
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

  public async update(
    id: string,
    tenancy: UpdateTenancyDto,
  ): Promise<IMutationResult> {
    if (id !== tenancy.id) {
      return {
        success: false,
        message: 'Tenancy to be updated does not match. Please check!',
      };
    }
    if (tenancy.id === undefined) {
      return {
        success: false,
        message:
          'Cannot update tenancy. Internal server error -  no tenancy id',
      };
    }

    const existingTenancy = await this.get(id);
    if (existingTenancy === null) {
      return {
        success: false,
        message: 'Tenancy does not exist. No tenancy to update',
      };
    }

    wrap(existingTenancy).assign(tenancy);
    try {
      await this.em.persistAndFlush(existingTenancy);
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

  public async delete(
    id: string,
    tenancy: DeleteTenancyDto,
  ): Promise<IMutationResult> {
    if (tenancy.id === undefined) {
      return {
        success: false,
        message:
          'Cannot delete tenancy. Internal server error -  no tenancy id',
      };
    }
    if (id !== tenancy.id) {
      return {
        success: false,
        message: 'Tenancy to be deleted does not match. Please check!',
      };
    }
    const existingTenancy = await this.get(tenancy.id);
    if (existingTenancy === null) {
      return {
        success: false,
        message: 'Tenancy does not exist. No tenancy to delete',
      };
    }
    try {
      await this.em.removeAndFlush(existingTenancy);
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

  public async findOneByMeter(
    meter: string,
  ): Promise<IFindOneResult<ITenancy>> {
    return await this.tenancyRepo.findOne({ meter }, { populate: true });
  }

  async export(): Promise<ITenancy[]> {
    return await this.tenancyRepo.find(
      {},
      {
        orderBy: { name: 'ASC' },
      },
    );
  }

  public async getTenancyByName(name: string): Promise<ITenancy | null> {
    try {
      return await this.tenancyRepo.findOne({
        name,
      });
    } catch (err: any) {
      return null;
    }
  }
}
