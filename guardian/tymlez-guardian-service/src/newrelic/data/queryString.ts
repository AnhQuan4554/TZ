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

export const strError = `Custom/Guardian/guardian/logs/error`;

export const getErrorReportString = (
  displayName: string,
  env: string,
  dashboard = false,
): string => {
  const query = `SELECT count(*) AS '${displayName}' FROM Transaction WHERE error IS true AND http.statusCode='500' AND appName = '${env}'`;
  return dashboard ? `${query} SINCE 30 MINUTES AGO TIMESERIES` : query;
};
