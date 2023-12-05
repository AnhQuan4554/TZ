import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  Transport,
  NatsOptions,
} from '@nestjs/microservices';

export const PlatformProvider = {
  provide: 'PLATFORM_SERVICE',
  useFactory: (configService: ConfigService) => {
    const options: NatsOptions = {
      transport: Transport.NATS,
      options: {
        name: 'client-middleware',
        timeout: 300000,
        servers: [configService.get<string>('MQ_ADDRESS') || 'localhost'],
      },
    };
    return ClientProxyFactory.create(options);
  },
  inject: [ConfigService],
};
