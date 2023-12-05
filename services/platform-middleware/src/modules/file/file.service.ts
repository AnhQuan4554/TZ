import { Injectable } from '@nestjs/common';
import { getFileFromS3, logger } from '@tymlez/backend-libs';

@Injectable()
export class FileService {
  async getFile(url: string): Promise<any> {
    //http://localstack:4566/dev-bucket-1/installer/ins-1/2B34D66C-07EB-45B9-ABA5-867F80FAFD5D.jpeg
    //https://preprod-cohort-tymlez-asset.s3.ap-southeast-2.amazonaws.com/installer/Installer-1/Landscape-Color.jpeg

    const urls = decodeURIComponent(url).split('/');

    const bucketName = urls[urls.length - 4].replace(
      '.s3.ap-southeast-2.amazonaws.com',
      '',
    );
    const fileName = urls.slice(urls.length - 3).join('/');
    try {
      const file = await getFileFromS3(
        bucketName,
        fileName,
        undefined,
        'buffer',
      );
      return file;
    } catch (err: any) {
      logger.error(err);
      return {};
    }
  }
}
