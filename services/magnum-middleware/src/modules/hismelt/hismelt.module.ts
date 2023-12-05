import { Module } from '@nestjs/common';
import { HismeltService } from './hismelt.service';
import { PlatformModule } from '../platform/platform.module';
import { HismeltController } from './hismelt.controller';
import { CarbonModule } from '../carbon/carbon.module';

@Module({
  imports: [PlatformModule, CarbonModule],
  controllers: [HismeltController],
  providers: [HismeltService],
  exports: [HismeltService],
})
export class HismeltModule {}
