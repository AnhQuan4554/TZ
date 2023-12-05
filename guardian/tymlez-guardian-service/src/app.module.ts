import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GuardianClientApi } from '@tymlez/guardian-api-client';
import { LoggerModule } from 'nestjs-pino';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  MONGO_DB_CONNECTION,
  GUARDIAN_API_GW_URL,
  GUARDIAN_MONGO_DB_CONNECTION,
} from './config';
import { AuthModule } from './modules/auth/auth.module';
import { IpfsModule } from './modules/ipfs/ipfs.module';
import { AuditModule } from './modules/audit/audit.module';
import { PolicyModule } from './modules/policy/policy.module';
import { TrackAndTraceModule } from './modules/track-and-trace/track-and-trace.module';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { NewRelicModule } from './newrelic/new-relic.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'api-key' }),
    MongooseModule.forRoot(MONGO_DB_CONNECTION, { connectionName: 'tymlez' }),
    MongooseModule.forRoot(GUARDIAN_MONGO_DB_CONNECTION, {
      connectionName: 'guardian',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AuthModule,
    IpfsModule,
    AuditModule,
    PolicyModule,
    TrackAndTraceModule,
    BootstrapModule,
    HealthcheckModule,
    NewRelicModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'GuardianClientApi',
      useValue: new GuardianClientApi(GUARDIAN_API_GW_URL),
    },
  ],
  exports: ['GuardianClientApi'],
})
export class AppModule {}
