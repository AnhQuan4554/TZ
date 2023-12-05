import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { CarbonController } from './carbon.controller';
import { CarbonService } from './carbon.service';

@Module({
  imports: [PlatformModule],
  controllers: [CarbonController],
  providers: [CarbonService],
  exports: [CarbonService],
})
export class CarbonModule {}
