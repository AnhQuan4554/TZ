import { logger, NewrelicInterceptor } from '@tymlez/backend-libs';
import assert from 'assert';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CorrelationIdMiddleware } from '@eropple/nestjs-correlation-id';
import { Logger } from 'nestjs-pino';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

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
    .setTitle('Skafold Middleware')
    .setDescription('Skafold Middleware')
    .setVersion('1.0')
    .addTag('dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 8082;
  const hostname = '0.0.0.0';
  assert(port, `port is missing`);

  logger.info(
    `Staring XXX Middleware at //${hostname}:${port}, VERSION: ${process.env.GIT_TAG}`,
  );
  await app.listen(port, hostname);
}

bootstrap();
