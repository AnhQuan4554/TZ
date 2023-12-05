import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Setting } from './entities/setting.entity';
import { SettingController } from './setting.controller';
import { SettingMicroservice } from './setting.microservice';
import { SettingService } from './setting.service';

@Module({
  imports: [MikroOrmModule.forFeature([Setting]), AuthModule],
  controllers: [SettingController, SettingMicroservice],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
