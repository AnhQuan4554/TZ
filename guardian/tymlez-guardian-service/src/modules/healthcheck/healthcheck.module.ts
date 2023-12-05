import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { TymlezUser, TymlezUserSchema } from '../../schemas/user.schema';
import { HealthController } from './healthcheck.controller';
import { CustomHealthcheckService } from './healthcheck.services';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        {
          name: TymlezUser.name,
          schema: TymlezUserSchema,
        },
      ],
      'tymlez',
    ),
  ],
  controllers: [HealthController],
  providers: [CustomHealthcheckService],
})
export class HealthcheckModule {}
