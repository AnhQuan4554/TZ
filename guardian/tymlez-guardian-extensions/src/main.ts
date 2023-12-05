import { METRIC_NAMES, reportAPMMetric } from '@tymlez/backend-libs';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { GuardianMQSerializer, GuardianMQDeserializer } from './common';

async function bootstrap() {
  const natServer = process.env.MQ_ADDRESS || 'nats://localhost:4222';
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [natServer],
      serializer: new GuardianMQSerializer(),
      deserializer: new GuardianMQDeserializer(),
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000, () => {
    console.log('Tymlez guardian  extensions started ');
    reportAPMMetric(METRIC_NAMES.APP_GUARDIAN_EXTENSION, 1);
  });
}

bootstrap();
