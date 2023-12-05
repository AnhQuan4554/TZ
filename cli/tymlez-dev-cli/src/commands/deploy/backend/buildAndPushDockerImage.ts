import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import execPromise from 'exec-sh';
import {
  buildDockerImage,
  loginToEcr,
  pushDockerImageToEcr,
} from '../../../libs';

const exec = execPromise.promise;

const sts = new STSClient({});

export async function buildAndPushDockerImage({
  imageTag,
  region,
  env,
  ecrRepository,
  allowPublishExternalImages,
}: {
  imageTag: string;
  region: string;
  env: string;
  ecrRepository: string;
  allowPublishExternalImages: boolean;
}) {
  const { Account: accountId } = await sts.send(
    new GetCallerIdentityCommand({}),
  );

  const ecrRegistry = `${accountId}.dkr.ecr.${region}.amazonaws.com`;

  await loginToEcr({ ecrRegistry, region });

  // await exec(
  //   [
  //     'tsc',
  //     '--showConfig',
  //     '|',
  //     "jq 'del(.files)'",
  //     '>',
  //     'tsconfig.json.out',
  //   ].join(' '),
  // );

  await buildDockerImage({
    ecrRegistry,
    ecrRepository,
    imageTag,
    context: '../..',
  });
  await pushDockerImageToEcr({ ecrRegistry, ecrRepository, imageTag });

  if (allowPublishExternalImages) {
    const apmEcrReposistory = `${env}-apm-agent`;
    await exec(['docker', 'pull', 'newrelic/nri-ecs:1.8.0'].join(' '));
    await exec(
      [
        'docker',
        'tag',
        'newrelic/nri-ecs:1.8.0',
        `${ecrRegistry}/${apmEcrReposistory}:latest`,
      ].join(' '),
    );
    await pushDockerImageToEcr({
      ecrRegistry,
      ecrRepository: apmEcrReposistory,
      imageTag: 'latest',
    });

    // build nats image and push to
    const natRepository = ecrRepository.replace('middleware', 'nats');
    await buildDockerImage({
      ecrRegistry,
      ecrRepository: natRepository,
      imageTag: 'latest',
      context: '../../external-docker/nats',
      dockerFile: '../../external-docker/nats/Dockerfile',
    });
    await pushDockerImageToEcr({
      ecrRegistry,
      ecrRepository: natRepository,
      imageTag: 'latest',
    });
  }
}
