import { ISeriesItem } from '../data-type/ISeriesItem';

export interface ISolarSeries {
  generation?: ISeriesItem[];
  forecast?: ISeriesItem[];
  [key: string]: any;
}
