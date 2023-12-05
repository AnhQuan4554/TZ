import assert from 'assert';
import { getParameters } from './getParameters';

export const getBuildTimeConfig = async ({
  env,
  clientName,
}: {
  env: string;
  clientName: string;
}): Promise<IConfig> => {
  assert(clientName, `clientName is missing`);

  const [
    GCP_PROJECT_ID,
    GCP_REGION,
    GKE_CLUSTER,
    GUARDIAN_TYMLEZ_API_KEY,
    GUARDIAN_TYMLEZ_SERVICE_BASE_URL,
    NR_API_KEY,
    GUARDIAN_ACCESS_TOKEN_SECRET,
    GUARDIAN_IPFS_KEY,
    GUARDIAN_OPERATOR_ID,
    GUARDIAN_OPERATOR_KEY,
    guardianConfig,
    IPFS_ENCRYPTION_KEY,
    USER_ENCRYPTION_KEY,
  ] = await getParameters([
    `/${env}/tymlez-platform/gcp-project-id`,
    `/${env}/tymlez-platform/gcp-region`,
    `/${env}/tymlez-platform/gke-cluster`,
    `/${env}/tymlez-platform/guardian-tymlez-api-key`,
    `/${env}/tymlez-platform/guardian-tymlez-service-base-url`,
    `/${env}/tymlez-platform/nr-api-key`,
    `/${env}/tymlez-platform/guardian-access-token-secret`,
    `/${env}/tymlez-platform/guardian-ipfs-key`,
    `/${env}/tymlez-platform/guardian-operator-id`,
    `/${env}/tymlez-platform/guardian-operator-key`,
    `/${env}/tymlez-platform/guardian-config`,
    `/${env}/tymlez-platform/ipfs-encryption-key`,
    `/${env}/tymlez-platform/user-encryption-key`,
  ]);

  assert(GUARDIAN_TYMLEZ_API_KEY, `GUARDIAN_TYMLEZ_API_KEY is missing`);
  assert(
    GUARDIAN_TYMLEZ_SERVICE_BASE_URL,
    `GUARDIAN_TYMLEZ_SERVICE_BASE_URL is missing`,
  );

  return {
    GUARDIAN_ACCESS_TOKEN_SECRET,
    GUARDIAN_IPFS_KEY,
    GUARDIAN_OPERATOR_ID,
    GUARDIAN_OPERATOR_KEY,
    GCP_PROJECT_ID,
    GCP_REGION,
    GKE_CLUSTER,
    GUARDIAN_TYMLEZ_API_KEY,
    GUARDIAN_TYMLEZ_SERVICE_BASE_URL,
    NR_API_KEY,
    GUARDIAN_CONFIG: JSON.parse(guardianConfig || ''),
    IPFS_ENCRYPTION_KEY,
    USER_ENCRYPTION_KEY,
  } as any as IConfig;
};
export interface IGuardianConfig {
  nat_replicas: number;
  replicas: number;
  version: string;
  whitelisted_ips: string[];
  max_transaction_fee: number;
  initial_balance: number;
  initial_standard_registry_balance: number;
  network: string;
  initialization_topic_id: string;
}
interface IConfig {
  GUARDIAN_IPFS_KEY: string;
  GUARDIAN_OPERATOR_ID: string;
  GUARDIAN_OPERATOR_KEY: string;
  GUARDIAN_ACCESS_TOKEN_SECRET: string;
  GUARDIAN_TYMLEZ_API_KEY: string;
  GUARDIAN_TYMLEZ_SERVICE_BASE_URL: string;
  NR_API_KEY: string;
  GCP_PROJECT_ID: string;
  GCP_REGION: string;
  GKE_CLUSTER: string;
  GUARDIAN_CONFIG: IGuardianConfig;
  IPFS_ENCRYPTION_KEY: string;
  USER_ENCRYPTION_KEY: string;
}
