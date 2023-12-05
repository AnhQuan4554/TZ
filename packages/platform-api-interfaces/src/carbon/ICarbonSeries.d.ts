import { ISeriesItem } from '../data-type/ISeriesItem';

export interface ICarbonSeries {
  emission?: ISeriesItem[];
  abatement?: ISeriesItem[];
  [key: string]: any;
}
