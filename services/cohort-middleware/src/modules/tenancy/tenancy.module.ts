import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { TenancyController } from './tenancy.controller';
import { TenancyService } from './tenancy.service';

@Module({
  imports: [PlatformModule],
  controllers: [TenancyController],
  providers: [TenancyService],
})
export class TenancyModule {}
