import { Injectable } from '@nestjs/common';
import type {
  IIsoDate,
  IMeter,
  IMeterData,
  IMeterTask,
} from '@tymlez/platform-api-interfaces';
import { ClientService } from '../platform/client.service';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class ClientSpecificService {
  constructor(
    private clientService: ClientService,
    private platformService: PlatformService,
  ) {}

  async readMeterAt(
    meter: IMeter,
    meterTask: IMeterTask,
    isoDateTime: IIsoDate,
  ): Promise<any> {
    // find job to pass settings to clients
    const job = await this.platformService.getMeterJob(
      meterTask.meterJob as any,
    );
    const res = await this.clientService.collectData({
      meter,
      isoDateTime,
      settings: JSON.parse(job.settings as unknown as any),
    });
    if (res.status === 'error') {
      throw new Error(`Client collectData task error: ${res.message}`);
    }
    return res;
  }

  async transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    meterRawData: any,
  ): Promise<IMeterData[]> {
    const res = await this.clientService.transformData({
      meter,
      isoDateTime,
      meterRawData,
    });

    if (res.status === 'error') {
      throw new Error(`Client transformMeterData task error: ${res.message}`);
    }
    return res;
  }
}
