import execSH from 'exec-sh';
import type { IGuardianConfig } from '../../../libs/gke/getBuildTimeConfig';
import { runHelmDeploy } from './heml';

interface IGkeEnv {
  clientName: string;
  env: string;
  gkeCluster: string;
  region: string;
  gcpProjectId: string;
}

async function setupEnv({
  clientName,
  env,
  gkeCluster,
  region,
  gcpProjectId,
}: IGkeEnv) {
  const fullEnv = `${clientName}-${env}`;

  console.log(
    ' current project id: ',
    await execSH.promise(
      ['gcloud', 'config', 'get-value', 'project'].join(' '),
    ),
  );

  await execSH.promise(
    [
      'gcloud',
      'config',
      'get-value',
      'project',
      '|',
      'grep',
      fullEnv,
      '||',
      `{ echo Invalid GCP project, expect ${fullEnv}; false; }`,
    ].join(' '),
  );
  await execSH.promise('gcloud info');
  await execSH.promise(
    `gcloud container clusters get-credentials ${gkeCluster} --region ${region} --project ${gcpProjectId}`,
  );
  console.log('Using GKE Cluster', { gkeCluster, region });
}

export async function deployToGke({
  clientName,
  env,
  gcpProjectId,
  gkeCluster,
  region,
  imageTag,
  apiKey,
  nrApiKey,
  chart,
  ipfsEncryptionKey,
  userEncryptionKey,
}: {
  nrApiKey: string;
  clientName: string;
  env: string;
  gcpProjectId: string;
  gkeCluster: string;
  region: string;
  imageTag: string;
  apiKey: string;
  chart: string;
  ipfsEncryptionKey: string;
  userEncryptionKey: string;
}) {
  // Make sure w don't deploy to the wrong GCP project

  await setupEnv({ env, clientName, gcpProjectId, gkeCluster, region });

  const values = {
    'image.repository': `asia.gcr.io/${gcpProjectId}/${chart}`,
    'image.tag': imageTag,
    nr_api_key: nrApiKey,
    'configmap.data.DEPLOY_VERSION': imageTag,
    'configmap.data.ENV_NAME': process.env.ENV || '',
    'configmap.data.CLIENT_NAME': clientName,
    'configmap.data.GUARDIAN_TYMLEZ_API_KEY': apiKey,
    'secrets.data.ipfs_encryption_key': ipfsEncryptionKey,
    'secrets.data.encryption_secret_key': userEncryptionKey,
    guardian_release_name: `guardian-${env}`,
  };
  await runHelmDeploy({
    dryRun: false,
    gcpProjectId,
    values,
    releaseName: `${chart}-${process.env.ENV}`,
    chart,
  });
}

export async function deployGuardianStack({
  clientName,
  env,
  gcpProjectId,
  gkeCluster,
  region,
  chart,
  operatorId,
  operatorKey,
  ipfsKey,
  accessTokenSecret,
  guardianConfig,
  nrLicenseKey,
}: {
  clientName: string;
  env: string;
  gcpProjectId: string;
  gkeCluster: string;
  region: string;
  operatorId: string;
  operatorKey: string;
  ipfsKey: string;
  chart: string;
  accessTokenSecret: string;
  guardianConfig: IGuardianConfig;
  nrLicenseKey: string;
}) {
  await setupEnv({ env, clientName, gcpProjectId, gkeCluster, region });

  const values = {
    'global.guardian.version': guardianConfig.version,
    'global.guardian.accessTokenSecret': accessTokenSecret,
    'global.guardian.operatorId': operatorId,
    'global.guardian.operatorKey': operatorKey,
    'global.guardian.network': guardianConfig.network,
    'global.guardian.initialStandardRegistryBalance':
      guardianConfig.initial_standard_registry_balance?.toString(),
    'global.guardian.initializationTopicId':
      guardianConfig.initialization_topic_id,
    'global.guardian.maxTransactionFee':
      guardianConfig.max_transaction_fee?.toString(),
    'global.guardian.initialBalance':
      guardianConfig.initial_balance?.toString(),
    'global.nrLicenseKey': nrLicenseKey,
    'global.env': env,
    'global.clientName': clientName,
    'global.guardian.ipfsKey': ipfsKey,
    'global.guardian.replicas': guardianConfig.replicas.toString(),
    'nast.cluster.replicas': guardianConfig.nat_replicas.toString(),
    'nast.cluster.enabled': (guardianConfig.nat_replicas > 1).toString(),
    'ingress-nginx.controller.service.loadBalancerSourceRanges':
      guardianConfig.whitelisted_ips,
  };
  await runHelmDeploy({
    dryRun: false,
    gcpProjectId,
    values,
    releaseName: `guardian-${env}`,
    chart,
  });
}
