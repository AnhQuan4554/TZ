import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { VerificationController } from './verification.controller';

@Module({
  imports: [PlatformModule],
  controllers: [VerificationController],
})
export class VerificationModule {}
