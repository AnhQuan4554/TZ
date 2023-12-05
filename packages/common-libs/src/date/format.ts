import { format } from 'date-fns';
import { convertTimezone } from './timezone';

const formatWithTimezone = (
  inputDate: Date | number,
  fmt = 'yyyy-MM-dd',
  timezone: string | null = null,
) => {
  if (timezone !== null) {
    const castDate = convertTimezone(new Date(inputDate), timezone);
    return format(castDate, fmt);
  }
  return format(inputDate, fmt);
};

export const formatDate = (
  date: Date | number,
  fmt = 'yyyy-MM-dd',
  timezone: string | null = null,
): string => formatWithTimezone(date, fmt, timezone);

export const formatDateAu = (
  date: Date | number,
  fmt = 'dd-MM-yyyy',
  timezone: string | null = null,
): string => formatWithTimezone(date, fmt, timezone);

export const formatDateTime = (
  date: Date | number,
  fmt = 'yyyy-MM-dd HH:mm:ss.SSS',
  timezone: string | null = null,
) => formatWithTimezone(date, fmt, timezone);

export const formatDateTimeAu = (
  date: Date | number,
  fmt = 'HH:mm dd/MM/yyyy',
  timezone: string | null = null,
) => formatWithTimezone(date, fmt, timezone);

export const formatTime = (
  date: Date | number,
  fmt = 'HH:mm:ss',
  timezone: string | null = null,
) => formatWithTimezone(date, fmt, timezone);

export const formatDateTimeTooltip = (
  date: Date | number,
  fmt = 'dd MMM HH:mm',
  timezone: string | null = null,
) => formatWithTimezone(date, fmt, timezone);

export const formatUTCTime = (date: Date) => {
  return date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
    : '';
};

export const formatDateTimeTooltipWithSecond = (
  date: Date | number,
  fmt = 'dd MMM HH:mm:ss',
  timezone: string | null = null,
) => formatWithTimezone(date, fmt, timezone);
