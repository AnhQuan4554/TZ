import { CacheModule, Module } from '@nestjs/common';
import { PlatformModule } from '../platform/platform.module';
import { VerificationController } from './verification.controller';

@Module({
  imports: [
    PlatformModule,
    CacheModule.register({
      ttl: 1800, //30 minutes
    }),
  ],
  controllers: [VerificationController],
  providers: [],
  exports: [],
})
export class VerificationModule {}
