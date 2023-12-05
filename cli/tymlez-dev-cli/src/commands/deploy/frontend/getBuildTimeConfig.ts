import { getParameters } from '@tymlez/backend-libs';

export const getBuildTimeConfig = async ({
  env,
}: {
  env: string;
}): Promise<IConfig> => {
  const [CLOUDFRONT_DISTRIBUTION_ID] =
    env !== 'local'
      ? await getParameters([
          `/${env}/tymlez-platform/fe-cloudfront-distribution-id`,
        ])
      : [process.env.CLOUDFRONT_DISTRIBUTION_ID];

  const defaultConfig: Partial<IConfig> = DEFAULT_CONFIGS[env] || nonLocal;

  return {
    PLATFORM_API_URL: '/api',
    CLIENT_API_URL: `/client-api`,
    ...defaultConfig,
    CLOUDFRONT_DISTRIBUTION_ID,
    ENV: env,
    GIT_SHA: process.env.GIT_SHA,
  };
};
const nonLocal: Partial<IConfig> = {
  PLATFORM_API_URL: `/api`,
  CLIENT_API_URL: `/client-api`,
  LOGIN_EMAIL: '',
  LOGIN_PASSWORD: '',
};

const DEFAULT_CONFIGS: Record<string, Partial<IConfig> | undefined> = {
  local: {
    PLATFORM_API_URL: `http://localhost:8080/api`,
    CLIENT_API_URL: `http://localhost:8082/client-api`,
    LOGIN_EMAIL: 'development+admin@tymlez.com',
    LOGIN_PASSWORD: 'default',
  },
  dev: nonLocal,
  preprod: nonLocal,
  prod: nonLocal,
};

interface IConfig {
  ENV: string;
  GIT_SHA?: string;
  CLOUDFRONT_DISTRIBUTION_ID?: string;
  PLATFORM_API_URL: string;
  CLIENT_API_URL: string;
  LOGIN_EMAIL?: string;
  LOGIN_PASSWORD?: string;
}
