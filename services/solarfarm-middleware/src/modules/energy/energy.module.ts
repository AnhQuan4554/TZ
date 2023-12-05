import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';

@Module({
  imports: [PlatformModule],
  controllers: [EnergyController],
  providers: [EnergyService],
  exports: [EnergyService],
})
export class EnergyModule {}
