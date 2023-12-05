import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';

import { TymlezUser, TymlezUserSchema } from '../../schemas/user.schema';

@Module({
  controllers: [PolicyController],
  providers: [PolicyService],
  imports: [
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
})
export class PolicyModule {}
