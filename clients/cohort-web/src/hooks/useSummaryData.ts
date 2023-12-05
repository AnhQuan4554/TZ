import type { ISeriesItem } from '@tymlez/platform-api-interfaces';

export interface ISummaryItem {
  name: string;
  type: 'input' | 'output';
  value: number;
  preValue: number;
  series: ISeriesItem[] | undefined;
  uom: string;
  label: string;
}
