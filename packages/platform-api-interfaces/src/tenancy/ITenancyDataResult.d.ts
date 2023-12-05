import type { IMeterDataResult } from '@tymlez/platform-api-interfaces/src/meter-data';

export interface ITenancyDataResult {
  name: string;
  data: IMeterDataResult[];
}
