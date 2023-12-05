import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SettingModule } from '../settings/setting.module';
import { TrustchainController } from './trustchain.controller';
import { TrustchainService } from './trustchain.service';
import { GuardianToken } from './entities/guardian_token.entity';
import { GuardianTopic } from './entities/guardian_topic.entity';
import { TrustchainMRV } from './entities/trustchain_mrv.entity';
import { TrustchainToken } from './entities/trustchain_token.entity';
import { StorageService } from './storage/storage.service';
import { TrustchainCron } from './trustchain.cron';

@Module({
  controllers: [TrustchainController],
  providers: [TrustchainService, StorageService, TrustchainCron],
  exports: [TrustchainService],
  imports: [
    MikroOrmModule.forFeature([
      GuardianToken,
      GuardianTopic,
      TrustchainToken,
      TrustchainMRV,
    ]),
    SettingModule,
  ],
})
export class TrustchainModule {}
