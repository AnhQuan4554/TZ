import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { HMacModule } from 'nestjs-hmac256-guard';
import { SettingModule } from '../settings/setting.module';
import { DovuController } from './dovu.controller';
import { DovuService } from './dovu.service';
import { Dovu } from './entities/dovu.entity';
import { DovuWebHookController } from './webhook.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([Dovu]),
    SettingModule,
    HMacModule.register({
      HMAC_HASH_SECRET: process.env.HMAC_HASH_SECRET,
      logger: { info: console.log },
    }),
  ],
  controllers: [DovuController, DovuWebHookController],
  providers: [DovuService],
})
export class DovuModule {}
