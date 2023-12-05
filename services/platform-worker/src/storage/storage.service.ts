import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import promiseRetry from 'promise-retry';

import type { IIsoDate, IMeter } from '@tymlez/platform-api-interfaces';
import { objectExists } from '@tymlez/backend-libs';
import { saveJsonDataToS3, getJsonDataFromS3 } from './storage.utils';

@Injectable()
export class StorageService {
  private dataBucketName: string;

  constructor(private configService: ConfigService) {
    this.dataBucketName =
      this.configService.get<string>('METER_BUCKET_NAME') || 'dev-bucket-1';
  }

  private getStoragePrefix(
    meter: IMeter,
    isoDateTime: IIsoDate,
    dataType: 'raw' | 'transformed',
  ): string {
    const { key, interval } = meter;
    const dayPrefix = isoDateTime.substring(0, 10).replace(/-/g, '/');
    return `${dataType}/${dayPrefix}/${key}-${interval}`;
  }

  private getStorageKey(
    meter: IMeter,
    isoDateTime: IIsoDate,
    dataType: 'raw' | 'transformed',
  ) {
    const prefix = this.getStoragePrefix(meter, isoDateTime, dataType);
    const filename = isoDateTime.replace(/:/g, '-');
    return `${prefix}/${filename}.json`;
  }

  async saveMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    dataType: 'raw' | 'transformed',
    meterData: Object,
  ) {
    const objectKey = this.getStorageKey(meter, isoDateTime, dataType);

    return await saveJsonDataToS3(this.dataBucketName, objectKey, meterData);
  }

  async hasMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    dataType: 'raw' | 'transformed',
  ) {
    const objectKey = this.getStorageKey(meter, isoDateTime, dataType);

    return await objectExists(this.dataBucketName, objectKey);
  }

  async getMeterData(
    meter: IMeter,
    isoDateTime: IIsoDate,
    dataType: 'raw' | 'transformed',
    retries = 3,
  ) {
    const readFileFromS3 = async () => {
      const objectKey = this.getStorageKey(meter, isoDateTime, dataType);
      return await getJsonDataFromS3(this.dataBucketName, objectKey);
    };

    return await promiseRetry(
      (retry) => {
        return readFileFromS3().catch((err) => {
          if (
            err.name === 'NoSuchKey' ||
            err.code === 'NoSuchKey' ||
            err.message?.includes('NoSuchKey')
          ) {
            retry(err);
          }

          throw err;
        });
      },
      { retries, randomize: true },
    ).then((data) => {
      return data;
    });
  }
}
