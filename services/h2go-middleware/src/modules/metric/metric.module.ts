import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';

@Module({
  imports: [PlatformModule],
  controllers: [MetricController],
  providers: [MetricService],
  exports: [MetricService],
})
export class MetricModule {}
