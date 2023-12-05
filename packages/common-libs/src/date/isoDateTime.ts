import type {
  ITimestampSec,
  IIsoDate,
  SafeNumber,
} from '@tymlez/platform-api-interfaces';
import { getTimezoneOffset } from './timezone';

function getEpochSeconds(dateObj: Date) {
  return Math.floor(dateObj.getTime() / 1000);
}

export function isIsoDate(dateStr: string) {
  try {
    return new Date(dateStr).toISOString() === dateStr;
  } catch (e) {
    return false;
  }
}

export function toIIsoDate(timestamp: string | ITimestampSec) {
  if (typeof timestamp === 'string') {
    return new Date(timestamp).toISOString();
  }

  return new Date((timestamp as ITimestampSec) * 1000).toISOString();
}

export function isoDateTimeToEpochSeconds(dt: IIsoDate): number {
  return getEpochSeconds(new Date(dt));
}

export function getStartOfInterval(
  dt: IIsoDate,
  interval: SafeNumber,
  offset = 0,
): IIsoDate {
  const timestamp = isoDateTimeToEpochSeconds(dt);
  const startTimestamp = timestamp - (timestamp % interval) + offset * interval;
  return toIIsoDate(startTimestamp);
}

export function getStartOfHour(dt: IIsoDate): IIsoDate {
  return getStartOfInterval(dt, 3600);
}

export function getStartOfDay(dt: IIsoDate, timezoneOffset: number): IIsoDate {
  const timestamp = isoDateTimeToEpochSeconds(dt);
  const startTimestamp =
    timestamp - ((timestamp - timezoneOffset * 60) % 86400);
  return toIIsoDate(startTimestamp);
}

// Monday is defined as the first day of the week.
export function getStartOfWeek(dt: IIsoDate, timezoneOffset: number): IIsoDate {
  const timestamp = isoDateTimeToEpochSeconds(dt);
  const daysOffset = new Date(
    timestamp * 1000 - timezoneOffset * 60 * 1000,
  ).getUTCDay();

  const augmentedTimestamp = timestamp - ((daysOffset + 6) % 7) * 86400;

  const startTimestamp =
    augmentedTimestamp - ((augmentedTimestamp - timezoneOffset * 60) % 86400);
  return toIIsoDate(startTimestamp);
}

export function getStartOfMonth(dt: IIsoDate, timezoneOffset: number) {
  const timestamp = isoDateTimeToEpochSeconds(dt);

  const daysOffset = new Date(
    timestamp * 1000 - timezoneOffset * 60 * 1000,
  ).getUTCDate();

  const augmentedTimestamp = timestamp - (daysOffset - 1) * 86400;

  const startTimestamp =
    augmentedTimestamp - ((augmentedTimestamp - timezoneOffset * 60) % 86400);
  return toIIsoDate(startTimestamp);
}

export function getSecondsAgo(dt: IIsoDate) {
  return getEpochSeconds(new Date()) - isoDateTimeToEpochSeconds(dt);
}

export function getLast24HoursRange() {
  const from = new Date(
    new Date().setDate(new Date().getDate() - 1),
  ).toISOString();
  const to = new Date().toISOString();

  return { from: getStartOfHour(from), to: getStartOfHour(to) };
}

export function getLastNDaysRange(timezone: string, days: SafeNumber) {
  const from = new Date(
    new Date().setDate(new Date().getDate() - days),
  ).toISOString();
  const to = new Date().toISOString();

  const timezoneOffset = getTimezoneOffset(new Date(from), timezone || 'UTC');

  return {
    from: getStartOfDay(from, timezoneOffset),
    to: getStartOfDay(to, timezoneOffset),
  };
}

export function addDaysTo(dt: IIsoDate, days: number): IIsoDate {
  return toIIsoDate(isoDateTimeToEpochSeconds(dt) + 86400 * days);
}

export function isInFuture(dt: IIsoDate): Boolean {
  return new Date(dt) > new Date();
}

export function isoToNanoSecondTimestamp(dt: string): string {
  const milliseconds = new Date(dt).getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const milli = String(milliseconds).slice(-3);
  return `${seconds}.${milli}000000`;
}

export function nanoSecondTimestampToIso(dt: string): string {
  return new Date(parseFloat(dt) * 1000).toISOString();
}
