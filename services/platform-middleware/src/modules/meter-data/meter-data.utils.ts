import type { IMeterDataQuery } from '@tymlez/platform-api-interfaces';

function getIsoDateTimeColumn(query: IMeterDataQuery) {
  if (['month', 'week', 'day', 'hour'].includes(query.granularity)) {
    return `iso_date_time_${query.granularity}`;
  }

  if (query.granularity === 'minute') {
    return 'iso_date_time';
  }

  return null;
}

export function getSelectColumns(query: IMeterDataQuery) {
  const columns = ['metric_name', 'sum(metric_value) as value'];
  const isoDateTimeColumn = getIsoDateTimeColumn(query);

  if (isoDateTimeColumn !== null) {
    columns.push(`${isoDateTimeColumn} as iso_date_time`);
  }

  if (query.groupByMeters) {
    columns.push('meter_key');
  }

  if (query.groupByTags) {
    columns.push('unnest(tags) as tag');
  }

  return columns;
}

export function getGroupByColumns(query: IMeterDataQuery) {
  const columns = ['metric_name'];
  const isoDateTimeColumn = getIsoDateTimeColumn(query);

  if (query.groupByMeters) {
    columns.push('meter_key');
  }

  if (isoDateTimeColumn !== null) {
    columns.push(isoDateTimeColumn);
  }

  if (query.groupByTags) {
    columns.push('unnest(tags)');
  }

  return columns;
}

export function getWhereConditions(query: IMeterDataQuery) {
  const where = [];

  where.push({ metric_name: query.metricNames });
  where.push({ iso_date_time: { $gte: query.fromIsoDateTime } });
  where.push({ iso_date_time: { $lt: query.toIsoDateTime } });

  if (query.meterKeys !== undefined && query.meterKeys?.length > 0) {
    where.push({ meter_key: query.meterKeys });
  }

  if (query.tags !== undefined && query.tags?.length > 0) {
    where.push({ tags: { $overlap: query.tags } });
  }

  return where;
}

export function getOrderByColumn(query: IMeterDataQuery) {
  const isoDateTimeColumn = getIsoDateTimeColumn(query);

  return isoDateTimeColumn ?? 'metric_name';
}
