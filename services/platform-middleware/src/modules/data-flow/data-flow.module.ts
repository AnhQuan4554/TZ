import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { DataFlowService } from './data-flow.service';
import { DataFlowController } from './data-flow.controller';
import { DataFlowMicroservice } from './data-flow.microservice';
import { DataFlow } from './entities/data-flow.entity';
import { Meter } from '../meter/entities/meter.entity';

@Module({
  imports: [MikroOrmModule.forFeature([DataFlow, Meter]), AuthModule],
  controllers: [DataFlowController, DataFlowMicroservice],
  providers: [DataFlowService],
  exports: [DataFlowService],
})
export class DataFlowModule {}
