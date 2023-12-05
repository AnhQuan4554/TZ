import {
  NewrelicInterceptor,
  logger,
  reportAPMMetric,
} from '@tymlez/backend-libs';
import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CorrelationIdMiddleware } from '@eropple/nestjs-correlation-id';
import { Logger } from 'nestjs-pino';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { migrateDb, runSeeds } from './db';
import { NewRelicService } from './modules/newrelic/new-relic.service';
import { bootstrapFirebase } from './firebase';

async function bootstrap() {
  bootstrapFirebase();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(CorrelationIdMiddleware());
  app.useLogger(app.get(Logger));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new NewrelicInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Platform API Middleware')
    .setDescription('Platform Middleware')
    .setVersion('1.0')
    .addTag('platform')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  await migrateDb();
  await runSeeds();
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      name: 'platform-middleware',
      timeout: 60000,
      queue: 'tymlez-platform-api',
      servers: configService.get<string>('MQ_ADDRESS') || 'localhost',
    },
  });

  app.useWebSocketAdapter(new WsAdapter(app));
  const port = configService.get<number>('PORT') || 8080;
  const hostname = '0.0.0.0';

  await app.listen(port, hostname, async () => {
    reportAPMMetric('platform-middleware.started', 1);
    await app.startAllMicroservices();

    const newrelic = app.get(NewRelicService);
    await newrelic.provision();
    logger.info(
      `Started Platform Middleware at //${hostname}:${port}, VERSION: ${process.env.GIT_TAG}`,
    );
  });
}

bootstrap();
