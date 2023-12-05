import { mapValues } from 'lodash';

export function mapValuesRecursively<T extends object, U>(
  obj: T,
  mapper: (value: any) => U,
): { [K in keyof T]: U } {
  return mapValues(obj, (value: any) =>
    typeof value === 'object'
      ? mapValuesRecursively(value, mapper)
      : mapper(value),
  ) as any;
}
