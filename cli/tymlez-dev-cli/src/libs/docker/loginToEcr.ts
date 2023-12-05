import execPromise from 'exec-sh';

const exec = execPromise.promise;

export async function loginToEcr({
  ecrRegistry,
  region,
}: {
  ecrRegistry: string;
  region: string;
}) {
  await exec(
    [
      'aws',
      'ecr',
      'get-login-password',
      `--region ${region}`,
      '|',
      'docker',
      'login',
      '--username AWS',
      `--password-stdin ${ecrRegistry}`,
    ].join(' '),
  );
}
