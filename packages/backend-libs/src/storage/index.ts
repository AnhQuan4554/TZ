/* eslint-disable no-process-env */
import type { Readable } from 'stream';
import path from 'path';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  S3ClientConfig,
  ListBucketsCommand,
  CreateBucketCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { logger } from '../pino';
import { streamToBuffer, streamToString } from '../stream';

import type { IStoredFile } from './IStoreFile';

export * from './IStoreFile';

let s3Client: S3Client | undefined;
export type S3Config = S3ClientConfig;

export const getS3Client = (clientConfig?: S3ClientConfig): S3Client => {
  if (clientConfig !== undefined) {
    return new S3Client({
      region: 'ap-southeast-2',
      ...clientConfig,
    });
  }

  if (s3Client === undefined) {
    const s3Config: S3ClientConfig = {
      forcePathStyle: true,
      credentials: process.env.AWS_ACCESS_KEY_ID
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
          }
        : undefined,
      region: process.env.AWS_REGION || 'ap-southeast-2',
      // signatureVersion: 'v4',
    };

    if (process.env.S3_ENDPOINT !== undefined) {
      s3Config.endpoint = process.env.S3_ENDPOINT;
    }
    s3Client = new S3Client(s3Config);
  }

  return s3Client;
};

async function ensureS3Bucket(bucketName: string, s3: S3Client) {
  try {
    const buckets = await s3.send(new ListBucketsCommand({}));

    if (buckets.Buckets?.find((b) => b.Name === bucketName)) {
      return true;
    }
    await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
    return true;
  } catch (error) {
    logger.error({ error }, `Cannot create bucket: ${bucketName}`);
    return false;
  }
}

export async function storeFileToS3(
  bucketName: string,
  filename: string,
  content: Buffer,
  clientConfig?: S3ClientConfig,
): Promise<IStoredFile> {
  const s3 = getS3Client(clientConfig);
  await ensureS3Bucket(bucketName, s3);
  await s3.send(
    new PutObjectCommand({ Bucket: bucketName, Body: content, Key: filename }),
  );

  return {
    name: path.basename(filename),
    url: `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/${filename}`,
  };
}

export async function* listAllObjectsWithPrefixes(
  bucketName: string,
  prefixes: string[],
  clientConfig?: S3ClientConfig,
) {
  for (const prefix of prefixes) {
    const opts = {
      Bucket: bucketName,
      Prefix: prefix,
      Delimiter: '/',
      ContinuationToken: undefined,
    };
    do {
      /* eslint-disable no-await-in-loop */
      const data = await getS3Client(clientConfig).send(
        new ListObjectsV2Command(opts),
      );

      opts.ContinuationToken = data.NextContinuationToken as any;
      yield data;
    } while (opts.ContinuationToken);
  }
}

export async function getFileFromS3(
  bucketName: string,
  filename: string,
  clientConfig?: S3ClientConfig,
  responseType: 'string' | 'buffer' = 'string',
): Promise<{ name?: string; content?: any; contentLength?: number }> {
  const s3 = getS3Client(clientConfig);

  const getObjectResult = await s3.send(
    new GetObjectCommand({ Bucket: bucketName, Key: filename }),
  );

  return {
    name: path.basename(filename),
    content:
      responseType === 'buffer'
        ? await streamToBuffer(getObjectResult.Body as Readable)
        : await streamToString(getObjectResult.Body as Readable),
    contentLength: getObjectResult.ContentLength,
  };
}

export async function deleteFileFromS3(
  bucketName: string,
  filename: string,
  clientConfig?: S3ClientConfig,
): Promise<any> {
  const s3 = getS3Client(clientConfig);

  const getObjectResult = await s3.send(
    new DeleteObjectCommand({ Bucket: bucketName, Key: filename }),
  );

  return {
    name: path.basename(filename),
    content: getObjectResult.DeleteMarker,
  };
}

export async function genPutObjectPresignedUrl(
  bucket: string,
  key: string,
  expiresInSeconds: number,
): Promise<string> {
  const s3ClientConfig: S3ClientConfig = {
    region: process.env.AWS_REGION || 'ap-southeast-2',
  };

  if (process.env.ENV === 'local') {
    s3ClientConfig.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
    };
  }
  const client = new S3Client(s3ClientConfig);

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const url = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  return url;
}
export async function objectExists(bucketName: string, objectKey: string) {
  try {
    await getS3Client().send(
      new HeadObjectCommand({ Bucket: bucketName, Key: objectKey }),
    );
    return true;
  } catch (error) {
    return false;
  }
}
