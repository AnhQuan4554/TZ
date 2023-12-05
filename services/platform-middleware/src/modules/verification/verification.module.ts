import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth/auth.module';
import { GuardianModule } from '../guardian/guardian.module';
import { SettingModule } from '../settings/setting.module';
import { GuardianVpDocument } from './entities/guardian-vp.entity';
import { VerificationCron } from './verification.cron';
import { VerificationMicroservice } from './verification.microservices';
import { VerificationService } from './verification.service';
import { TrustchainModule } from '../trustchain/trustchain.module';

@Module({
  imports: [
    AuthModule,
    GuardianModule,
    SettingModule,
    ScheduleModule.forRoot(),
    MikroOrmModule.forFeature([GuardianVpDocument]),
    TrustchainModule
  ],
  controllers: [VerificationMicroservice],
  providers: [VerificationService, VerificationCron],
  exports: [VerificationService],
})
export class VerificationModule {}
