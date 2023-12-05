import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import promiseRetry from 'promise-retry';
import { storeFileToS3, getFileFromS3, S3Config } from '@tymlez/backend-libs';

@Injectable()
export class StorageService {
  private dataBucketName: string;

  constructor(private configService: ConfigService) {
    this.dataBucketName =
      this.configService.get<string>('TRUSTCHAIN_DATA_BUCKET_NAME') ||
      'dev-bucket-3';
  }

  async saveDocumentDataToS3(objectId: string, object: any) {
    return await storeFileToS3(
      this.dataBucketName,
      objectId,
      Buffer.from(JSON.stringify(object)),
    );
  }

  async getDocumentDataFromS3(
    documentName: string,
    clientConfig?: S3Config,
    retries = 3,
  ) {
    const readFileFromS3 = async () => {
      const file = await getFileFromS3(
        this.dataBucketName,
        documentName,
        clientConfig,
      );
      if (file.content) {
        return JSON.parse(file.content.toString());
      }
      return null;
    };
    return await promiseRetry(
      (retry: any) => {
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
    ).then((data: any) => {
      return data;
    });
  }
}
