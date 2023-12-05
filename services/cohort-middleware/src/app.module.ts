import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { genReqId } from '@tymlez/backend-libs';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { SiteModule } from './modules/site/site.module';
import { ConsumptionModule } from './modules/consumption/consumption.module';
import { CarbonModule } from './modules/carbon/carbon.module';
import { VerificationModule } from './modules/verification/verification.module';
import { GenerationModule } from './modules/generation/generation.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';

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
    SiteModule,
    ConsumptionModule,
    CarbonModule,
    VerificationModule,
    GenerationModule,
    TenancyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
