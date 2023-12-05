import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type {
  IFindResult,
  IMutationResult,
  ISetting,
} from '@tymlez/platform-api-interfaces';
import { logger } from '@tymlez/backend-libs';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { EnumPolicyTags, SettingKeys } from '@tymlez/common-libs';
import { CreateSettingDto, UpdateSettingDto } from './dto/setting.dto';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private settingRepo: EntityRepository<Setting>,
    private readonly em: EntityManager,
  ) {}

  async findByNames(names: string[]): Promise<any> {
    const data = await Promise.all(
      names.map(async (name) => {
        return await this.settingRepo.findOne({ name }, { populate: true });
      }),
    );

    return data;
  }

  async getByGroup(group: string): Promise<{ [x: string]: any }> {
    const data = await this.settingRepo.find({ group });

    return data.reduce(
      (acc, item) => ({ ...acc, [item.name]: item.jsonValue || item.value }),
      {},
    );
  }

  async getAllSettings(
    pageSize: number,
    page: number,
    filter: string,
  ): Promise<IFindResult<ISetting>> {
    try {
      if (filter) {
        const qb = (this.em as SqlEntityManager)
          .createQueryBuilder(Setting)
          .select('*')
          .where(
            `LOWER(name) like LOWER('%${filter}%') OR setting_group ='${filter}'`,
          )
          .orderBy({ group: 'ASC', name: 'ASC' })
          .limit(pageSize)
          .offset(page * pageSize);
        const result = await qb.execute('all');
        return { count: result.length, data: result };
      }

      const [settings, count] = await this.settingRepo.findAndCount(
        {},
        {
          orderBy: { group: 'ASC', name: 'ASC' },
          limit: pageSize,
          offset: page * pageSize,
        },
      );
      return { count, data: settings };
    } catch (err: any) {
      logger.error(err, 'Get all settings failed!');
      return { count: 0, data: [] };
    }
  }

  async getDetailById(id: string): Promise<ISetting | null> {
    return await this.settingRepo.findOne({ id });
  }

  async getDetailByName(name: string): Promise<ISetting | null> {
    return await this.settingRepo.findOne({ name });
  }

  public async add(setting: CreateSettingDto): Promise<IMutationResult> {
    const existingSetting = await this.getDetail(setting.name, setting.group);
    if (existingSetting !== null) {
      return {
        success: false,
        message: 'Setting with the same name and group already exists',
      };
    }
    const newSetting = this.em.create(Setting, {
      ...setting,
      group: setting.group === '-' ? null : setting.group,
    } as any);
    try {
      await this.em.persistAndFlush(newSetting);
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

  public async update(setting: UpdateSettingDto): Promise<IMutationResult> {
    const existingSetting = await this.getDetailById(setting.id);
    if (existingSetting === null) {
      return {
        success: false,
        message: 'Setting does not exist. No Setting to update',
      };
    }
    const dbSetting = await this.getDetail(setting.name, setting.group);
    if (dbSetting !== null && dbSetting.id !== setting.id) {
      return {
        success: false,
        message: 'Setting with the same name and group already exists',
      };
    }
    Object.assign(existingSetting, setting);
    try {
      if (setting.group === '-') {
        existingSetting.group = undefined;
      }
      await this.em.persistAndFlush(existingSetting);
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

  public async getGuardianTenancyName(): Promise<string> {
    return (
      (await this.getDetailByName(SettingKeys.GUARDIAN_TENANCY_NAME))?.value ||
      `${process.env.CLIENT_NAME}`
    );
  }

  private async getDetail(
    name: string,
    group: string,
  ): Promise<ISetting | null> {
    return await this.settingRepo.findOne({
      name,
      group,
    });
  }

  public async seedData(seeders: string[][]): Promise<string[][]> {
    try {
      for await (const [
        name,
        value,
        description,
        group,
        jsonValue,
        readOnly = 'false',
      ] of seeders) {
        const existing = await this.em.findOne(Setting, {
          name,
          group,
        });
        if (!existing) {
          logger.info("Inserting setting '%s'", name);

          await this.em.persistAndFlush(
            this.em.create(Setting, {
              name,
              value,
              description,
              type: 'string',
              group: group || 'System',
              jsonValue,
              readOnly: readOnly === 'true',
            }),
          );
          logger.info("Inserted settings '%s'", name);
        } else {
          if (!existing.value && value) {
            existing.value = value;
            await this.em.flush();
          }

          if (!existing.jsonValue && jsonValue) {
            existing.jsonValue = jsonValue;
            await this.em.flush();
          }

          logger.info(
            `Skip insert settings (${name}/${group}) as it already exists`,
          );
        }
      }
      return seeders;
    } catch (err) {
      return [];
    }
  }

  public async getTokenMintValue(): Promise<number> {
    const value = (await this.getDetailByName(SettingKeys.TOKEN_MINT_VALUE))
      ?.value;
    return value ? Number(value) : 1;
  }

  public async getEnablePolicyTags(): Promise<EnumPolicyTags[]> {
    const value = (await this.getDetailByName(SettingKeys.ENABLED_POLICY_TAGS))
      ?.value;
    const tags = value ? value.split(',') : [];

    return tags as EnumPolicyTags[];
  }
}
