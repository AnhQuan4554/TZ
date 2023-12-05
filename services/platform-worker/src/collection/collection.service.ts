import { Injectable, Logger } from '@nestjs/common';
import {
  EnumMeterType,
  getStartOfInterval,
  runAllSettled,
  toIIsoDate,
} from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMeter,
  IMeterTask,
  IMutationResult,
} from '@tymlez/platform-api-interfaces';
import { withSegment } from '@tymlez/backend-libs';
import { StorageService } from '../storage/storage.service';
import { SolcastService } from '../solcast/solcast.service';
import { WattwatchersService } from '../wattwatchers/wattwatchers.service';
import { MagnumService } from '../magnum/magnum.service';
import { ClientSpecificService } from '../client-specific/client-specific.service';
import { UonService } from '../uon/uon.service';
import type { ISolcastData } from '../solcast/solcast.types';
import type { IWattwatchersData } from '../wattwatchers/wattwatchers.types';
import type { IMagnumData } from '../magnum/magnum.types';
import type { IUonData } from '../uon/uon.types';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(
    private wattwatchersService: WattwatchersService,
    private solcastService: SolcastService,
    private magnumService: MagnumService,
    private clientSpecificService: ClientSpecificService,
    private uonService: UonService,
    private storageService: StorageService,
  ) {}

  private async checkMeterDataExists(
    meter: IMeter,
    isoDateTime: IIsoDate,
    dataType: 'raw' | 'transformed',
  ) {
    const hasMeterData = await this.storageService.hasMeterData(
      meter,
      isoDateTime,
      dataType,
    );

    this.logger.debug(
      `Check existing reading: ${meter.key}@${isoDateTime} = ${hasMeterData}`,
    );

    return hasMeterData;
  }

  private getIsoDateTimeFromRawMeterData(
    meter: IMeter,
    meterData: IWattwatchersData | ISolcastData | IMagnumData | IUonData,
  ): IIsoDate | null {
    let isoDateTime: IIsoDate | null = null;
    if (meter.meterType === EnumMeterType.Wattwatchers) {
      isoDateTime = getStartOfInterval(
        toIIsoDate((meterData as IWattwatchersData).timestamp),
        meter.interval,
      );
    }

    if (meter.meterType === EnumMeterType.Magnum) {
      isoDateTime = getStartOfInterval(
        toIIsoDate((meterData as IMagnumData).timestamp),
        meter.interval,
      );
    }

    if (meter.meterType === EnumMeterType.Uon) {
      isoDateTime = getStartOfInterval(
        toIIsoDate((meterData as IUonData).timestamp),
        meter.interval,
      );
    }

    if (meter.meterType === EnumMeterType.Solcast) {
      isoDateTime = getStartOfInterval(
        new Date((meterData as ISolcastData).period_end).toISOString(),
        meter.interval,
      );
    }
    // Limitation: client specific implement have to always return timestamp in data
    if (meter.meterType === EnumMeterType.ClientSpecific) {
      isoDateTime = getStartOfInterval(
        toIIsoDate((meterData as any).timestamp),
        meter.interval,
      );
    }

    return isoDateTime;
  }

  private async persistMeterData(
    meter: IMeter,
    meterData: IWattwatchersData | ISolcastData | IMagnumData | IUonData,
  ) {
    const isoDateTime = this.getIsoDateTimeFromRawMeterData(meter, meterData);

    if (isoDateTime === null) {
      this.logger.error(
        `Unable to work out isoDateTime from meter data for meter: ${meter.key}`,
      );

      return null;
    }

    try {
      const fileResult = await this.storageService.saveMeterData(
        meter,
        isoDateTime,
        'raw',
        meterData,
      );
      this.logger.debug(
        `Meter data saved for: ${meter.key}@${isoDateTime} => ${fileResult.url}`,
      );
      return isoDateTime;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private async readMeterData(
    meter: IMeter,
    meterTask: IMeterTask,
    isoDateTime: IIsoDate,
  ): Promise<(IWattwatchersData | ISolcastData | IMagnumData | IUonData)[]> {
    if (meter.meterType === 'uon') {
      return await this.uonService.readMeterAt(meter, isoDateTime);
    }

    if (meter.meterType === EnumMeterType.Wattwatchers) {
      return await this.wattwatchersService.readMeterSince(meter, isoDateTime);
    }

    if (meter.meterType === EnumMeterType.Solcast) {
      return await this.solcastService.readMeterUpto(meter, isoDateTime);
    }

    if (meter.meterType === EnumMeterType.Magnum) {
      return await this.magnumService.readMeterAt(meter, isoDateTime);
    }

    if (meter.meterType === EnumMeterType.ClientSpecific) {
      return await this.clientSpecificService.readMeterAt(
        meter,
        meterTask,
        isoDateTime,
      );
    }

    return [];
  }

  async collectDataForTask(task: IMeterTask): Promise<IMutationResult> {
    return withSegment<IMutationResult>('collectDataForTask', async () => {
      const { id, meter, isoDateTime } = task;
      this.logger.debug(
        `collectDataForTask: ${id}@${isoDateTime} (meter: ${meter.id}@${meter.meterType})`,
      );

      const hasMeterData = await this.checkMeterDataExists(
        meter,
        isoDateTime,
        'raw',
      );

      if (hasMeterData) {
        return {
          success: true,
          message: `Existing reading found: ${meter.key}@${isoDateTime}`,
        };
      }
      const data = await this.readMeterData(meter, task, isoDateTime);
      if (data === null || data.length === 0) {
        return {
          success: false,
          message: `Meter data not found: ${meter.key}@${isoDateTime}`,
        };
      }

      const hasMatchIsoDateTime = data.find(
        (meterData) =>
          this.getIsoDateTimeFromRawMeterData(meter, meterData) === isoDateTime,
      );

      if (!hasMatchIsoDateTime) {
        return {
          success: false,
          message: `Meter data not found: ${meter.id}@${isoDateTime}`,
        };
      }

      await runAllSettled(
        data,
        (meterData) => this.persistMeterData(meter, meterData),
        3,
      );

      return {
        success: true,
        message: `Meter data collected: ${meter.key}@${isoDateTime}`,
      };
    });
  }
}
