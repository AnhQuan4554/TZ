export const getQueryString = (
  displayName: string,
  metricName: string,
  env: string,
  dashboard = false,
  aggregateFunction = 'count',
): string => {
  const aggregate =
    aggregateFunction === 'count'
      ? 'count(newrelic.timeslice.value)'
      : 'average(newrelic.timeslice.value) * 1000';

  const query = `SELECT ${aggregate} AS '${displayName}' FROM Metric WHERE metricTimesliceName = '${metricName}' AND appName = '${env}'`;
  return dashboard ? `${query} SINCE 30 MINUTES AGO TIMESERIES` : query;
};

export const strBalance = (name: string): string => {
  return `Custom/Tymlez/guardian/balance/${name}/realtime`;
};

export const strJobSuccess = (name: string): string => {
  return `Custom/Tymlez/Job/${name}/Completed`;
};

export const strJobError = (name: string): string => {
  return `Custom/Tymlez/Job/${name}/Error`;
};

export const strCronError = (name: string): string => {
  return `Custom/Tymlez/Cron_Policy/${name}/Error`;
};

export const strCronSuccess = (name: string): string => {
  return `Custom/Tymlez/Cron_Policy/${name}/Success`;
};

export const getErrorReportString = (
  displayName: string,
  env: string,
  dashboard = false,
): string => {
  const query = `SELECT count(*) AS '${displayName}' FROM Transaction WHERE error IS true AND http.statusCode='500' AND appName = '${env}'`;
  return dashboard ? `${query} SINCE 30 MINUTES AGO TIMESERIES` : query;
};

export const getAPIString = (env: string): string => {
  return `SELECT count(*) as 'Total transactions', average(duration) as 'Avg duration (s)', percentile(duration, 90) as 'Slowest 10% (s)', percentage(count(*), WHERE error is false) AS 'Success rate' FROM Transaction WHERE error IS true AND appName = '${env}'`;
};
