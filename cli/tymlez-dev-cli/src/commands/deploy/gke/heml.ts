import assert from 'assert';
import execSH from 'exec-sh';
import { resolve } from 'path';

interface IHemlDeployParams {
  releaseName: string;
  chart: string;
  dryRun?: boolean;
  gcpProjectId: string;
  values: {
    [x: string]: string | string[];
  };
}

export async function runHelmDeploy(args: IHemlDeployParams) {
  const { dryRun = true, chart, values, gcpProjectId, releaseName } = args;
  await execSH.promise(['helm', 'version'].join(' '));

  if (!dryRun) {
    // validate
    assert(
      gcpProjectId !== 'gcpProjectId',
      'Please provide valid gcpProjectId',
    );
  }

  console.log('Charts location', resolve('charts', chart));
  await execSH.promise(['helm', 'dependency', 'update'].join(' '), {
    cwd: resolve('charts', chart),
  });

  const setValues = Object.entries(values)
    .map(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          return `--set ${key}={${value.join(',')}}`;
        }
        return `--set-string ${key}=${value}`;
      }
      return null;
    })
    .filter(Boolean);
  const command = [
    'helm',
    'upgrade',
    '-n tymlez-guardian',
    '--create-namespace',
    '--install',
    '--debug',
    releaseName,
    '.',
    ...setValues,
    dryRun ? '--dry-run' : '',
  ].join(' ');

  console.log('Deploying to GKE with helm', command);

  await execSH.promise(command, {
    cwd: resolve('charts', chart),
  });
}
