import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { genReqId } from '@tymlez/backend-libs';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PlatformModule } from './modules/platform/platform.module';
import { VerificationModule } from './modules/verification/verification.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SiteModule } from './modules/site/site.module';

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
    DashboardModule,
    VerificationModule,
    SiteModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
