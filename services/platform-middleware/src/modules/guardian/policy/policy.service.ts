/* eslint-disable no-param-reassign */
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IMutationResult,
  IFindResult,
  IPolicy,
  UUID,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { CreatePolicyDto, UpdatePolicyDto } from '../dto/policy.dto';
import { GuardianPolicy } from '../entities/policy.entity';
import { GuardianService } from '../guardian.service';

@Injectable()
export class GuardianPolicyService {
  constructor(
    @InjectRepository(GuardianPolicy)
    private policyRepo: EntityRepository<GuardianPolicy>,
    private readonly em: EntityManager,
    private guardianService: GuardianService,
  ) {}

  async getAll(): Promise<IFindResult<IPolicy>> {
    const databasePolicies = await this.policyRepo.find({});

    //get from guardian
    let guardianPolicies: any[] = [];
    try {
      guardianPolicies = await this.guardianService.makeGuardianRequest(
        'policies',
        'get',
      );
    } catch (err: any) {
      logger.error(err, err.message);
    }
    const result: IPolicy[] = [];
    guardianPolicies.forEach((x: any) => {
      result.push({
        ...x,
        republishedSchema: true,
        isPublished: x.status === 'PUBLISH',
      });
    });

    //get from database
    databasePolicies.forEach((x) => {
      const existingPolicy = guardianPolicies.find(
        (p: any) => p.name === x.name && p.version === x.version,
      );
      if (!existingPolicy) {
        result.push(x);
      }
    });

    return { count: result.length, data: result };
  }

  async getDetail(id: UUID): Promise<IPolicy | null> {
    return await this.policyRepo.findOne({ id });
  }

  public async add(policy: CreatePolicyDto): Promise<IMutationResult> {
    const existingPolicy = await this.getPolicy(policy.name, policy.version);
    if (existingPolicy) {
      return {
        success: false,
        message:
          'Policy with the same version already exists. Please choose another policy or version!',
      };
    }

    const newPolicy = this.em.create(GuardianPolicy, {
      ...policy,
      isPublished: false,
    } as any);
    try {
      await this.em.persistAndFlush(newPolicy);
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

  public async update(policy: UpdatePolicyDto): Promise<IMutationResult> {
    const existingPolicy = await this.getDetail(policy.id);
    if (existingPolicy === null) {
      return {
        success: false,
        message: 'Policy does not exist. No policy to update',
      };
    }

    const newPolicy = await this.getPolicy(policy.name, policy.version);
    if (newPolicy && newPolicy.id !== policy.id) {
      return {
        success: false,
        message:
          'Policy with the same version already exists. Please choose another policy or version !',
      };
    }
    Object.assign(existingPolicy, policy);
    try {
      await this.em.persistAndFlush(existingPolicy);
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

  public async export(): Promise<IPolicy[]> {
    try {
      const data = await this.policyRepo.find(
        {},
        {
          orderBy: { name: 'ASC' },
        },
      );
      data.map((x) => {
        x.isPublished = false;
        return x;
      });
      return data;
    } catch (err: any) {
      logger.error(err, 'Export guardian policy failed');
      return [];
    }
  }

  async getPolicy(
    policyName: string,
    version: string,
  ): Promise<IPolicy | null> {
    return await this.policyRepo.findOne({ name: policyName, version });
  }

  public async import(
    policy: IPolicy,
    isNew: boolean,
  ): Promise<IMutationResult> {
    try {
      if (isNew) {
        const newPolicy = this.em.create(GuardianPolicy, {
          ...policy,
        } as any);
        await this.em.persistAndFlush(newPolicy);
      } else {
        const existingPolicy = (await this.getPolicy(
          policy.name,
          policy.version,
        )) as IPolicy;

        policy.id = existingPolicy.id;
        Object.assign(existingPolicy, policy);

        await this.em.persistAndFlush(existingPolicy);
      }
    } catch (err: any) {
      logger.error(err, 'Import guardian policy failed!');
      return {
        success: false,
        message: `Import guardian policy ${policy.name} failed!`,
      };
    }
    return { success: true };
  }

  public async publish(id: string): Promise<IMutationResult> {
    const policy = await this.getDetail(id);
    if (policy === null) {
      return {
        success: false,
        message: `No policy to be published`,
      };
    }

    try {
      await this.guardianService.makeGuardianRequest('policy', 'post', {
        ...policy,
        policyName: policy.name,
        tokenMintValue: +policy.tokenMintValue,
      });
    } catch (err: any) {
      logger.error(err, `Publish policy failed! ${err.message}`);
      return {
        success: false,
        message: err.response?.data.message,
      };
    }

    //update isPublished to true
    await this.updatePublishedSuccess(policy);

    return {
      success: true,
      message: `Policy published!`,
    };
  }

  private async updatePublishedSuccess(
    policy: IPolicy,
  ): Promise<IMutationResult> {
    const qb = (this.em as SqlEntityManager)
      .createQueryBuilder(GuardianPolicy)
      .update({ isPublished: true })
      .where({
        id: policy.id,
      });

    try {
      await qb.execute();
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
