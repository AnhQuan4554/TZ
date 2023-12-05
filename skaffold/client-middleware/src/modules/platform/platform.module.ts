import { Module } from '@nestjs/common';
import { PlatformProvider } from './platform.provider';
import { PlatformService } from './platform.service';

@Module({
  providers: [PlatformProvider, PlatformService],
  exports: [PlatformProvider, PlatformService],
})
export class PlatformModule {}
