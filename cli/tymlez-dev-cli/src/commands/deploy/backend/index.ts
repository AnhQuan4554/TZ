import assert from 'assert';
import { deployViaTerraform } from './terraform';
import { buildAndPushDockerImage } from './buildAndPushDockerImage';

export async function deploy(type: 'tymlez' | 'worker' | 'client') {
  assert(process.env.ENV, 'ENV is missing');
  assert(process.env.ENV !== 'local', 'Cannot deploy to "local"');
  assert(process.env.TF_TOKEN, 'TF_TOKEN is missing');
  assert(process.env.GIT_SHA, 'GIT_SHA is missing');
  assert(process.env.GIT_TAG, 'GIT_TAG is missing');
  assert(process.env.AWS_REGION, 'AWS_REGION is missing');
  assert(process.env.CLIENT_NAME, 'CLIENT_NAME is missing');
  const skipApply = process.env.USE_SINGLE_TF_APPLY === 'true';
  let ecrRepository = '';
  if (type === 'tymlez') {
    ecrRepository = `${process.env.ENV}-tymlez-middleware`;
  } else if (type === 'worker') {
    ecrRepository = `${process.env.ENV}-tymlez-worker`;
  } else if (type === 'client') {
    ecrRepository = `${process.env.ENV}-client-middleware`;
  }

  const TF_WS_PREFIX = `${process.env.CLIENT_NAME}-${process.env.ENV}`;

  await buildAndPushDockerImage({
    imageTag: process.env.GIT_SHA,
    region: process.env.AWS_REGION,
    env: process.env.ENV,
    ecrRepository,
    allowPublishExternalImages: type === 'tymlez',
  });

  await deployViaTerraform({
    gitSha: process.env.GIT_SHA,
    gitTag: process.env.GIT_TAG,
    tfToken: process.env.TF_TOKEN,
    workspaceName: TF_WS_PREFIX,
    backendType: type,
    apply: !skipApply,
  });
}
