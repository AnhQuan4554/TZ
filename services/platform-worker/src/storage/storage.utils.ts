import {
  storeFileToS3,
  getFileFromS3,
  listAllObjectsWithPrefixes,
  S3Config,
} from '@tymlez/backend-libs';

export async function saveJsonDataToS3(
  bucket: string,
  objectKey: string,
  jsonData: Object,
) {
  return await storeFileToS3(
    bucket,
    objectKey,
    Buffer.from(JSON.stringify(jsonData)),
  );
}

export async function getJsonDataFromS3(
  bucket: string,
  objectKey: string,
  clientConfig?: S3Config,
) {
  const file = await getFileFromS3(bucket, objectKey, clientConfig);

  if (file.content) {
    return JSON.parse(file.content.toString());
  }

  return null;
}

export async function getBatchJsonDataFromS3(
  bucketName: string,
  prefixes: string[],
  clientConfig: S3Config,
) {
  const data = [];
  for await (const response of listAllObjectsWithPrefixes(
    bucketName,
    prefixes,
    clientConfig,
  )) {
    for await (const content of response.Contents ?? []) {
      if (content.Key) {
        const file = await getJsonDataFromS3(
          bucketName,
          content.Key,
          clientConfig,
        );
        data.push(file);
      }
    }
  }
  return data;
}
