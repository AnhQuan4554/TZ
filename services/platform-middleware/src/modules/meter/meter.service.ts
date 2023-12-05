import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IMutationResult,
  IMeter,
  IFindResult,
  IFindOneResult,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { AuthService } from '../auth/auth.service';
import { Meter } from './entities/meter.entity';
import {
  CreateMeterDto,
  DeleteMeterDto,
  UpdateMeterDto,
} from './dto/meter.dto';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(Meter)
    private readonly meterRepository: EntityRepository<Meter>,
    private readonly em: EntityManager,
    private authService: AuthService,
  ) {}

  public async getMeterByName(meterName: string): Promise<IMeter | null> {
    return await this.meterRepository.findOne(
      { name: meterName },
      { populate: true },
    );
  }

  public async getMeterById(id: string): Promise<IMeter | null> {
    return await this.meterRepository.findOne({ id }, { populate: true });
  }

  public async getAllMeters(
    pageSize: number,
    page: number,
  ): Promise<IFindResult<IMeter>> {
    try {
      const [meters, count] = await this.meterRepository.findAndCount(
        {},
        {
          orderBy: { id: 'ASC' },
          limit: pageSize,
          offset: page * pageSize,
          populate: true,
        },
      );
      return { count, data: meters };
    } catch (err: any) {
      logger.error(err, 'Get all meters failed!');
      return { count: 0, data: [] };
    }
  }

  public async addMeter(meter: CreateMeterDto): Promise<IMutationResult> {
    const client = await this.authService.getClients();

    const newMeter = this.em.create(Meter, {
      ...meter,
      client,
      device: meter.device === '-' ? null : meter.device,
      createdAt: new Date(),
    } as any);

    try {
      await this.em.persistAndFlush(newMeter);
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

  public async updateMeter(meter: UpdateMeterDto): Promise<IMutationResult> {
    if (meter.id === undefined) {
      return {
        success: false,
        message: 'Cannot update meter. Internal server error -  no meter id',
      };
    }

    const existingMeter = await this.getMeterById(meter.id);
    if (existingMeter === null) {
      return {
        success: false,
        message: 'Meter does not exist. No meter to update',
      };
    }

    if (existingMeter.name !== meter.name) {
      const existingMetername = await this.getMeterByName(meter.name);
      if (existingMetername !== null) {
        return {
          success: false,
          message:
            'Meter name already exists. Please input another meter name!',
        };
      }
    }

    Object.assign(existingMeter, meter);
    try {
      if (meter.device === '-') {
        existingMeter.device = undefined;
      }
      await this.em.persistAndFlush(existingMeter);
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

  public async deleteMeter(meter: DeleteMeterDto): Promise<IMutationResult> {
    const existingMeter = await this.getMeterById(meter.meterId);
    if (existingMeter === null) {
      return {
        success: false,
        message: 'Meter does not exist. No meter to delete',
      };
    }
    try {
      await this.em.removeAndFlush(existingMeter);
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

  public async updateMeterByName(meter: IMeter): Promise<IMutationResult> {
    const existingMeter = (await this.getMeterByName(meter.name)) as IMeter;

    Object.assign(existingMeter, meter);
    try {
      await this.em.persistAndFlush(existingMeter);
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

  public async export(): Promise<IMeter[]> {
    try {
      return await this.meterRepository.find(
        {},
        {
          orderBy: { name: 'ASC' },
        },
      );
    } catch (err: any) {
      logger.error(err, 'Export meters failed!');
      return [];
    }
  }

  public async findOneByKey(key: string): Promise<IFindOneResult<IMeter>> {
    return await this.meterRepository.findOne({ key }, { populate: true });
  }

  public async deleteMetersBySite(id: string): Promise<IMutationResult> {
    const meters = await this.getMetersBySite(id);
    return await this.deleteMeters(meters);
  }

  public async getMetersBySite(id: string): Promise<IMeter[]> {
    try {
      return await this.meterRepository.find({
        site: id,
      });
    } catch (err: any) {
      return [];
    }
  }

  public async getMetersByDevice(id: string): Promise<IMeter[]> {
    try {
      return await this.meterRepository.find({
        device: id,
      });
    } catch (err: any) {
      return [];
    }
  }

  public async deleteMeters(meters: IMeter[]): Promise<IMutationResult> {
    if (meters.length > 0) {
      try {
        await Promise.all(
          meters.map(async (meter) => {
            this.em.removeAndFlush(meter);
          }),
        );
      } catch (err: any) {
        return {
          success: false,
          message: err.message,
        };
      }
    }
    return {
      success: true,
    };
  }
}
