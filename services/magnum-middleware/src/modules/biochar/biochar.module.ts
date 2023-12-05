import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { BiocharController } from './biochar.controller';
import { BiocharService } from './biochar.service';

@Module({
  imports: [PlatformModule],
  controllers: [BiocharController],
  providers: [BiocharService],
  exports: [BiocharService],
})
export class BiocharModule {}
