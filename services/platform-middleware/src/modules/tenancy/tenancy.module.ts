import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TenancyService } from './tenancy.service';
import { TenancyController } from './tenancy.controller';
import { TenancyMicroservice } from './tenancy.microservice';
import { Tenancy } from './entities/tenancy.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Tenancy])],
  providers: [TenancyService],
  controllers: [TenancyController, TenancyMicroservice],
  exports: [TenancyService],
})
export class TenancyModule {}
