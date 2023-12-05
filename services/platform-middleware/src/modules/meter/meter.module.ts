import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Meter } from './entities/meter.entity';
import { MeterController } from './meter.controller';
import { MeterService } from './meter.service';
import { MeterMicroservice } from './meter.microservice';
import { Device } from '../guardian/entities/device.entity';
import { Site } from '../dashboard-site/entities/site.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Meter, Device, Site]), AuthModule],
  controllers: [MeterController, MeterMicroservice],
  providers: [MeterService],
  exports: [MeterService],
})
export class MeterModule {}
