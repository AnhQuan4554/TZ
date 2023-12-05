import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MeterDataService } from './meter-data.service';
import { MeterDataMicroservice } from './meter-data.microservice';
import { MeterData } from './entities/meter-data.entity';
import { Meter } from '../meter/entities/meter.entity';
import { MeterDataController } from './meter-data.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MeterData, Meter])],
  controllers: [MeterDataMicroservice, MeterDataController],
  providers: [MeterDataService],
  exports: [MeterDataService],
})
export class MeterDataModule {}
