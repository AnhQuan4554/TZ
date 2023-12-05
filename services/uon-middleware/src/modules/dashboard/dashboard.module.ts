import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { PlatformModule } from '../platform/platform.module';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [PlatformModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
