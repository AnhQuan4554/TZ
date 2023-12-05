import { Injectable, Logger } from '@nestjs/common';
import type {
  IMeterTask,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';

import { withSegment } from '@tymlez/backend-libs';
import { StorageService } from '../storage/storage.service';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private storageService: StorageService,
    private platformService: PlatformService,
  ) {}

  async ingestDataForTask(task: IMeterTask): Promise<IMutationResult> {
    return withSegment('ingestDataForTask', async () => {
      this.logger.debug(`ingestDataForTask: ${task.id}`);
      const { meter, isoDateTime } = task;
      try {
        const data = await this.storageService.getMeterData(
          meter,
          isoDateTime,
          'transformed',
        );

        if (data === null) {
          return {
            success: false,
            message: `Transformed data not found: ${meter.id}@${isoDateTime}`,
          };
        }

        return await this.platformService.ingestMeterData(data);
      } catch (err) {
        return {
          success: false,
          message: `Meter data ingestion failed: ${meter.id}@${isoDateTime} ${err}`,
        };
      }
    });
  }
}
