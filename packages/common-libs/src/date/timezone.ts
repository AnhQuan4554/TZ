import type { IIsoDate } from '@tymlez/platform-api-interfaces';

export function getTimezoneOffset(inputDate: Date, tz: string) {
  const localeString = inputDate
    .toLocaleString('ja', { timeZone: tz })
    .split(/[/\s:]/)
    .map((i) => parseInt(i, 10));
  const [year, month, day, hour, minute, second] = localeString;
  const t1 = Date.UTC(year, month - 1, day, hour, minute, second);
  const t2 = new Date(inputDate).setMilliseconds(0);
  return (t2 - t1) / 60 / 1000;
}

/**
 * create a new Date used to show local time in a given timezone
 * e.g. takes  new Date('2022-01-22T23:39:30.000Z') and 'Australia/Melbourne',
 * and return new Date(2022, 0, 23, 10)
 */
export function convertTimezone(
  inputDate: Date | number,
  tz: string | null = null,
) {
  if (tz === null) {
    return new Date(inputDate);
  }

  const localeString = new Date(inputDate)
    .toLocaleString('ja', { timeZone: tz })
    .split(/[/\s:]/)
    .map((i) => parseInt(i, 10));
  const [year, month, day, hour, minute, second] = localeString;

  return new Date(year, month - 1, day, hour, minute, second);
}

/**
 * takes a Date as if it is local time in a given timezone and create a new Date
 * e.g. takes new Date(2022, 0, 23, 10) and 'Australia/Melbourne',
 * and return new Date('2022-01-22T23:00:00.000Z')
 */
export function forceTimezone(inputDate: Date | number | IIsoDate, tz: string) {
  const d = new Date(inputDate);
  const offset = getTimezoneOffset(new Date(d.getTime()), tz);

  return new Date(d.getTime() + offset * 60 * 1000);
}
