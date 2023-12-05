import { Injectable, Logger } from '@nestjs/common';
import { withSegment } from '@tymlez/backend-libs';
import { EnumMeterType } from '@tymlez/common-libs';
import type {
  IMeterTask,
  IMeter,
  IMutationResult,
  IIsoDate,
  IMeterData,
} from '@tymlez/platform-api-interfaces';
import type { IMagnumData } from '../magnum/magnum.types';
import type { ISolcastData } from '../solcast/solcast.types';
import type { IWattwatchersData } from '../wattwatchers/wattwatchers.types';
import type { IUonData } from '../uon/uon.types';

import { SolcastService } from '../solcast/solcast.service';
import { StorageService } from '../storage/storage.service';
import { WattwatchersService } from '../wattwatchers/wattwatchers.service';
import { MagnumService } from '../magnum/magnum.service';
import { ClientSpecificService } from '../client-specific/client-specific.service';
import { UonService } from '../uon/uon.service';

@Injectable()
export class TransformationService {
  private readonly logger = new Logger(TransformationService.name);

  constructor(
    private wattwatchersService: WattwatchersService,
    private solcastService: SolcastService,
    private magnumService: MagnumService,
    private storageService: StorageService,
    private clientSpecificService: ClientSpecificService,
    private uonService: UonService,
  ) {}

  private async transformMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    meterRawData: IWattwatchersData | ISolcastData | IMagnumData | IUonData,
  ): Promise<IMeterData[]> {
    this.logger.debug(
      `Tranforming meter data: ${meter.key}@${isoDateTime} of ${meter.meterType} type.`,
    );

    const timezone = meter.site.timezone || 'UTC';

    if (meter.meterType === EnumMeterType.Wattwatchers) {
      this.logger.debug(`Tranforming meterdata for wattwatchers`);
      return await this.wattwatchersService.transformMeterData(
        meter,
        isoDateTime,
        timezone,
        meterRawData as IWattwatchersData,
      );
    }

    if (meter.meterType === EnumMeterType.Solcast) {
      return await this.solcastService.transformMeterData(
        meter,
        isoDateTime,
        timezone,
        meterRawData as ISolcastData,
      );
    }

    if (meter.meterType === EnumMeterType.Magnum) {
      return await this.magnumService.transformMeterData(
        meter,
        isoDateTime,
        timezone,
        meterRawData as IMagnumData,
      );
    }

    if (meter.meterType === EnumMeterType.ClientSpecific) {
      return await this.clientSpecificService.transformMeterData(
        meter,
        isoDateTime,
        meterRawData as any,
      );
    }

    if (meter.meterType === EnumMeterType.Uon) {
      return await this.uonService.transformMeterData(
        meter,
        isoDateTime,
        timezone,
        meterRawData as IUonData,
      );
    }

    return [];
  }

  async tranformDataForTask(task: IMeterTask): Promise<IMutationResult> {
    return withSegment('tranformDataForTask', async () => {
      const { id, meter, isoDateTime } = task;

      this.logger.debug(
        `tranformDataForTask: ${id}@${isoDateTime} (meter: ${meter.id}@${meter.meterType})`,
      );
      let meterRawData;
      try {
        meterRawData = await this.storageService.getMeterData(
          meter,
          isoDateTime,
          'raw',
        );

        if (meterRawData) {
          const data = await this.transformMeterData(
            meter,
            isoDateTime,
            meterRawData,
          );

          if (data.length > 0) {
            await this.storageService.saveMeterData(
              meter,
              isoDateTime,
              'transformed',
              data,
            );

            this.logger.debug(
              `Meter data transformed: ${meter.id}@${isoDateTime} => ${data.length} records`,
            );

            return {
              success: true,
              message: `Meter data transformed: ${meter.id}@${isoDateTime} => ${data}`,
            };
          }
        }
        this.logger.error(
          {
            meterRawData,
          },
          `Meter raw data not available for: ${meter.key}@${isoDateTime}`,
        );
        return {
          success: false,
          message: `Meter raw data not available for: ${meter.key}@${isoDateTime}`,
        };
      } catch (error) {
        this.logger.error(
          { error },
          `Meter data transformed failed: ${meter.key}@${isoDateTime} ${error}`,
        );

        return {
          success: false,
          message: `Meter data transformed failed: ${meter.key}@${isoDateTime} ${error}`,
        };
      }
    });
  }
}
