import {
  logger,
  METRIC_NAMES,
  NewrelicInterceptor,
  reportAPMMetric,
} from '@tymlez/backend-libs'; // Do not reorder this line

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import express from 'express';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { PORT } from './config';
import { NewRelicService } from './newrelic/new-relic.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: false }));
  app.useLogger(app.get(Logger));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' }));

  app.useGlobalInterceptors(new NewrelicInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Tymlez Guardian Service API')
    .setDescription('The service to talk with Guardian')
    .setVersion('1.0')
    .addTag('guardian')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, async () => {
    logger.info(`Listening on port ${PORT}`);
    reportAPMMetric(METRIC_NAMES.APP_GUARDIAN_TYMLEZ_API, 1);

    const newrelic = app.get(NewRelicService);
    await newrelic.provision();
  });
}
bootstrap();
