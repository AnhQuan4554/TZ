import type { ISeriesItem } from '../data-type';

export interface ISummaryItem {
  name: string;
  type: 'input' | 'output';
  value: number;
  preValue: number;
  uom: string;
  label: string;
  series?: ISeriesItem[];
}
