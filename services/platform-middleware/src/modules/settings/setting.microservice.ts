import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import type { IFindResult, ISetting } from '@tymlez/platform-api-interfaces';
import { SettingService } from './setting.service';

@Controller()
export class SettingMicroservice {
  constructor(
    private readonly settingService: SettingService,
    public readonly orm: MikroORM,
  ) {}

  @MessagePattern('setting.getSettingByNames')
  @UseRequestContext()
  async findByName({
    names,
  }: {
    names: string[];
  }): Promise<IFindResult<ISetting>> {
    return withTransaction('setting.getSettingByNames', 'microservice', () =>
      this.settingService.findByNames(names),
    );
  }

  @MessagePattern('settings.seedSettings')
  @UseRequestContext()
  async seedSettings({ seeders }: { seeders: string[][] }) {
    return withTransaction('settings.seedSettings', 'microservice', () =>
      this.settingService.seedData(seeders),
    );
  }
}
