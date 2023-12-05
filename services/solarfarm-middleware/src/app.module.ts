import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { genReqId } from '@tymlez/backend-libs';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PlatformModule } from './modules/platform/platform.module';
import { SiteModule } from './modules/site/site.module';
import { WorkerModule } from './modules/worker/worker.module';
import { MetricModule } from './modules/metric/metric.module';
import { EnergyModule } from './modules/energy/energy.module';
import { VerificationModule } from './modules/verification/verification.module';

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
    AuthModule,
    PlatformModule,
    SiteModule,
    WorkerModule,
    MetricModule,
    EnergyModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
