import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  IDovu,
  IFindResult,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { sum } from 'lodash';
import { Dovu } from './entities/dovu.entity';
import { CreateDovuDto } from './dto/dovu.dto';

@Injectable()
export class DovuService {
  constructor(
    @InjectRepository(Dovu)
    private readonly dovuRepo: EntityRepository<Dovu>,
    private readonly em: EntityManager,
  ) {}

  public async getAll(): Promise<IFindResult<IDovu>> {
    try {
      const [meters, count] = await this.dovuRepo.findAndCount(
        {},
        {
          orderBy: { createdAt: 'DESC' },
          populate: true,
        },
      );
      return { count, data: meters };
    } catch (err: any) {
      logger.error(err, 'Get all dovu transactions failed!');
      return { count: 0, data: [] };
    }
  }

  public async add(dovu: CreateDovuDto): Promise<IMutationResult> {
    const newDovu = this.em.create(Dovu, {
      ...dovu,
      createdAt: new Date(),
      stateProof: `https://testnet.mirrornode.hedera.com/api/v1/transactions/0.0.1156-1663839551-50378818/stateproof`,
    } as any);

    try {
      await this.em.persistAndFlush(newDovu);
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

  public async getCarbonOffsetPurchased(): Promise<number> {
    const data = await this.getAll();
    const carbons = data.data.map((item) => item.retiredKgs);
    return sum(carbons);
  }
}
