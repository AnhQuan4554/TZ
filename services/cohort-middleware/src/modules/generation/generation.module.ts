import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';

@Module({
  imports: [PlatformModule],
  controllers: [GenerationController],
  providers: [GenerationService],
})
export class GenerationModule {}
