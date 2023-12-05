import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { SiteController } from './site.controller';

@Module({
  imports: [PlatformModule],
  controllers: [SiteController],
})
export class SiteModule {}
