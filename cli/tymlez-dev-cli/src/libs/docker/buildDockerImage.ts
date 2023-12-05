import execPromise from 'exec-sh';

const exec = execPromise.promise;

export async function buildDockerImage({
  ecrRegistry,
  ecrRepository,
  imageTag,
  context = '.',
  dockerFile = 'Dockerfile',
}: {
  ecrRegistry: string;
  ecrRepository: string;
  imageTag: string;
  context?: string;
  dockerFile?: string;
}) {
  const command = [
    'docker',
    'build',
    '--cache-from',
    `${process.env.CACHE_IMAGE}:latest`,
    '-t',
    `${ecrRegistry}/${ecrRepository}`,
    '--build-arg',
    `GIT_SHA=${imageTag}`,
    '--build-arg',
    'BUILDKIT_INLINE_CACHE=1',
    '--progress=plain',
    '-f',
    dockerFile,
    context,
  ].join(' ');
  console.log('exec command', command);
  await exec(command);
}
