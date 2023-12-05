import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { genReqId } from '@tymlez/backend-libs';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './db/mikro-orm.config';
import { SettingModule } from './modules/settings/setting.module';
import { MeterJobModule } from './modules/meter-job/meter-job.module';
import { DataFlowModule } from './modules/data-flow/data-flow.module';
import { DataTaskModule } from './modules/data-task/data-task.module';
import { FileModule } from './modules/file/file.module';
import { GuardianModule } from './modules/guardian/guardian.module';
import { MeterDataModule } from './modules/meter-data/meter-data.module';
import { MeterTaskModule } from './modules/meter-task/meter-task.module';
import { MeterModule } from './modules/meter/meter.module';
import { ImportExportModule } from './modules/import-export/import-export.module';
import { SiteModule } from './modules/dashboard-site/site.module';
import { VerificationModule } from './modules/verification/verification.module';
import { MrvModule } from './modules/mrv/mrv.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { BullManagementModule } from './modules/bull-management/bull-management.module';
import { DovuModule } from './modules/dovu/dovu.module';
import { TrustchainModule } from './modules/trustchain/trustchain.module';
import { NewRelicModule } from './modules/newrelic/new-relic.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId,
        level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(ormConfig),
    AuthModule,
    MeterModule,
    SettingModule,
    MeterJobModule,
    DataFlowModule,
    DataTaskModule,
    FileModule,
    GuardianModule,
    MeterTaskModule,
    MeterDataModule,
    ImportExportModule,
    SiteModule,
    VerificationModule,
    MrvModule,
    TenancyModule,
    BullManagementModule,
    DovuModule,
    TrustchainModule,
    NewRelicModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
