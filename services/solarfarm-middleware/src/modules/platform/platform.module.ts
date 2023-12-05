import { Module } from '@nestjs/common';
import { PlatformNewRelic } from './platform-newrelic';
import { PlatformSeeder } from './platform-seeders';
import { PlatformProvider } from './platform.provider';
import { PlatformService } from './platform.service';

@Module({
  providers: [
    PlatformProvider,
    PlatformService,
    PlatformSeeder,
    PlatformNewRelic,
  ],
  exports: [
    PlatformProvider,
    PlatformService,
    PlatformSeeder,
    PlatformNewRelic,
  ],
})
export class PlatformModule {}
