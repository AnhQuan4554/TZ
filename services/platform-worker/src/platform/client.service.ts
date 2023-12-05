import { firstValueFrom } from 'rxjs';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { withSegment } from '@tymlez/backend-libs';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
} from '@tymlez/platform-api-interfaces';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(@Inject('CLIENT_SERVICE') private clientProxy: ClientProxy) {}

  private async request<T>(name: string, data: any) {
    return withSegment(name, async () => {
      const res = await this.clientProxy.send<T>(name, data);
      const output = await firstValueFrom(res);
      return output as T;
    });
  }

  async collectData(input: {
    meter: IMeter;
    isoDateTime: IIsoDate;
    settings?: any;
  }): Promise<any> {
    this.logger.debug('Collect data');
    return await this.request('client.collectData', input);
  }

  async transformData(input: {
    meter: IMeter;
    isoDateTime: IIsoDate;
    meterRawData: any;
  }): Promise<IMeterData[] | any> {
    this.logger.debug('Transform data');
    return await this.request('client.transformData', input);
  }
}
