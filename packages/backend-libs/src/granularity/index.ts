import { addDaysTo } from '@tymlez/common-libs';
import type {
  IIsoDate,
  IMetricGranularity,
} from '@tymlez/platform-api-interfaces';

export function getGranularity(
  from: IIsoDate,
  to: IIsoDate,
): IMetricGranularity {
  if (addDaysTo(from, 30 * 6) < to) {
    return 'month';
  }
  if (addDaysTo(from, 30) < to) {
    return 'week';
  }

  if (addDaysTo(from, 7) < to) {
    return 'day';
  }

  return 'hour';
}
