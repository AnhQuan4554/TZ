import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BootstrapService } from './bootstrap.service';
import { BootstrapController } from './bootstrap.controller';
import { TymlezUser, TymlezUserSchema } from '../../schemas/user.schema';
import {
  DeviceConfig,
  DeviceConfigSchema,
} from '../../schemas/device-config.schema';

@Module({
  controllers: [BootstrapController],
  providers: [BootstrapService],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TymlezUser.name,
          schema: TymlezUserSchema,
        },

        {
          name: DeviceConfig.name,
          schema: DeviceConfigSchema,
        },
      ],
      'tymlez',
    ),
  ],
})
export class BootstrapModule {}
