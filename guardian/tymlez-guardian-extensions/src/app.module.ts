import { genReqId } from '@tymlez/backend-libs';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuardianLogsModule } from './guardian-logs/guardian-logs.module';
import { HealthModule } from './health/health.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { config } from './db/mikro-orm.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId,
        level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
      useExisting: true,
    }),
    MikroOrmModule.forRoot(config),
    GuardianLogsModule,
    HealthModule,
    IpfsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
