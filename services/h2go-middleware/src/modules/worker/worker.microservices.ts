import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { withTransaction } from '@tymlez/backend-libs';
import type { IIsoDate, IMeter } from '@tymlez/platform-api-interfaces';
import { WorkerService } from './worker.service';
import type { IH2GOData, IH2GoJobSettings } from './worker.types';

@Controller()
export class WorkerMicroservice {
  constructor(private readonly workerService: WorkerService) {}

  @MessagePattern('client.collectData')
  async readMeterAt(input: {
    meter: IMeter;
    isoDateTime: IIsoDate;
    settings: IH2GoJobSettings;
  }) {
    return withTransaction('client.collectData', 'microservice', () =>
      this.workerService.readMeterAt(
        input.meter,
        input.isoDateTime,
        input.settings,
      ),
    );
  }

  @MessagePattern('client.transformData')
  async transformMeterData(input: {
    meter: IMeter;
    isoDateTime: IIsoDate;
    meterRawData: IH2GOData;
  }) {
    return withTransaction('client.transformData', 'microservice', () =>
      this.workerService.transformMeterData(
        input.meter,
        input.isoDateTime,
        input.meterRawData,
      ),
    );
  }
}
