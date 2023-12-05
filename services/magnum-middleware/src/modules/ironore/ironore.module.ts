import { Module } from '@nestjs/common';
import { IronoreService } from './ironore.service';
import { PlatformModule } from '../platform/platform.module';
import { IronoreController } from './ironore.controller';

@Module({
  imports: [PlatformModule],
  controllers: [IronoreController],
  providers: [IronoreService],
  exports: [IronoreService],
})
export class IronoreModule {}
