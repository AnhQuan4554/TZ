import newrelic from 'newrelic';

export function reportAPMMetric(
  event: string,
  value: number,
  group = 'Tymlez',
) {
  const metricName = [group, ...event.split('.')].join('/');
  newrelic.recordMetric(metricName, value);
}
export function reportErrorToNewRelic(
  error: Error,
  metricName?: string,
  group = 'Tymlez',
): void {
  newrelic.noticeError(error);
  if (metricName) {
    reportAPMMetric(metricName, 1, group);
  }
}

export enum METRIC_NAMES {
  WORKER_TASK_PENDING = 'platform.worker.tasks.pending',
  WORKER_HEALTHCHECK_ERROR = 'platform.worker.healthcheck.error',
  WORKER_HEALTHCHECK_SUCCESS = 'platform.worker.healthcheck.success',
  GUARDIAN_HEALTHCHECK_SUCCESS = 'guardian.healthcheck.success',
  GUARDIAN_HEALTHCHECK_ERROR = 'guardian.healthcheck.error',
  GUARDIAN_ERROR_OCCURED = 'guardian.logs.error',
  GUARDIAN_TOKEN_MINTED = 'guardian.token.minted',
  MRV_PREPARE_ERROR = 'mrv.prepare.error',
  MRV_SUBMISSION_ERROR = 'mrv.submission.error',
  MRV_SUBMISSION_SUCCESS = 'mrv.submission.success',
  APP_GUARDIAN_EXTENSION = 'guardian-extensions.started',
  IPFS_FILE_ENCRYPTED = 'guardian-extensions.encrypted',
  APP_PLATFORM_WORKER = 'platform.worker.started',
  GUARDIAN_ROOT_ACCOUNT_REALTIME_BALANCE = 'guardian.root-authority.balance.realtime',
  GUARDIAN_ROOT_ACCOUNT_REALTIME_BALANCE_ERROR = 'guardian.root-authority.balance.realtime.error',
  GUARDIAN_OWNER_ACCOUNT_REALTIME = 'guardian.owner.balance.realtime',
  GUARDIAN_OWNER_ACCOUNT_REALTIME_BALANCE_ERROR = 'guardian.owner.balance.realtime.error',
  APP_GUARDIAN_TYMLEZ_API = 'guardian.tymlez.api',
  MRV_PREPARE_DUPLICATE_PROCESS_MRV = 'mrv.prepare.duplicated',
  IPFS_FILE_STORAGED = 'ipfs.file.stored',
  CRON_VERIFICATION_ERROR = 'cron.verification.error',
}
