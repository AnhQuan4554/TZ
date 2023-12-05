import { logger, NewrelicInterceptor } from '@tymlez/backend-libs';
import assert from 'assert';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CorrelationIdMiddleware } from '@eropple/nestjs-correlation-id';
import { Logger } from 'nestjs-pino';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { PlatformSeeder } from './modules/platform/platform-seeders';
import { PlatformNewRelic } from './modules/platform/platform-newrelic';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('client-api');
  app.enableCors();
  app.use(CorrelationIdMiddleware());
  app.useLogger(app.get(Logger));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' }));
  app.useGlobalInterceptors(new NewrelicInterceptor());
  const config = new DocumentBuilder()
    .setTitle('SolarFarm Middleware')
    .setDescription('SolarFarm Middleware')
    .setVersion('1.0')
    .addTag('SolarFarm')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      name: 'client-middleware',
      timeout: 60000,
      queue: 'client-api',
      servers: configService.get<string>('MQ_ADDRESS') || 'localhost',
    },
  });

  const port = configService.get<number>('PORT') || 8082;
  const hostname = '0.0.0.0';
  assert(port, `port is missing`);

  await app.listen(port, hostname, async () => {
    await app.startAllMicroservices();
    const platformSeeder = app.get(PlatformSeeder);
    platformSeeder.seedSettings();

    const platformNewrelic = app.get(PlatformNewRelic);
    await platformNewrelic.createSyntheticMonitorRealtime();
    await platformNewrelic.createSyntheticMonitorAnalytics();

    logger.info(
      `Started SolarFarm Middleware at //${hostname}:${port}, VERSION: ${process.env.GIT_TAG}`,
    );
  });
}

bootstrap();
