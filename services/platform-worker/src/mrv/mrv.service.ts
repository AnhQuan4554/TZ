import { Injectable, Logger } from '@nestjs/common';
import type {
  IMeterTask,
  IMutationResult,
  IMrvStateResponse,
} from '@tymlez/platform-api-interfaces';

import { withSegment } from '@tymlez/backend-libs';
import { waitFor } from '@tymlez/common-libs';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class MrvService {
  private readonly logger = new Logger(MrvService.name);

  constructor(private platformService: PlatformService) {}

  async submitMrv(
    task: IMeterTask,
  ): Promise<IMutationResult<IMrvStateResponse>> {
    const { meter, isoDateTime, id } = task;
    try {
      // Add some random sleep time to spread request to guardian instead of peak at round interval
      const taskDate = new Date(isoDateTime);
      const now = new Date();

      const diff = (now.getTime() - taskDate.getTime()) / 1000;
      if (diff < meter.interval) {
        const randSleepTimeMs = Math.floor(
          Math.random() * Math.floor(diff) * 1000,
        );
        await waitFor(randSleepTimeMs);
      }

      const result = await this.platformService.submitMrv({
        taskId: id,
        isoDateTime,
        meterKey: meter.key,
      });
      if (result.success) {
        return result;
      }

      return {
        success: false,
        message: `MRV submission error: ${result.message}`,
      };
    } catch (err) {
      return {
        success: false,
        message: `MRV submission failed: ${meter.id}@${isoDateTime} ${err}`,
      };
    }
  }

  async validateMrv(
    task: IMeterTask,
  ): Promise<IMutationResult<IMrvStateResponse>> {
    const { meter, isoDateTime, id } = task;
    try {
      const result = await this.platformService.validateMrv({
        taskId: id,
        isoDateTime,
        meterKey: meter.key,
      });
      if (result.success) {
        return result;
      }

      return {
        success: false,
        message: `MRV validate error: ${result.message}`,
      };
    } catch (err) {
      return {
        success: false,
        message: `MRV validate failed: ${meter.id}@${isoDateTime} ${err}`,
      };
    }
  }

  async prepareMrv(
    task: IMeterTask,
  ): Promise<IMutationResult<IMrvStateResponse>> {
    return withSegment('prepareMrv', async () => {
      this.logger.debug(`prepareMrv: ${task.id}`);
      const { meter, isoDateTime, id } = task;
      try {
        const result = await this.platformService.prepareMrv({
          isoDateTime,
          meterKey: meter.key,
          taskId: id,
        });
        if (result.success) {
          return result;
        }

        return {
          success: false,
          message: `MRV prepare error: ${result.message}`,
        };
      } catch (err) {
        return {
          success: false,
          message: `MRV task failed: ${meter.id}@${isoDateTime} ${err}`,
        };
      }
    });
  }
}
