import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { v4 as uuidv4 } from 'uuid';
import assert from 'assert';
import execPromise from 'exec-sh';
import { getBuildTimeConfig } from './getBuildTimeConfig';

const exec = execPromise.promise;

export async function deploy(
  env: string,
  clientName: string,
  dist: string,
  folder: string,
) {
  assert(env, 'ENV is missing');
  assert(env !== 'local', 'Cannot deploy "local"');

  assert(clientName, 'ClientName is missing');

  console.log('Deploy front-end app from: %s', dist);

  const { CLOUDFRONT_DISTRIBUTION_ID } = await getBuildTimeConfig({
    env,
  });
  const target = `s3://${env}.${clientName}.tymlez.com/${folder}`;
  await exec(
    ['aws', 's3', 'sync', `--acl 'public-read'`, dist, target].join(' '),
  );
  console.log('Deployed site to %s', target);
  assert(CLOUDFRONT_DISTRIBUTION_ID, `CLOUDFRONT_DISTRIBUTION_ID is missing`);
  await invalidateCloudfront({ distributionId: CLOUDFRONT_DISTRIBUTION_ID });
}

async function invalidateCloudfront({
  distributionId,
}: {
  distributionId: string;
}) {
  const cloudFront = new CloudFrontClient({ region: 'ap-southeast-2' });
  const invalidatingItems = ['/*'];

  console.log('Invalidating CloudFront %s', distributionId, invalidatingItems);

  await cloudFront.send(
    new CreateInvalidationCommand({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: uuidv4(),
        Paths: {
          Quantity: invalidatingItems.length,
          Items: invalidatingItems,
        },
      },
    }),
  );
}
