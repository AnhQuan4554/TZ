/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import {
  logger,
  METRIC_NAMES,
  NewrelicInterceptor,
  reportAPMMetric,
} from '@tymlez/backend-libs';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/');
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new NewrelicInterceptor());

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const hostname = '0.0.0.0';

  logger.info(
    `Staring Platform worker at //${hostname}:${port}, VERSION: ${process.env.GIT_TAG}`,
  );
  reportAPMMetric(METRIC_NAMES.APP_PLATFORM_WORKER, 1);
  await app.listen(port, hostname, () => {
    logger.info(
      `Started Platform worker at //${hostname}:${port}, VERSION: ${process.env.GIT_TAG}`,
    );
  });
}

bootstrap();
